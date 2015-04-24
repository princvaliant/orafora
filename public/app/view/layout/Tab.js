Ext.define('orf.view.layout.Tab', {
  extend: 'Ext.tab.Panel',
  xtype: 'layouttab',
  defaults: {
    bodyPadding: 1,
    scrollable: true
  },
  items: [{
    glyph: 'xf1b2@FontAwesome',
    title: 'Domains',
    xtype: 'domainmain',
    layout:'fit'
  },{
    glyph: 'xf1e0@FontAwesome',
    title: 'Workflows',
    xtype: 'workflowmain'
  },  {
    glyph: 'xf085@FontAwesome',
    title: 'Execution'
  //  xtype:'workflowmain'
  }, {
    glyph: 'xf019@FontAwesome',
    title: 'Export data',
  }, {
    glyph: 'xf201@FontAwesome',
    title: 'Charts',
  }]
});
