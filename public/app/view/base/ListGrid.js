Ext.define('orf.view.base.ListGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'baselistgrid',
  requires: [
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.util.*',
    'Ext.toolbar.Paging'
  ],
  frame: true,
  collapsible: false,
  border: false,
  margins: '0 0 0 0',
  layout: 'fit',
  scrollable: true,
  viewConfig: {
    trackOver: true,
    preserveScrollOnRefresh: false
  },
  selModel: {
    pruneRemoved: true
  }
});
