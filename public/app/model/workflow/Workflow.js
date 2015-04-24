
Ext.define('orf.model.workflow.Workflow', {
  extend: 'orf.model.Base',
  statics: {
    mongoCollection: 'wflow',
  },
  fields: [  {
      name: 'name',
      type: 'string'
    },
    {
      name: 'summary',
      type: 'string'
    },
    {
      name: 'bpmn',
      type: 'string'
    },
    {
      name: 'svg',
      type: 'string'
    }
  ]
});
