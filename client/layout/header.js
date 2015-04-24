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
  FamousUtils.displayMainTabPanel(panel, {left: -500, top: 50, height: 500, width: 400});
};
