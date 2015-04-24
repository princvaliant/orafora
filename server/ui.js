Meteor.publish("header-buttons", function () {
    return HeaderButtons.find();
});
