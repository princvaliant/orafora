Ext.define('orf.view.workflow.list.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.workflowlist',
  onWorkflowSelected: function (dataview, selections) {
    if (selections[0] !== undefined) {
      var vm = this.getViewModel();
      vm.set('selectedWorkflow', selections[0]);
    }
  },
  onWorkflowOpen: function (dataview, selection, comp) {
    var vm = this.getViewModel();
    var panel = FamousUtils.displayMainTabPanel('workflowdesignmain', comp.getBoundingClientRect());
    panel.getViewModel().init(vm.get('selectedWorkflow'), vm.getStore());
  },
  onHeaderButton: function (btn) {
    var vm = this.getViewModel(),
      store = vm.getStore(),
      action = btn.getItemId();

    if (action === 'add') {
      var win = Ext.create({
        xtype: 'baseformdialog',
        title: 'Create new workflow',
        items: {
          xtype: 'workflowlistform'
        }
      });
      this.getView().add(win);
      win.show();
    }

    if (action === 'duplicate') {
      var wdup = Ext.create({
        xtype: 'baseformdialog',
        title: 'Duplicate workflow',
        items: {
          xtype: 'workflowlistform'
        }
      });
      var rec = _.clone(vm.get('selectedWorkflow'));
      rec.id = null;
      rec.data._id = null;
      rec.data.name = rec.data.name + ' - copy';
      wdup.down('form').loadRecord(rec);
      this.getView().add(wdup);
      wdup.show();
    }

    if (action === 'delete') {
      Ext.MessageBox.show({
        title: 'Confirm Delete',
        msg: 'Are you sure you want to delete?',
        buttons: Ext.MessageBox.OKCANCEL,
        icon: Ext.MessageBox.WARNING,
        fn: function (btn) {
          if (btn == 'ok') {
            store.remove(vm.get('selectedWorkflow'));
            store.sync();
          }
        }
      });
    }
  },

  onAdd: function (btn) {
    var vm = this.getViewModel(),
      store = vm.getStore();
    var form = btn.up('form').getForm();
    if (form.isValid()) {
      store.add(form.getValues());
      store.onAdd(function (model) {
        var panel = FamousUtils.displayMainTabPanel('workflowdesignmain', {
          left: 0,
          top: 50,
          height: 10,
          width: 10
        });
        panel.getViewModel().init(model, store);
      });
      store.sync();
      btn.up('window').close();
    }
  },

});
