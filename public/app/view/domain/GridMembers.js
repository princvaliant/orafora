Ext.define('orf.view.domain.GridMembers', {
  extend: 'orf.view.base.ListGrid',
  alias: 'widget.domaingridmembers',
  stateful: false,
  stateId: 'domainMemberslistState',
  modelValidation: true,
  multiSelect: true,
  store: Ext.create('orf.store.PagedSub', {
    model: 'orf.model.domain.Member'
  }),
  listeners: {
    scope: 'this',
    select: function (grid, domain) {
     }
  },
  columns: [{
    text: 'Name',
    sortable: true,
    stateId: 'domainMemberslistStatename',
    dataIndex: 'name',
    flex: 5
  }, {
    text: 'Title',
    sortable: true,
    stateId: 'domainMemberslistStatetitle',
    dataIndex: 'title',
    flex: 5
  }, {
    text: 'Data type',
    sortable: true,
    stateId: 'domainMemberslistStatetDataType',
    dataIndex: 'dataType',
    flex: 2
  }, {
    text: 'Order',
    sortable: true,
    stateId: 'domainMemberslistStatetOrder',
    dataIndex: 'order',
    flex: 1
  }, {
    text: 'Required',
    sortable: true,
    stateId: 'domainMemberslistStatetRequired',
    dataIndex: 'required',
    flex: 1
  }],
  dockedItems: [{
    xtype: 'toolbar',
    items: [{
      text: 'Add',
      itemId: 'add',
      glyph: 'xf0fe@FontAwesome',
      handler: 'onGridMemberButton'
    }, {
      text: 'Delete',
      itemId: 'delete',
      glyph: 'xf00d@FontAwesome',
      handler: 'onGridMemberButton'
    }, {
      text: 'Copy',
      itemId: 'copy',
      glyph: 'xf0c5@FontAwesome',
      handler: 'onGridMemberButton'
    }, {
      text: 'Paste',
      itemId: 'paste',
      glyph: 'xf0ea@FontAwesome',
      handler: 'onGridMemberButton'
    }]
  }],
  bbar: {
    xtype: 'pagingtoolbar',
    bind: {
      store: '{domainMembers}'
    },
    displayInfo: true
  }
});
