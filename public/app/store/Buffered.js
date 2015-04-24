Ext.define('orf.store.Buffered', {
  extend: 'Ext.data.BufferedStore',
  alias: 'store.bufferedmet',
  config: {
    autoSync: true,
    autoLoad: true,
    remoteGroup: true,
    remoteFilter: true,
    remoteSort: true,
    pageSize: 100,
    trailingBufferZone: 0,
    leadingBufferZone:100,
    purgePageCount: 0,
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
