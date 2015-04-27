Meteor.startup(function () {

  // Initialize header buttons
  HeaderButtons.remove();
  if (!HeaderButtons.findOne()) {
    HeaderButtons.insert({
      name: 'Workflows',
      icon: 'random',
      panel: 'workflowlistmain',
      idx: 1
    });
        HeaderButtons.insert({
      name: 'Domains',
      icon: 'cogs',
      panel: 'domainmain',
      idx: 2
    });
  }


  // var Workflows = new Meteor.Collection("wflow");

  // if (!Workflows.findOne()) {
  //   Workflows.insert({
  //     name: 'Supply chain',
  //     summary: 'dsdsds'
  //   });
  //   Workflows.insert({
  //     name: 'Document flow',
  //     summary: 'dsdsds'
  //   });
  //   Workflows.insert({
  //     name: 'Order processing',
  //     summary: 'dsdsds'
  //   });
  //   Workflows.insert({
  //     name: 'Inventory receive',
  //     summary: 'dsdsds'
  //   });
  // }
});
