Ext.define('orf.view.domain.ViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.domain',
  data: {
    currentDomain: null,
    currentMember: null,
    domains: null,
    domainMembers: null
  },
  getStore: function () {
    this.data.domains = this.getView().down('domaingrid').store;
    return this.data.domains;
  },
  getStoreMembers: function () {
    this.data.domainMembers = this.getView().down('domaingridmembers').store;
    return this.data.domainMembers;
  },
  formulas: {
    search: {
      get: function () {
        var state = Ext.state.Manager.get('domainlistFilterTextbox') || {};
        this.filter(this.getStore(), state.value || '');
        return state.value;
      },
      set: function (value) {
        this.filter(this.getStore(), value);
      }
    },
    status: {
      bind: {
        bindTo: '{currentDomain}',
        deep: true
      },
      get: function (domain) {
        if (domain) {
          this.getStoreMembers().setRemoteSort(true);
          this.getStoreMembers().filter('query', {
            domainId: domain.id
          });
        }
      }
    },
    changedandvalid: {
      bind: {
        bindTo: '{currentDomain}',
        deep: true
      },
      get: function (domain) {
        if (domain) {
          var ret = {
            dirty: domain ? domain.dirty : false,
            valid: domain && domain.isModel ? domain.isValid() : true
          };
          return ret.dirty && ret.valid;
        } else {
          return false;
        }
      }
    }
  },
  filter: function (store, value) {
    if (store) {
      store.setRemoteSort(true);
      store.filter('query', {
        '$or': [{
          'name': {
            '$regex': '(?i)^' + value
          }
        }, {
          'categoryId': {
            '$regex': '(?i)^' + value
          }
        }]
      });
    }
  }
});
