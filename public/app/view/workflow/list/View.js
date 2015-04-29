Ext.define('orf.view.workflow.list.View', {
  extend: 'Ext.view.View',
  alias: 'widget.workflowlistview',
  requires: [
    'Ext.view.View',
    'Ext.ux.DataView.Animated',
    'Ext.XTemplate'
  ],
  layout: 'fit',
  store: Ext.create('orf.store.PagedSub', {
    model: 'orf.model.workflow.Workflow'
  }),
  resizable: true,
  itemSelector: 'div.workflow',
  overItemCls: 'workflow-hover',
  multiSelect: false,
  scrollable: false,
  tpl: Ext.create('Ext.XTemplate',
    '<tpl for=".">',
    '<div class=\'workflow\'>',
    '{svg}',
    '<strong>{name}</strong>',
    '</div>',
    '</tpl>'
  ),
  plugins: [
    Ext.create('Ext.ux.DataView.Animated', {
      duration: 750,
      idProperty: 'id'
    })
  ]
});
