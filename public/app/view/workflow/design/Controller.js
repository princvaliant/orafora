Ext.define('orf.view.workflow.design.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.workflowdesign',
  onGridButton: function(btn) {
      var action = btn.getItemId(),
      vm = this.getViewModel(),
      store = vm.getStore(),
      record;

      if (action === 'add') {
          record = store.insert(0, {})[0];
          vm.set('currentWorkflow', record);
      }

      if (action === 'delete') {
          store.remove(vm.get('currentWorkflow'));
          store.sync();
      }
  }
});
