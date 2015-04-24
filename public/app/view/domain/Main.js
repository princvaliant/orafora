Ext.define('orf.view.domain.Main', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.domainmain',
  layout: 'border',
  resizable: true,
  requires: [
    'orf.view.domain.Grid',
    'orf.view.domain.Content',
    'orf.view.domain.Form',
    'orf.view.domain.GridMembers',
    'orf.view.domain.Controller',
    'orf.view.domain.ViewModel'
  ],
  controller: 'domain',
  viewModel: {
    type: 'domain'
  },
  items: [{
    xtype: 'domaingrid',
    region: 'west',
    width: 400,
    minSize: 75,
    maxSize: 450,
    collapsible: true,
    split: true
  }, {
    xtype: 'domaincontent',
    region: 'center'
  }]
});
