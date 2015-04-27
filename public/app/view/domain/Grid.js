Ext.define('orf.view.domain.Grid', {
  extend: 'orf.view.base.ListGrid',
  alias: 'widget.domaingrid',
  stateful: true,
  stateId: 'domainListState',
  modelValidation: true,
  multiSelect: false,
  store: Ext.create('orf.store.PagedSub', {
    model: 'orf.model.domain.Main',
    autoLoad: true,
    autoSync: true
  }),
  publishes: ['currentDomain'],
  config: {
    currentDomain: null
  },
  bind: {
    currentDomain: '{currentDomain}'
  },
  title: 'Domains',
  listeners: {
    scope: 'this',
    select: function (grid, domain) {
      this.setCurrentDomain(domain);
    }
  },
  plugins: [
    Ext.create('Ext.grid.plugin.CellEditing', {
      clicksToEdit: 2
    })
  ],
  columns: [{
    text: 'Name',
    sortable: true,
    stateId: 'domainListStateName',
    dataIndex: 'name',
    editor: {
      xtype: 'textfield',
      allowBlank: false
    },
    flex: 3
  }, {
    text: 'Category',
    sortable: true,
    stateId: 'domainListStateCategory',
    dataIndex: 'categoryId',
    editor: {
      xtype: 'textfield',
      allowBlank: true
    },
    flex: 2
  }],
  dockedItems: [{
    xtype: 'toolbar',
    items: [{
      xtype: 'textfield',
      stateful: true,
      stateId: 'domainlistFilterTextbox',
      inputType: 'search',
      emptyText: '<type to search>',
      bind: {
        value: '{search}'
      },
      enableKeyEvents: true
    }, '->', {
      icon: null,
      glyph: 'xf0c9@FontAwesome',
      menu: [{
        text: 'Add',
        itemId: 'add',
        glyph: 'xf0fe@FontAwesome',
        handler: 'onGridButton'
      }, {
        text: 'Delete',
        itemId: 'delete',
        glyph: 'xf00d@FontAwesome',
        handler: 'onGridButton'
      }, '-', {
        text: 'Duplicate',
        itemId: 'duplicate',
        glyph: 'xf0c5@FontAwesome',
        handler: 'onGridButton'
      }]
    }]
  }],
  bbar: {
   xtype: 'pagingtoolbar',
   bind: {
     store: '{domains}'
   },
   displayInfo: true
  },
  updateCurrentDomain: function (current, previous) {
    var sm = this.getSelectionModel();
    if (current) {
      sm.select(current);
    }
    if (previous) {
      sm.deselect(previous);
    }
  }
});
