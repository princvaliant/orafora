Ext.define('orf.model.Base', {
  extend: 'Ext.data.Model',

  fields: [{
    name: '_id',
    type: 'string'
  }, {
    name: 'added',
    type: 'date'
  }, {
    name: 'updated',
    type: 'date'
  }],
  idProperty: '_id',
  schema: {
    namespace: 'orf.model'
  }
});
