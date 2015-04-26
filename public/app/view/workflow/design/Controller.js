Ext.define('orf.view.workflow.design.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.workflowdesign',
  onCloseButton: function (btn) {
    FamousUtils.hideMainTabPanel('workflowdesignmain', 'workflowlistmain', this.getViewModel().get('rect'));
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
  }
});
