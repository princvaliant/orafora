Ext.define('orf.Application', {
  extend: 'Ext.app.Application',
  name: 'orf',

  requires: [
    'Ext.ux.DataView.Animated',

    'orf.proxy.MeteorProxyMet',
    'orf.proxy.MeteorProxySub',
    'orf.store.PagedMet',
    'orf.store.PagedSub',
    'orf.store.Buffered',

    'orf.model.Base',
    'orf.model.domain.Category',
    'orf.model.domain.Main',
    'orf.model.domain.Member',
    'orf.model.workflow.Workflow',

    'orf.view.layout.Tab',
    'orf.view.base.ListGrid',

    'orf.view.workflow.list.Main',
    'orf.view.workflow.design.Main',

    'orf.view.domain.Main'
  ],

  launch: function () {

    orfApp = this;

    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    Ext.Error.handle = function (err) {
      Ext.Msg.alert(err.error || 'Error occured', err.reason || err.msg);
      return true;
    };
  }
});
