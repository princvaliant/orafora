Ext.define('orf.view.workflow.design.Properties', {
  extend: 'Ext.grid.property.Grid',
  alias: 'widget.workflowdesignproperties',
  requires: ['Ext.grid.property.Grid'],
  title: 'Signal start event',
  nameColumnWidth: 165,
  sortableColumns: false,
  columnLines: false,
  reserveScrollbar : true,
  source: {
    Description: 'B test object',
    Type: 'jedan',
    Tags: 'GLO',
    grouping: false,
    autoFitColumns: true,
    productionQuality: false,
    created: Ext.Date.parse('10/15/2006', 'm/d/Y'),
    tested: false,
    version: 0.01
  },
  sourceConfig: {
    Tags: {
      displayValue: {
        xtype: 'tagfield',
        value: ['GLO']
      },
      editor: {
        xtype: 'tagfield',
        value: ['GLO'],
        displayField: 'name',
        valueField: 'name',
        filterPickList: true,
        queryMode: 'local',
        publishes: 'name',
        store: {
          fields: ['name'],
          data: [{
            name: 'GLO'
          }, {
            name: 'SAE'
          }, {
            name: 'Samsung'
          }]
        }
      }
    },
    Type: {
      editor: {
        xtype: 'combo',
        valueField: 'name',
        displayField: 'name',
        forceSelection: true,
        store: {
          fields: ['name'],
          data: [{
            name: 'jedan'
          }, {
            name: 'dva'
          }]
        }
      },
      displayName: 'Event type',
      renderer: function (v) {
        var color = v === 'jedan' ? 'green' : 'red';
        return '<span style="background: ' + color + ';">' + v + '</span>';
      }
    }
  }
});
