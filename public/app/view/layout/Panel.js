Ext.define('orf.view.layout.Panel', {
  extend: 'Ext.container.Container',
  xtype: 'layoutpanel',
  layout: 'fit',
  items: {
    xtype: 'domainmain'
  },
  initComponent: function () {
    this.callParent(arguments);
  }
});
