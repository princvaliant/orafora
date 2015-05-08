Ext.define('orf.model.workflow.Variable', {
  extend: 'orf.model.Base',
  statics: {
    mongoCollection: 'variable',
  },
  fields: [{
    name: 'name',
    type: 'string'
  }, {
    name: 'title',
    type: 'string'
  }, {
    name: 'datatype',
    type: 'string'
  }, {
    name: 'order',
    type: 'boolean'
  }, {
    name: 'summary',
    type: 'string'
  }, {
    name: 'advanced',
    type: 'boolean'
  }, {
    name: 'searchable',
    type: 'boolean'
  }, {
    name: 'required',
    type: 'boolean'
  }, {
    name: 'validation',
    type: 'string'
  }, {
    name: 'defaultValue',
    type: 'string'
  }, {
    name: 'list',
    type: 'string'
  }, {
    name: 'listForce',
    type: 'boolean'
  }]
});
