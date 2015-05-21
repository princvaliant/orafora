Ext.define('orf.view.workflow.design.Authorization', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.workflowdesignauthorization',
  border: true,
  title: 'Authorization',
  viewConfig: {
    emptyText: 'No authorization defined',
    deferEmptyText: false
  },
  tools: [{
    type: 'plus',
    tooltip: 'Add',
    handler: function (event, toolEl, panel) {
      // Your handler function
      console.log(event);
    }
  }, {
    type: 'copy',
    tooltip: 'Copy',
    handler: function (event, toolEl, panel) {
      // Your handler function
      console.log(event);
    }
  }, {
    type: 'paste',
    tooltip: 'Paste',
    handler: function (event, toolEl, panel) {
      // Your handler function
      console.log(event);
    }
  }, {
    type: 'help',
    handler: function (event, toolEl, panel) {
      // Your handler function
      console.log(event);
    }
  }],
  initComponent: function () {

    var bpmn = _.where(BpmnExtensions.types, {
      name: 'Authorization'
    })[0];

    var store = Ext.create('Ext.data.Store', {
      autoDestroy: true,
      fields: _.pluck(bpmn.properties, 'name'),
      sorters: [{
        property: 'data',
        direction: 'DESC'
      }]
    });

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
      clicksToMoveEditor: 1,
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
      plugins: [rowEditing],
      store: store,
      columns: columns
    });

    this.callParent(arguments);
  }
});
