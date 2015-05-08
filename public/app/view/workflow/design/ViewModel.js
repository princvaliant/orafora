Ext.define('orf.view.workflow.design.ViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.workflowdesign',
  data: {
    paper: null,
    renderer: null,
    _title: '',
    _rect: null,
    _store: null
  },
  formulas: {
    title: function (get) {
      return get('_title');
    }
  },
  init: function (id, rect) {

    var self = this;
    self.set('_store',  Ext.create('orf.store.PagedSub', {
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
          container: self.data.paper
          // , moddleExtensions: {
          //   qa: qaPackage
          // }
        });
        // check file api availability
        if (!window.FileList || !window.FileReader) {
          window.alert(
            'Looks like you use an older browser that does not support drag and drop. ' +
            'Try using Chrome, Firefox or the Internet Explorer > 10.');
        } else {
          self.registerFileDrop(self.openDiagram);
        }
      }
      self.data.currentWorkflow = workflow;

      Tracker.autorun(function () {
        var record = Session.get('updated_' + workflow.data._id);
        if (record && record.data.bpmn) {
          self.openDiagram(record.data.bpmn);
        }
      });
      self.set('_title', workflow.data.name);
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

      // Attach events
      var eventBus = self.data.renderer.get('eventBus');
      eventBus.on('element.click', function (e) {
        //e.element = the model element
        //e.gfx = the graphical element
//        console.log(event, 'on', e.element.id);
      });

 //     console.log(self.data.renderer.definitions);

    });
  },

  registerFileDrop: function (callback) {

    function handleFileSelect(e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      var file = files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var xml = e.target.result;
        callback(xml);
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
