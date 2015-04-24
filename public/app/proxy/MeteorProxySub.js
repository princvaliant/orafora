Ext.define('orf.proxy.MeteorProxySub', {
  extend: 'Ext.data.proxy.Client',
  alias: 'proxy.meteorproxysub',

  create: function (operation) {
    this.executeOperation('insert', operation);
  },

  update: function (operation) {
    this.executeOperation('update', operation);
  },

  erase: function (operation) {
    this.executeOperation('remove', operation);
  },

  read: function (operation) {

    var me = this;
    me.store = operation._internalScope;

    if (me.model.mongoCollection === undefined) {
      Ext.Error.raise('You must initialize mongoCollection property to the model "' + me.model.entityName + '"');
      return;
    }
    // Translate extjs stores/filters to meteor sorters and filters
    var sort = me.senchaSortersToMeteorSorters(operation.getSorters());
    var filter = me.senchaFilterToMeteorFilter(operation.getFilters());
    var options = {
      limit: operation._limit,
      skip: me.startPos === undefined ? operation._start : me.startPos,
      sort: sort
    };

    var initializing = true;
    if (me.handle) {
      // This is subsequent read operation so Unsubscribe from existing publications
      if (me.dataHandle) me.dataHandle.stop();
      if (me.countHandle) me.countHandle.stop();
      me.handle.stop();
    } else {
      // If this is first read operation intiate or meteor collections
      me.collectionName = me.model.mongoCollection;
      me.subId = Meteor.hashid();
      me.countCollection = new Meteor.Collection(this.subId + "_c");
      me.dataCollection = new Meteor.Collection(this.subId + "_d");
    }

    // Subscribe to server data and start observing data changes
    me.handle = Meteor.subscribe('genericpublish', me.model.mongoCollection, me.subId, filter, options, function () {

      var countCursor = me.countCollection.find();
      var dataCursor = me.dataCollection.find({}, {
        sort: options.sort
      });

      var data = {};
      data.data = dataCursor.fetch();
      data.totalCount = countCursor.fetch()[0].count;
      me.processInitData(operation, data);

      me.countHandle = countCursor.observeChanges({
        changed: function (id, fields) {
          if (!initializing) {
            me.processSubscriptionEvents('total', operation, id, fields.count);
          }
        }
      });

      me.dataHandle = dataCursor.observeChanges({
        addedBefore: function (id, record, before) {
          if (!initializing) {
            me.processSubscriptionEvents('added', operation, id, record, before);
          }
        },
        changed: function (id, fields) {
          if (!initializing) {
            me.processSubscriptionEvents('changed', operation, id, fields);
          }
        },
        removed: function (id) {
          if (!initializing) {
            me.processSubscriptionEvents('removed', operation, id);
          }
        }
      });
      initializing = false;
    });
  },

  processSubscriptionEvents: function (event, operation, id, record, before) {
    var i = 0;
    operation.setStarted();
    operation.setInternalCallback(this.internalCallback);
    operation.setInternalScope(this.store),
    recs = operation.getRecords(),
    len = recs.length;

    if (event === 'changed') {
      for (i; i < len; i++) {
        if (recs[i].id === id) {
          for (var f in record) {
            recs[i].data[f] = record[f];
          }
        }
      }
    }
    if (event === 'added') {
      record._id = id;
      var Model = this.getModel();
      var model = new Model(record);
      var index = 0;
      if (before) {
        _.find(operation._resultSet.records, function (rec, idx) {
          if (rec.id === before) {
            index = idx;
            return true;
          }
        });
      }
      Ext.Array.insert(operation._resultSet.records, index, [model]);
    }
    if (event === 'removed') {
      var dels = _.reject(recs, function (obj) {
        return obj.id === id;
      });
      operation._resultSet.setRecords(dels);
    }
    if (event === 'total') {
      operation._resultSet.setTotal(record);
    }
    operation.setSuccessful(true);
  },

  processInitData: function (operation, data) {
    operation.setStarted();
    var records = [];
    var Model = this.getModel();
    for (var i = 0; i < data.data.length; i++) {
      var data2 = data.data[i];
      record = new Model(data2);
      records.push(record);
    }
    operation.setResultSet(new Ext.data.ResultSet({
      records: records,
      total: data.totalCount,
      loaded: true
    }));
    this.internalCallback = operation.getInternalCallback();
    operation.setSuccessful(true);
  },

  finishOperation: function (operation) {
    var i = 0,
      recs = operation.getRecords(),
      len = recs.length;
    for (i; i < len; i++) {
      recs[i].commit();
    }
    operation.setSuccessful(true);
  },

  executeOperation: function (type, operation) {
    var me = this,
      i = 0,
      data = [],
      recs = operation.getRecords(),
      len = recs.length;
    for (i; i < len; i++) {
      if (type === "insert") {
        recs[i].data._id = '';
      }
      data.push(recs[i].data);
    }

    if (me.collectionName === undefined) {
      Ext.Error.raise('You must initialize mongoCollection property to the model');
    }
    Meteor.call(type + '_' + me.collectionName, data, function (err, status) {
      if (err) {
        Ext.Error.raise({
          reason: err.reason,
          error: err.error
        });
      } else {
        me.finishOperation(operation);
      }
    });
  },

  senchaSortersToMeteorSorters: function (sorters) {
    var convertedSorters = [];
    if (sorters && sorters.length) {
      convertedSorters = sorters.map(function (sorter) {
        var direction = !sorter.getDirection() || sorter.getDirection() == "ASC" ? 'asc' : 'desc';
        var field = sorter.getProperty();
        return direction && field ? [field, direction] : false;
      });
    }
    return convertedSorters;
  },

  senchaFilterToMeteorFilter: function (senchaFilters) {
    var meteorFilters = {};
    if (senchaFilters && senchaFilters.length) {
      Ext.Array.each(senchaFilters, function (filter) {
        var property = filter.getProperty(),
          value = filter.getValue();
        meteorFilters[property] = value;
      });
    }
    return meteorFilters;
  },

  clear: Ext.emptyFn
});
