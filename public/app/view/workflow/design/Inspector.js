Ext.define('orf.view.workflow.design.Inspector', {
  extend: 'Ext.tab.Panel',
  alias: 'widget.workflowdesigninspector',
  title:'',
  requires: ['Ext.toolbar.Toolbar', 'Ext.form.field.ComboBox'],

  initComponent: function () {

    this.callParent(arguments);
  },
  listeners: {
    'tabchange': function (tp, tab) {

    }
  }
});
