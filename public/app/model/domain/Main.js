Ext.define('orf.model.domain.Main', {
  extend: 'orf.model.Base',
  statics: {
    mongoCollection: 'dmn',
  },
  fields: [{
      name: 'name',
      type: 'string'
    }, {
      name: 'categoryId',
      reference: 'domain.Category',
      type: 'string'
    }, {
      name: 'summary',
      type: 'string'
    },

  ],
  validators: {
    name: {
      type: 'length',
      min: 2
    },
    categoryId: 'presence'
  }
});
