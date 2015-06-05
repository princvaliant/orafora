 Ext.define('orf.view.workflow.design.Attributes', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.workflowdesignattributes',
  border: true,
  multiSelect: true,
  title: 'Attributes',
  viewConfig: {
    emptyText: 'No attributes defined',
    deferEmptyText: false
  },
  tools: [{
    type: 'plus',
    tooltip: 'Add',
    handler: 'onAddAttributes'
  }, {
    type: 'remove',
    tooltip: 'Delete',
    handler: 'onDeleteAttributes',
    bind: {
      disabled: '{!reflistattr.selection}'
    }
  },{
    type: 'copy',
    tooltip: 'Copy',
    handler: 'onCopyAttributes',
    bind: {
      disabled: '{!reflistattr.selection}'
    }
  }, {
    type: 'paste',
    tooltip: 'Paste',
    handler: 'onPasteAttributes'
  }, {
    type: 'help',
    handler: 'onAddAttributes'
  }],
  initComponent: function () {

    var bpmn = _.where(BpmnExtensions.types, {
      name: 'Attribute'
    })[0];

    var store = Ext.create('Ext.data.Store', {
      storeId: 'attributeStore',
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
