Ext.define('orf.view.workflow.design.Inspector', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.workflowdesigninspector',
    requires: [
    'orf.view.workflow.design.SelectRoles',
    'orf.view.workflow.design.SelectUsers',
    'orf.view.workflow.design.SelectVars',
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
    xtype: 'workflowdesignselectroles',
    flex: 1
  }, {
    xtype: 'workflowdesignselectusers',
    flex: 1
  }, {
    xtype: 'workflowdesignselectvars',
    flex: 3
  }]
});
