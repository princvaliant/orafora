Ext.define('orf.view.workflow.design.Properties', {
  extend: 'Ext.grid.property.Grid',
  alias: 'widget.workflowdesignproperties',
  requires: ['Ext.grid.property.Grid'],
  title: '',
  nameColumnWidth: 175,
  sortableColumns: false,
  columnLines: false,
  reserveScrollbar: true,
  stateful: true,
  tools: [{
    type: 'help',
    handler: function (event, toolEl, panel) {
      // Your handler function
      console.log(event);
    }
  }],
  itemId: 'propertyGrid',
  bind: {
     title: '{propTitle}'
  },
  listeners: {
    propertychange: 'onPropertiesChanged'
  }
});
