Ext.define('orf.view.workflow.design.ViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.workflowdesign',
  data: {
    paper: null,
    renderer: null,
    title: '',
    propTitle: '',
    currentBusinessObject: null,
    _rect: null,
    _store: null
  },
  init: function (id, rect) {

    var self = this;
    self.set('_store', Ext.create('orf.store.PagedSub', {
      model: 'orf.model.workflow.Workflow',
      filters: [{
        property: '_id',
        value: id
      }]
    }));
    self.set('_rect', rect);
    self.data._store.load(function (records, operation, success) {
      var workflow = records[0];
      if (!workflow.data.bpmn) {
        workflow.data.bpmn = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n " +
          "<bpmn2:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn2=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd\" " +
          "id=\"" + workflow.data._id + "2\" targetNamespace=\"http://bpmn.io/schema/bpmn\">\n" +
          "<bpmn2:process id=\"" + workflow.data._id + "\" isExecutable=\"false\">\n    <bpmn2:startEvent id=\"StartEvent_1\"/>\n  </bpmn2:process>\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n " +
          " <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"" + workflow.data._id + "1\">\n      <bpmndi:BPMNShape id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\">\n        <dc:Bounds height=\"36.0\" width=\"36.0\" x=\"131.0\" y=\"110.0\"/>\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</bpmn2:definitions>";
      }
      if (!self.data.renderer) {
        self.data.paper = $('#paperId');
        self.data.renderer = new Package.bpmn.Modeler({
          container: self.data.paper,
          moddleExtensions: {
            orf: BpmnExtensions
          }
        });
        // check file api availability
        if (!window.FileList || !window.FileReader) {
          window.alert(
            'Looks like you use an older browser that does not support drag and drop. ' +
            'Try using Chrome, Firefox or the Internet Explorer > 10.');
        } else {
          self.registerFileDrop();
        }
      }
      self.data.currentWorkflow = workflow;

      Tracker.autorun(function () {
        var record = Session.get('updated_' + workflow.data._id);
        if (record && record.data.bpmn) {
          self.openDiagram(record.data.bpmn);
        }
      });
      self.set('title', workflow.data.name);
      self.openDiagram(workflow.data.bpmn);
    });
  },

  initInspector: function (id, type) {
    var moddle = this.data.renderer.get('moddle');
  },

  save: function () {
    var self = this;
    self.data.renderer.saveSVG({
      format: false
    }, function (d, svg) {
      self.data.currentWorkflow.set('svg', svg);
      self.data.renderer.saveXML({
        format: false
      }, function (err, xml) {
        self.data.currentWorkflow.set('bpmn', xml);
        self.data._store.sync();
      });
    });
  },

  openDiagram: function (xml) {

    var self = this;
    self.data.renderer.importXML(xml, function (err) {
      if (err) {
        self.data.paper
          .removeClass('with-diagram')
          .addClass('with-error');
        self.data.paper.find('.error pre').text(err.message);
      } else {
        self.data.paper
          .removeClass('with-error')
          .addClass('with-diagram');
      }
      // Attach event handlers
      var eventBus = self.data.renderer.get('eventBus');
      eventBus.on('element.click', function (e) {
        self.loadInspector(e.element.businessObject);
      });
      eventBus.on('element.changed', function (e) {
        if (e.element.businessObject === self.data.currentBusinessObject) {
          self.loadInspector(e.element.businessObject);
        }
      });
      eventBus.on('shape.added', function (e) {
        if (e.element.businessObject.$parent === undefined && e.element.businessObject.$type !== 'bpmn:SequenceFlow') {
          self.loadInspector(e.element.businessObject);
        }
      });
    });
  },

  saveProperties: function (source) {
    for (var prop in source) {
      this.data.currentBusinessObject[prop] = source[prop];
    }
  },

  saveAuthorization: function (records) {

    var bo = this.get('currentBusinessObject'),
      moddle = this.data.renderer.get('moddle');
    if (!bo.extensionElements) {
      bo.extensionElements = moddle.create('bpmn:ExtensionElements');
    }
    bo.extensionElements.values = _.filter(bo.extensionElements.values, function (x) {
      return x.$type !== 'orf:Authorization';
    });
    for (var record in records) {
      var auth = moddle.create('orf:Authorization');
      for (var prop in records[record].data) {
        if (prop !== 'id') {
          auth[prop] = records[record].data[prop];
        }
      }
      bo.extensionElements.values.push(auth);
    }
  },

  loadInspector: function (businessObject) {

    var self = this,
      moddle = self.data.renderer.get('moddle'),
      grid = Ext.ComponentQuery.query('workflowdesignproperties')[0],
      authgrid = Ext.ComponentQuery.query('workflowdesignauthorization')[0],
      definition = _.filter(BpmnExtensions.types, function (obj) {
        return _.contains(obj.extends, businessObject.$type);
      })[0],
      source = {},
      sourceConfig = {};

    // Complete edit from previous edit
    grid.plugins[0].completeEdit();
    authgrid.plugins[0].completeEdit();

    // Initialize title and store currently selected object from graph
    var botype = businessObject.$type.replace('bpmn:', '');
    botype = botype.match(/[A-Z][a-z]+/g).join(' ');
    botype += ': ' + (businessObject.name || '[name not defined]');
    self.set('propTitle', botype);
    self.set('currentBusinessObject', businessObject);

    if (definition) {

      // Retrieve attributes of the selected object in graph
      var attrs = _.where(definition.properties, {
        isAttr: true
      });
      _.each(attrs, function (obj) {
        var value = businessObject[obj.ns.localName] || '';
        var editor = orf.view.base.Editor.create(obj);

        source[obj.ns.localName] = value;
        if (obj.type === 'orf:Date') {
          if (!value) {
            value = new Date();
          }
          source[obj.ns.localName] = Ext.util.Format.date(value, 'm/d/Y');
        }
        if (obj.type === 'Boolean') {
          source[obj.ns.localName] = value ? grid.headerCt.trueText : grid.headerCt.falseText;

        }
        sourceConfig[obj.ns.localName] = {};
        sourceConfig[obj.ns.localName].editor = editor;
      });

      // Retrieve authorization objects if exists in graph
      var auth = _.where(definition.properties, {
        type: 'orf:Authorization'
      })[0];
      if (auth) {
        self.set('authHidden', false);
        if (businessObject.extensionElements) {
          var array = _.filter(businessObject.extensionElements.get('values'), function (x) {
            return x.$type === 'orf:Authorization';
          });
          authgrid.store.loadData(array);
        } else {
          authgrid.store.removeAll();
        }
      } else {
        self.set('authHidden', true);
      }

      // Retrieve attributes object if exists in graph
      var attr = _.where(definition.properties, {
        type: 'orf:Attribute'
      })[0];
      if (attr) {
        self.set('attrHidden', false);

      } else {
        self.set('attrHidden', true);
      }
    }

    // Initialize property grid with the data from selected object
    grid.setSource(source, sourceConfig);
  },

  getExtension: function (element, type) {
    if (!element.extensionElements) {
      return null;
    }
    return element.extensionElements.values.filter(function (e) {
      return e.$instanceOf(type);
    })[0];
  },

  registerFileDrop: function () {

    var self = this;

    function handleFileSelect(e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      var file = files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var xml = e.target.result;
        self.openDiagram(xml);
      };
      reader.readAsText(file);
    }

    function handleDragOver(e) {
      e.stopPropagation();
      e.preventDefault();

      e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    this.data.paper.get(0).addEventListener('dragover', handleDragOver, false);
    this.data.paper.get(0).addEventListener('drop', handleFileSelect, false);
  }
});
