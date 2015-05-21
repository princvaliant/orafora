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
 //   attrs: {'bpmn':0 },
    model: 'orf.model.workflow.Workflow'
  }),
  resizable: false,
  multiSelect: false,
  itemSelector: 'div.workflow',
  overItemCls: 'workflow-hover',
  tpl: Ext.create('Ext.XTemplate',
    '<tpl for=".">',
    '<tpl if="svg.length &gt; 1">',
    '<div class=\'workflow\'>',
    '{svg}',
    '<strong>{name}</strong>',
    '</div>',
    '</tpl>',
    '<tpl if="svg.length == 0">',
    '<div class=\'workflow\'>',
    '<svg> width="100%" height="100%" viewBox="125 98 380 92"> </svg>',
    '<strong>{name}</strong>',
    '</div>',
    '</tpl>',
    '</tpl>',
    '<div class="x-clear"></div>'
  ),
  plugins: [
      Ext.create('Ext.ux.DataView.Animated', {
          duration: 750,
          idProperty: 'id'
      })
  ]

});
