Ext.define('orf.view.workflow.list.ViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.workflowlist',
  formulas: {
    selected: {
      get: function () {
        return this.get('selectedWorkflow') !== null;
      }
    },
    filterValue: {
      get: function () {
        var state = Ext.state.Manager.get('workflowlistFilterTextbox') || {};
        this.filter(state.value || '');
        return state.value;
      },
      set: function (value) {
        this.filter(value);
      }
    },
    sortValue: {
      get: function () {
        var state = Ext.state.Manager.get('workflowlistSort') || {};
        this.sort(state.value || '');
        return state.value;
      },
      set: function (value) {
        this.sort(value);
      }
    }
  },
  filter: function (value) {
    if (this.getStore()) {
      this.getStore().setRemoteSort(true);
      this.getStore().filter('query', {
        '$or': [{
          'name': {
            '$regex': '(?i)^' + value
          }
        }, {
          'summary': {
            '$regex': '(?i)^' + value
          }
        }]
      });
    }
  },
  sort: function (value) {
    var s = value.split('|');
    this.getStore().sort(s[0], s[1]);
  },
  getStore: function () {
    return this.getView().down('workflowlistview').store;
  },
});
