Ext.define('orf.view.domain.Form', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.domainform',
  requires: [
    'Ext.form.field.Text'
  ],
  layout: 'hbox',
  defaults: {
    layout: 'form',
    xtype: 'container',
    defaultType: 'textfield',
    style: 'width: 50%'
  },
  bodyPadding: 7,
  modelValidation: false,
  fieldDefaults: {
    labelWidth: 160,
    labelAlign: 'right',
    selectOnFocus: true,
    anchor: '100%'
  },
  items: [{
    items: [{
      fieldLabel: 'Name',
      bind: '{currentDomain.name}',
      xtype: 'textfield'
    }, {
      fieldLabel: 'Category',
      bind: '{currentDomain.categoryId}',
      xtype: 'textfield'
    }]
  }, {
    items: [{
      fieldLabel: 'Summary',
      bind: '{currentDomain.summary}',
      xtype: 'textarea'
    }]
  }, {
    items: [{
      xtype: 'button',
      bind: {
        hidden: '{!changedandvalid}'
      },
      text: 'Save'
    }]
  }]
});
