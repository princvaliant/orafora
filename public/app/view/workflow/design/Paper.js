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
    style: 'background: #83F791;',
    dock: 'top',
    items: [{
      action: 'close',
      text: 'Close',
      glyph: 'xf00d@FontAwesome',
      handler: 'onCloseButton'
    }, {
      action: 'save',
      text: 'Save',
      glyph: 'xf0c7@FontAwesome',
      handler: 'onSaveButton'
    }, '->', {
      action: 'download',
      text: 'View BPMN 2.0 xml',
      glyph: 'xf019@FontAwesome',
      handler: 'onDownloadButton'
    }]
  }],
  items: [{
    xtype: 'box',
    name: 'proctitle',
    style: 'position:absolute;left:88px;top:25px;font-size:24px;font-weight:bold;color:#A3A3A3;',
    bind: {
        html: '{title}'
    }
  }, {
    xtype: 'box',
    html: '<div id="paperId" style="height:100%;"></div>',
    height: '100%'
  }]
});
