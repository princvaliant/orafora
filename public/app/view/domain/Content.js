Ext.define('orf.view.domain.Content', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.domaincontent',
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },
  bind: {
    title: 'Domain {currentDomain.name}'
  },
  title: 'Domain detail',
  items: [{
    xtype: 'domainform'
  }, {
    xtype: 'domaingridmembers',
    flex : 2
  }]
});
