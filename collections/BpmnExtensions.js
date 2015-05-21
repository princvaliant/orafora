// Properties definitions
//
// Boolean, String, Number, Integer, Float, Date, List


BpmnExtensions = {
  name: "BpmnOrafora",
  uri: "http://orafora.com/schema/bpmn/orf",
  prefix: "orf",
  xml: {
    tagAlias: "lowerCase"
  },
  types: [{
    name: "Process",
    extends: [
      "bpmn:Process"
    ],
    properties: [{
      name: "category",
      isAttr: true,
      type: "String"
    }, {
      name: "comment",
      isBody: true,
      type: "String"
    }, {
      name: "attributes",
      isMany: true,
      type: "Attribute"
    }]
  }, {
    name: "Task",
    extends: [
      "bpmn:Task", "bpmn:UserTask", "bpmn:ManualTask"
    ],
    properties: [{
      name: "idx",
      isAttr: true,
      type: "Integer"
    }, {
      name: "isManual",
      isAttr: true,
      type: "Boolean"
    }, {
      name: "somenumber",
      isAttr: true,
      type: "Float"
    }, {
      name: "created2",
      isAttr: true,
      type: "Date"
    }, {
      name: "list",
      isAttr: true,
      type: "List",
      values: ['GLO', 'SSSS', 'fffff']
    }, {
      name: "title",
      isAttr: true,
      type: "String"
    }, {
      name: "comment",
      isBody: true,
      type: "String"
    }, {
      name: "authorization",
      isMany: true,
      type: "Authorization"
    }, {
      name: "attributes",
      isMany: true,
      type: "Attribute"
    }]
  }, {
    name: "Start",
    extends: [
      "bpmn:StartEvent"
    ],
    properties: [{
      name: "title",
      isAttr: true,
      type: "String"
    }, {
      name: "comment",
      isBody: true,
      type: "String"
    }, {
      name: "attributes",
      isMany: true,
      type: "Attribute"
    },{
      name: "authorization",
      isMany: true,
      type: "Authorization"
    }]
  }, {
    name: "Flow",
    extends: [
      "bpmn:SequenceFlow"
    ],
    properties: [{
      name: "priority",
      isAttr: true,
      type: "Integer"
    }]
  }, {
    name: "Authorization",
    superClass: ["Element"],
    properties: [{
      name: "cast",
      isAttr: true,
      type: "List",
      flex: 1,
      allowBlank: false,
      values: ['USER', 'ROLE']
    }, {
      name: "name",
      isAttr: true,
      flex: 3,
      allowBlank: false,
      type: "String"
    }, {
      name: "permission",
      isAttr: true,
      flex: 2,
      allowBlank: false,
      type: "Tags",
      values: ['ALL', 'W', 'R', 'D']
    }]
  }, {
    name: "Attribute",
    superClass: ["Element"],
    properties: [{
      name: "name",
      isAttr: true,
      type: "String"
    }, {
      name: "title",
      isAttr: true,
      type: "String"
    }]
  }, ],
  "emumerations": [],
  "associations": []
};
