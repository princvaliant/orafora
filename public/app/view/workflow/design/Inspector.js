Ext.define('orf.view.workflow.design.Inspector', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.workflowdesigninspector',
  requires: ['Ext.toolbar.Toolbar', 'Ext.form.field.ComboBox'],
  layout: 'border',
    resizable: true,
  items: [{
      xtype:'panel',
      region: 'center'
  }, {
      xtype: 'panel',
      title: 'Advanced',
      region: 'east',
      collapsible: true,
      split: true,
      width: 600
  }]
});
