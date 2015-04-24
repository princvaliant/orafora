var store = Ext.define('orf.store.PagedMet', {
  extend: 'Ext.data.Store',
  alias: 'store.pagedmet',
  autoLoad: true,
  autoSync: true,
  remoteGroup: true,
  remoteFilter: true,
  remoteSort: true,
  pageSize: 25,
  config: {
    proxy: {
      type: 'meteorproxymet'
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
    filterchange: function ( store, filters, eOpts ) {
       store.currentPage = 1;
       store.proxy.startPos = 0;
    }
  }
});
