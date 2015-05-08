Template.header.rendered = function () {
  Meteor.subscribe('header-buttons');
  var fview = FView.from(this);
  fview.modifier.setTransform(
    Transform.translate(0, 0), {
      duration: 900,
      curve: 'easeOut'
    }
  );
};

Template.header.helpers({
  buttons: function () {
    return HeaderButtons.find({}, {
      sort: {
        idx: 1
      }
    });
  }
});

Template.header.events({
  'click a.btn': function (event, tpl) {
    headerButtonsClicked(event.target.name);
  }
});

var headerButtonsClicked = function (panel) {

   //    var pan = FUS.showMainTabPanel('workflowdesignmain', {left: 1300, top: 40, height: 700, width: 960});
 // pan.getViewModel().init('0B985DkdM', {left: 500, top: 40, height: 700, width: 960});

  FUS.showMainTabPanel(panel, {left: 800, top: 40, height: 700, width: 1260});
};
