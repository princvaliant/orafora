Ext.define('orf.view.workflow.design.Authorization', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.workflowdesignauthorization',
  border: true,
  multiSelect: true,
  title: 'Authorization',
  viewConfig: {
    emptyText: 'No authorization defined',
    deferEmptyText: false
  },
  tools: [{
    type: 'plus',
    tooltip: 'Add',
    handler: 'onAddAuthorization'
  }, {
    type: 'remove',
    tooltip: 'Delete',
    handler: 'onDeleteAuthorization',
    bind: {
      disabled: '{!reflistauth.selection}'
    }
  }, {
    type: 'copy',
    tooltip: 'Copy',
    handler: 'onCopyAuthorization',
    bind: {
      disabled: '{!reflistauth.selection}'
    }
  }, {
    type: 'paste',
    tooltip: 'Paste',
    handler: 'onPasteAuthorization'
  }, {
    type: 'help',
    handler: 'onHelpAuthorization'
  }],
  initComponent: function () {

    var bpmn = _.where(BpmnExtensions.types, {
      name: 'Authorization'
    })[0];

    var store = Ext.create('Ext.data.Store', {
      storeId: 'authorizationStore',
      autoDestroy: true,
      autoSync: true,
      fields: _.pluck(bpmn.properties, 'name'),
      sorters: [{
        property: 'data',
        direction: 'DESC'
      }]
    });

    this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
      clicksToEdit: 1,
      autoCancel: false
    });

    var columns = Array();
    _.each(bpmn.properties, function (elem) {
      var obj = {};
      obj.header = elem.name;
      obj.dataIndex = elem.name;
      obj.flex = elem.flex;
      obj.editor = orf.view.base.Editor.create(elem);
      columns.push(obj);
    });

    Ext.apply(this, {
      plugins: [this.editing],
      store: store,
      columns: columns
    });

    this.callParent(arguments);
  }
});
