Ext.define('orf.view.domain.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.domain',
  onGridButton: function (btn) {
    var action = btn.getItemId(),
      vm = this.getViewModel(),
      store = vm.getStore(),
      record;

    if (action === 'add') {
      var model = store.insert(0, {name:'Dummy', categoryId:'dummy'})[0];
      console.log(model);
      vm.set('currentDomain', model);
    }

    if (action === 'delete') {
      store.remove(vm.get('currentDomain'));
      store.sync();
    }
  },
  onGridMemberButton: function (btn) {
    var action = btn.getItemId(),
      vm = this.getViewModel(),
      store = vm.getStoreMembers(),
      record;

    if (action === 'add') {
      record = store.insert(0, {})[0];
      record.domainId = vm.get('currentDomain')._id;
      vm.set('currentMember', record);
    }
    if (action === 'delete') {
      store.remove(vm.get('currentMember'));
      store.sync();
    }
    if (action === 'copy') {

    }
    if (action === 'paste') {

    }
  }
});
