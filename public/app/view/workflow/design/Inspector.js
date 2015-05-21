Ext.define('orf.view.workflow.design.Inspector', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.workflowdesigninspector',
    requires: [
    'orf.view.workflow.design.Authorization',
    'orf.view.workflow.design.Attributes',
    'orf.view.workflow.design.Properties'
  ],
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  defaults: {
    border: true,
    margin: '6px'
  },
  items: [{
    xtype: 'workflowdesignproperties',
    flex: 3
  }, {
    xtype: 'workflowdesignauthorization',
    flex: 2
  }, {
    xtype: 'workflowdesignattributes',
    flex: 4
  }]
});
