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
    width: 400
  }, {
    xtype: 'workflowdesignauthorization',
    reference: 'reflistauth',
    hidden: true,
    bind: {
      hidden: '{authHidden}'
    },
    flex: 3
  }, {
    xtype: 'workflowdesignattributes',
    reference: 'reflistattr',
    hidden: true,
    bind: {
      hidden: '{attrHidden}'
    },
    flex: 4
  }]
});
