Ext.define('orf.view.workflow.design.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.workflowdesign',

  init: function () {
    this.listen({
      store: {
        '#authorizationStore': {
          update: 'onAuthorizationChanged',
          remove: 'onAuthorizationChanged'
        }
      }
    });
  },

  onCloseButton: function (btn) {
    FUS.hideMainTabPanel('workflowdesignmain', 'workflowlistmain', this.getViewModel().get('_rect'));
  },

  onSaveButton: function (btn) {
    Ext.create('widget.uxNotification', {
      position: 't',
      closable: false,
      title: 'Saved',
      slideInDuration: 1800,
      slideBackDuration: 1100,
      autoCloseDelay: 2000,
      slideInAnimation: 'elasticIn',
      slideBackAnimation: 'elasticIn',
      html: '<div style="margin:15px;"><b>BPMN 2.0 workflow definition successfully saved</b><div>'
    }).show();
    this.getViewModel().save();
  },

  onDownloadButton: function (btn) {
    var renderer = this.getViewModel().get('renderer');
    renderer.saveXML({
      format: true
    }, function (err, xml) {

      var win = new Ext.Window({
        layout: 'fit',
        title: 'BPMN 2.0 xml viewer',
        width: 1100,
        height: 700,
        modal: true,
        scrollable: true,
        closeAction: 'hide',
        html: '<pre><code>' + Ext.util.Format.htmlEncode(xml) + '</code></pre>',
        plain: true,
        buttons: [{
          text: 'Close',
          handler: function () {
            win.hide();
          }
        }]
      });

      win.show();
    });
  },

  onPropertiesChanged: function (source, recordId, value, oldValue, eOpts) {
    this.getViewModel().saveProperties(source);
  },

  onAddAuthorization: function (evt, p, btn) {
    var comp = btn.up('grid');
    var edit = comp.editing;
    edit.cancelEdit();
    var rec = comp.store.add({
      cast: 'ROLE',
      name: '',
      permission: 'ALL'
    })[0];
    edit.startEdit(rec, 1);
  },

  onDeleteAuthorization: function (evt, p, btn) {
    var comp = btn.up('grid');
    var selection = comp.getView().getSelectionModel().getSelection();
    if (selection) {
      comp.store.remove(selection);
    }
  },

  onAuthorizationChanged: function (source) {
    this.getViewModel().saveAuthorization(source.data.items);
  },

  onAddAttributes: function (evt, p, btn) {
    var comp = btn.up('grid');
    var edit = comp.editing;
    edit.cancelEdit();
    var rec = comp.store.add({
      cast: 'ROLE',
      name: '',
      permission: 'ALL'
    })[0];
    edit.startEdit(rec, 1);
  },

  onDeleteAttributes: function (evt, p, btn) {
    var comp = btn.up('grid');
    var selection = comp.getView().getSelectionModel().getSelection();
    if (selection) {
      comp.store.remove(selection);
    }
  },
});
