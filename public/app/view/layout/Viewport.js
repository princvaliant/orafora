Ext.define('orf.view.layout.Viewport', {
  extend: 'Ext.container.Viewport',
  xtype: 'layoutviewport',
  layout: 'fit',
  items: {
    xtype: 'layouttab'
  },
  initComponent: function () {
    this.callParent(arguments);
  }
});
