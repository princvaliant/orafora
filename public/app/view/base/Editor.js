Ext.define("orf.view.base.Editor", {
  singleton: true,
  create: function (obj) {

    var editor;

    if (obj.type === 'String') {
      editor = new Ext.form.field.Text({
        editable: true,
        selectOnFocus: true
      });
    }

    if (obj.type === 'orf:Date') {
      editor = new Ext.form.field.Date({
        editable: true,
        selectOnFocus: true
      });
    }

    if (obj.type === 'Number' || obj.type === 'orf:Float') {
      editor = new Ext.form.field.Number({
        editable: true,
        allowDecimals: true,
        selectOnFocus: true
      });
    }

    if (obj.type === 'Integer') {
      editor = new Ext.form.field.Number({
        allowDecimals: false,
        selectOnFocus: true
      });
    }

    if (obj.type === 'Boolean') {
      editor = new Ext.form.field.ComboBox({
        editable: false,
        store: [
          [
            true,
            'true'
          ],
          [
            false,
            'false'
          ]
        ]
      });
    }

    if (obj.type === 'orf:List' || obj.type === 'List') {
      editor = new Ext.form.field.ComboBox({
        editable: false,
        selectOnFocus: false,
        store: obj.values
      });
      editor.store.sort();
    }

    if (obj.type === 'orf:Tags' || obj.type === 'Tags') {
      editor = new Ext.form.field.Tag({
         editable: false,
         selectOnFocus: false,
         displayField: 'name',
         valueField: 'name',
         filterPickList: true,
         queryMode: 'local',
         publishes: 'name',
         store: obj.values
      });
      editor.store.sort();
    }
    editor.allowBlank = obj.allowBlank === undefined ? true : obj.allowBlank;

    return editor;
  }
});
