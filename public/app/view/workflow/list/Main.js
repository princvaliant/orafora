Ext.define('orf.view.workflow.list.Main', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.workflowlistmain',
  requires: [
    'orf.view.workflow.list.Controller',
    'orf.view.workflow.list.ViewModel',
    'orf.view.workflow.list.View',
    'orf.view.workflow.list.Form'
  ],
  controller: 'workflowlist',
  viewModel: {
    type: 'workflowlist'
  },
  layout: 'fit',
  items: {
    xtype: 'workflowlistview',
    reference: 'reflistview',
    listeners: {
      selectionchange: 'onWorkflowSelected',
      itemdblclick: 'onWorkflowOpen'
    }
  },
  tbar: [{
    xtype: 'textfield',
    name: 'filter',
    fieldLabel: '',
    labelAlign: 'right',
    labelWidth: null,
    inputType: 'search',
    emptyText: '<type to search>',
    stateful: true,
    stateId: 'workflowlistFilterTextbox',
    bind: {
      value: '{filterValue}'
    }
  }, {
    margin: '0 0 0 10',
    inputWidth: 150,
    xtype: 'combo',
    labelAlign: 'right',
    fieldLabel: '',
    labelWidth: null,
    valueField: 'field',
    displayField: 'label',
    value: 'type',
    editable: false,
    stateful: true,
    stateId: 'workflowlistSort',
    store: Ext.create('Ext.data.Store', {
      fields: ['field', 'label'],
      data: [{
        label: 'Sort by name',
        field: 'name|ASC'
      }, {
        label: 'Recent on top',
        field: 'added|DESC',
        dir: '-1'
      }]
    }),
    bind: {
      value: '{sortValue}'
    }
  }, {
    xtype: 'tbseparator'
  }, {
    text: 'Add',
    itemId: 'add',
    glyph: 'xf0fe@FontAwesome',
    handler: 'onHeaderButton'
  }, {
    text: 'Duplicate',
    itemId: 'duplicate',
    glyph: 'xf0c5@FontAwesome',
    handler: 'onHeaderButton',
    bind: {
      disabled: '{!reflistview.selection}'
    }
  }, {
    text: 'Delete',
    itemId: 'delete',
    glyph: 'xf00d@FontAwesome',
    handler: 'onHeaderButton',
    bind: {
      disabled: '{!reflistview.selection}'
    }
  }]
});
