Ext.define('orf.view.workflow.design.Paper', {
  extend: 'Ext.Panel',
  alias: 'widget.workflowdesignpaper',
  requires: ['Ext.toolbar.Toolbar',
    'Ext.form.field.ComboBox'
  ],
  border: true,
  layout: 'fit',
  dockedItems: [{
    xtype: 'toolbar',
    style: 'background: #F4F4F3;',
    dock: 'top',
    items: [{
      tooltip: 'Undo ctrl+Z',
      style: 'background: transparent; border:0;',
        glyph: 'xf0e2@FontAwesome',
      action: 'undo'
    }, {
      tooltip: 'Undo ctrl+Y',
      style: 'background: transparent; border:0;',
        glyph: 'xf01e@FontAwesome',
      action: 'redo'
    }, {
      tooltip: 'Zoom-in',
      style: 'background: transparent; border:0;',
             glyph: 'xf00e@FontAwesome',
      action: 'zoomin'
    }, {
      tooltip: 'Zoom-out',
      style: 'background: transparent; border:0;',
              glyph: 'xf010@FontAwesome',
      action: 'zoomout'
    }, '->', {
      action: 'deploy',
      text: 'Deploy',
      iconCls: 'icon-download'
    }]
  }],
  items: [{
    xtype: 'box',
    name: 'proctitle',
    html: 'Process',
    style: 'position:absolute;left:88px;top:25px;font-size:24px;font-weight:bold;color:#D3D3D3;'
  },{
    xtype: 'box',
    html: '<div id="paperId" style="height:100%;"></div>',
    height: '100%'
  }]
});
