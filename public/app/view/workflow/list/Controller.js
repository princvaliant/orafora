Ext.define('orf.view.workflow.list.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.workflowlist',
  onWorkflowSelected: function (dataview, selections) {

    if (selections[0] !== undefined) {
      var record = selections[0].data,
        vm = this.getViewModel();
       vm.data.selectedWorkflow = record;
    }
  },
  onWorkflowOpen: function (dataview, selection, comp) {

    var selected = this.getView().down('workflowlistview').selModel.getSelection()[0];
    FamousUtils.displayMainTabPanel('workflowdesignmain', comp.getBoundingClientRect());
  },
  onHeaderButton: function (btn) {
    var action = btn.getItemId(),
      vm = this.getViewModel(),
      store = vm.getStore(),
      record;

    if (action === 'add') {
      record = store.insert(0, {name:'Rectangle flow', svg: '<svg  xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink"> <rect x="10" y="10" height="100" width="100" style="stroke:#ff0000; fill: #0000ff"/></svg>'});
      store.sync();
    }

    if (action === 'delete') {

    }
  },
});

Tracker.autorun(function () {

});
