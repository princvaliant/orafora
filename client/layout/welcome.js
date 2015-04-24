Template.welcome.rendered = function () {
  var fview = FView.from(this);
  fview.modifier.setTransform(
    Transform.translate(0, 0, Globals.currentZIndex++),
    { duration : 890, curve: Easing.outBack }
  );
};
