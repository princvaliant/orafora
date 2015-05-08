Ext.define('orf.model.security.Role', {
  extend: 'orf.model.Base',
  statics: {
    mongoCollection: 'roles'
  },
  fields: [{
    name: 'name',
    type: 'string'
  }, {
    name: 'summary',
    type: 'string'
  }, {
    name: 'active',
    type: 'boolean'
  }]
});
