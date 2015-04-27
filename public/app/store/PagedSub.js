var store = Ext.define('orf.store.PagedSub', {
  extend: 'Ext.data.Store',
  alias: 'store.pagedsub',
  autoLoad: false,
  autoSync: false,
  remoteGroup: false,
  remoteFilter: true,
  remoteSort: false,
  pageSize: 25,
  config: {
    proxy: {
      type: 'meteorproxysub'
    }
  },
  listeners: {
    beforesort: function (store) {
      var sortString = '';
      store.getSorters().each(function (sorter) {
        sortString += sorter._property + sorter._direction;
      });
      store.proxy.startPos = undefined;
      if (store.tempSortString !== undefined && store.tempSortString !== sortString) {
        store.currentPage = 1;
        store.proxy.startPos = 0;
      }
      store.tempSortString = sortString;
    },
    filterchange: function (store, filters, eOpts) {
      store.currentPage = 1;
      store.proxy.startPos = 0;
    }
  },
  add: function (a, callback) {
    if (!a.id) {
      a.id = Meteor.hashid();
    }
    if (callback) {
        this.insertCallbackId = a.id;
        this.insertCallback = callback;
    }
    return this.superclass.add.call(this, a);
  }
});
