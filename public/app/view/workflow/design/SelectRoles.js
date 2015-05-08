Ext.define('orf.view.workflow.design.SelectRoles', {
  extend: 'Ext.view.MultiSelector',
  alias: 'widget.workflowdesignselectroles',
  requires: [
    'Ext.view.MultiSelector'
  ],
    border: true,
    title: 'Assigned Roles',
    fieldName: 'name',
    stateFul: true,
    viewConfig: {
      deferEmptyText: false,
      emptyText: 'No roles selected'
    },
    search: {
      field: 'name',
      store: Ext.create('orf.store.PagedSub', {
        attrs: {

        },
        model: 'orf.model.security.Role',
        autoLoad: true
      })
    }
});
