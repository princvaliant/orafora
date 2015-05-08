Ext.define('orf.view.workflow.design.SelectVars', {
  extend: 'Ext.view.MultiSelector',
  alias: 'widget.workflowdesignselectvars',
  requires: [
    'Ext.view.MultiSelector'
  ],
  border: true,
  title: 'Assigned Variables',
  fieldName: 'name',
  viewConfig: {
    deferEmptyText: false,
    emptyText: 'No variables selected'
  },
  search: {
    field: 'name',
    store: Ext.create('orf.store.PagedSub', {
      attrs: {

      },
      model: 'orf.model.workflow.Variable'
    })
  }
});
