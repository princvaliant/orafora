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
  layout: {
    type: 'auto'
  },
  autoScroll: true,
  items: {
    xtype: 'workflowlistview',
    reference: 'reflistview',
    listeners: {
      selectionchange: 'onWorkflowSelected',
      itemdblclick: 'onWorkflowOpen'
    }
  },
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    enableOverflow: true,
    items: [{
      xtype: 'buttongroup',
      defaults: {
        margin: '0 10 0 0'
      },
      items: [{
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
      }]
    }, {
      xtype: 'buttongroup',
      defaults: {
        margin: '0 10 0 0'
      },
      items: [{
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
    }]
  }]
});
