Ext.define('orf.proxy.MeteorProxyMet', {
  extend: 'Ext.data.proxy.Client',
  alias: 'proxy.meteorproxymet',
  isMemoryProxy: true,
  start: -1,

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
        if (!recs[i].data._id ) {
          recs[i].data._id = Meteor.hashid();
        }
      }
      data.push(recs[i].data);
    }

    if (me.meteorCollection === undefined) {
        Ext.Error.raise('You must initialize mongoCollection property to the model');
    }
    Meteor.call(type + '_' + me.meteorCollection, data, function (err, status) {
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
    if (me.model.mongoCollection === undefined) {
      Ext.Error.raise('You must initialize mongoCollection property to the model "' + me.model.entityName + '"');
    }
    if (me.meteorCollection === undefined) {
       Meteor.call('initmethods', me.model.mongoCollection, function (err, data) {
            me.processRead(operation);
       });
    } else {
       me.processRead(operation);
    }
  },

  processRead: function (operation) {
    var me = this;
    me.meteorCollection = me.model.mongoCollection;
    var sort = me.senchaSortersToMeteorSorters(operation.getSorters());
    var filter = me.senchaFilterToMeteorFilter(operation.getFilters());
    var options = {
      limit: operation._limit,
      skip: me.startPos === undefined ? operation._start : me.startPos,
      sort: sort
    };
    var parent = operation._internalScope.__proto__;
    var storeType = parent.$className;

    if (storeType === 'orf.store.PagedMet') {
      Meteor.call('get_' +  me.meteorCollection, filter, options, function (err, data) {
        me.processData(operation, data);
      });
    } else if (storeType === 'orf.store.Buffered') {
      if (operation._start === 0) {
        me.start = -1;
      }
      if (me.start < operation._start) {
        me.start = operation._start;
        Meteor.call('get_' +  me.meteorCollection, filter, options, function (err, data) {
          me.processData(operation, data);
        });
      }
    }
  },

  processData: function (operation, data) {
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
    operation.setSuccessful(true);
    operation.setCompleted();
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
