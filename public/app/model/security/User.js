Ext.define('orf.model.security.User', {
  extend: 'orf.model.Base',
  statics: {
    mongoCollection: 'users'
  },
  fields: [{
    name: 'name',
    type: 'string'
  }, {
    name: 'email',
    type: 'string'
  }, {
    name: 'password',
    type: 'string'
  }, {
    name: 'active',
    type: 'boolean'
  }]
});
