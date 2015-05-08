Ext.define('orf.view.workflow.design.SelectUsers', {
  extend: 'Ext.view.MultiSelector',
  alias: 'widget.workflowdesignselectusers',
  requires: [
    'Ext.view.MultiSelector'
  ],
  border: true,
  title: 'Assigned Users',
  fieldName: 'name',
  viewConfig: {
    deferEmptyText: false,
    emptyText: 'No users selected'
  },
  search: {
    field: 'name',
    store: Ext.create('orf.store.PagedSub', {
      attrs: {

      },
      model: 'orf.model.security.User',
      autoLoad: true
    })
  }
});
