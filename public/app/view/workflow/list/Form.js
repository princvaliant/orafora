Ext.define('orf.view.workflow.list.Form', {
  extend: 'Ext.form.Panel',
  alias: 'widget.workflowlistform',
  title: '',
  height: 200,
  width: 400,
  bodyPadding: 8,
  layout: 'anchor',
  defaults: {
    anchor: '100%'
  },
  defaultType: 'textfield',
  items: [{
    fieldLabel: 'Workflow Name',
    name: 'name',
    allowBlank: false
  }, {
    xtype: 'textareafield',
    grow: true,
    fieldLabel: 'Summary',
    name: 'summary',
    allowBlank: true,
    height: 120,
  }, {
    xtype: 'hiddenfield',
    name: 'svg',
  }, {
    xtype: 'hiddenfield',
    name: 'bpmn',
  }],

  // Reset and Submit buttons
  buttons: [{
    text: 'Submit',
    formBind: true,
    disabled: true,
    handler: 'onAdd'
  }]
});
