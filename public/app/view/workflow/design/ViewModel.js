Ext.define('orf.view.workflow.design.ViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.workflowdesign',
  data: {
    paper: null,
    renderer: null,
    title: '',
    currentWorkflow: null,
    store: null
  },
  formulas: {
    title: function (get) {
      return get('title');
    }
  },
  init: function (workflow, store) {

    var self = this;
    var bpmn = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n " +
      "<bpmn2:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn2=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd\" " +
      "id=\"" + workflow.data._id + "2\" targetNamespace=\"http://bpmn.io/schema/bpmn\">\n" +
      "<bpmn2:process id=\"" + workflow.data._id + "\" isExecutable=\"false\">\n    <bpmn2:startEvent id=\"StartEvent_1\"/>\n  </bpmn2:process>\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n " +
      " <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"" + workflow.data._id + "1\">\n      <bpmndi:BPMNShape id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\">\n        <dc:Bounds height=\"36.0\" width=\"36.0\" x=\"131.0\" y=\"110.0\"/>\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</bpmn2:definitions>";
    self.set('currentWorkflow', workflow);
    self.set('store', store);

    if (workflow.data.bpmn) {
      bpmn = workflow.data.bpmn;
    }

    if (!self.data.renderer) {
      self.data.paper = $('#paperId');
      self.data.renderer = new Package.bpmn.Modeler({
        container: self.data.paper
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

    self.set('title', workflow.data.name);
    self.openDiagram(bpmn);
  },

  save: function () {

    var self = this;
    this.data.renderer.saveSVG(function (d, svg) {

      self.data.currentWorkflow.beginEdit();
      self.data.currentWorkflow.set('svg', svg);
      self.data.currentWorkflow.endEdit();
      self.data.store.sync();
    });

    this.data.renderer.saveXML({
      format: true
    }, function (err, xml) {
      self.data.currentWorkflow.beginEdit();
      self.data.currentWorkflow.set('bpmn', xml);
      self.data.currentWorkflow.endEdit();
      self.data.store.sync();
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
