var mongoCollections = {};

Meteor.methods({
  initmethods: function (collectionName) {
    createMethods(collectionName);
  }
});

Meteor.publish('genericpublish', function (collectionName, subId, filter, options) {

  var self = this;
  createMethods(collectionName);
  var mongoCollection = mongoCollections[collectionName];
  var count = 0;
  var initializing = true;
  var handleCount = mongoCollection.find(prepareFilter(filter), {
    fields: {
      _id: 1
    }
  }).observeChanges({
    added: function (doc, idx) {
      count++;
      if (!initializing)
        self.changed(subId + "_c", "_id", {
          count: count
        }); // "counts" is the published collection name
    },
    removed: function (doc, idx) {
      count--;
      self.changed(subId + "_c", "_id", {
        count: count
      }); // same published collection, "counts"
    }
  });
  initializing = false;
  self.added(subId + "_c", "_id", {
    count: count
  });

  var handleData = mongoCollection.find(prepareFilter(filter), options || {}).observe({
    added: function (doc, idx) {
      self.added(subId + "_d", doc._id, doc);
    },
    changed: function (doc, idx) {
      self.changed(subId + "_d", doc._id, doc);
    },
    removed: function (doc) {
      self.removed(subId + "_d", doc._id);
    }
  });

  self.ready();
  self.onStop(function () {
    handleCount.stop();
    handleData.stop();
  });
});

function createMethods(name) {

  if (mongoCollections[name] === undefined) {
    mongoCollections[name] = new Meteor.Collection(name);
    var mongoCollection = mongoCollections[name];
    var methods = {};
    methods['get_' + name] = function (filter, options) {
      var count = mongoCollection.find(prepareFilter(filter)).count();
      var data = mongoCollection.find(prepareFilter(filter), options || {}).fetch();
      return {
        data: data,
        totalCount: count
      };
    };
    methods['insert_' + name] = function (records) {
      _.each(records, function (record) {
        record._id = Meteor.hashid();
        insertInfo(record);
        mongoCollection.insert(record);
      });
    };
    methods['update_' + name] = function (records) {
      _.each(records, function (record) {
        updateInfo(record);
        mongoCollection.update(record._id, record);
      });
    };
    methods['remove_' + name] = function (records) {
      _.each(records, function (record) {
        mongoCollection.remove(record._id);
      });
    };
    Meteor.methods(methods);
  }
}

function prepareFilter(filter) {
  var filt = {};
  if (filter) {
    if (filter.query)
      filt = filter.query;
    else
      filt = filter || {};
  }
  return filt;
}

function insertInfo(record) {
    record.added = moment()._d;
}

function updateInfo(record) {
    record.updated = moment()._d;
}


