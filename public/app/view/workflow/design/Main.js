Ext.define('orf.view.workflow.design.Main', {
  extend: 'Ext.container.Container',
  alias: 'widget.workflowdesignmain',
    requires: [
    'orf.view.workflow.design.Paper',
    'orf.view.workflow.design.Inspector',
    'orf.view.workflow.design.Controller',
    'orf.view.workflow.design.ViewModel'
  ],
  layout: 'border',
  resizable: true,
  controller: 'workflowdesign',
  viewModel: {
    type: 'workflowdesign'
  },
  items: [{
    xtype: 'workflowdesignpaper',
    region: 'center',
    width: '70%'
  }, {
    xtype: 'workflowdesigninspector',
    collapsible: false,
    stateful: true,
    stateId: 'workflowDesignInspectorId',
    split: true,
    region: 'south',
    height: 250
  }]
});
