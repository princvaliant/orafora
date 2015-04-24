
Ext.define('orf.model.domain.Category', {
  extend: 'orf.model.Base',
  statics: {
    mongoCollection: 'dmncat',
  },
  fields: [  {
      name: 'name',
      type: 'string'
    },
    {
      name: 'summary',
      type: 'string'
    }
  ]
});
