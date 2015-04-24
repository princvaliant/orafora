Meteor.publish("all-processes", function () {
    return Processes.find();
});
