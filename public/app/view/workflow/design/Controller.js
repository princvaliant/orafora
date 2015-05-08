Ext.define('orf.view.workflow.design.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workflowdesign',
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
          html: '<pre><code>' +  Ext.util.Format.htmlEncode(xml) + '</code></pre>',
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
    }
  });
