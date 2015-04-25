Ext.define('orf.view.workflow.design.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.workflowdesign',
  onCloseButton: function(btn) {
      FamousUtils.displayMainTabPanel('workflowlistmain', {left: 400, top: 300, height: 500, width: 800});
  },
  onSaveButton: function(btn) {
      this.getViewModel().save();
  }
});
