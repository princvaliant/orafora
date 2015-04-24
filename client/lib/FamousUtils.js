  Transform = famous.core.Transform;
  Easing = famous.transitions.Easing;
  ModifierChain = famous.modifiers.ModifierChain;
  Transitionable = famous.transitions.Transitionable;
  SpringTransition = famous.transitions.SpringTransition;
  SnapTransition = famous.transitions.SnapTransition;
  Surface = famous.core.Surface;
  Modifier = famous.core.Modifier;
  StateModifier = famous.modifiers.StateModifier;
  Lightbox = famous.views.Lightbox;

  FamousUtils = {

      famousMain: null,
      panels: {},
      z: 1,

      displayMainTabPanel: function(panel, startRect) {

          var self = FamousUtils;
          var parentRect = Ext.get('sizerPlaceholder').parent().dom.getBoundingClientRect();

          if (!self.panels.hasOwnProperty(panel)) {

              var transHeight = new Transitionable(0.2);
              var transWidth = new Transitionable(0.2);
              var transLeft = new Transitionable(0);
              var transTop = new Transitionable(0);
              var transHide = new Transitionable(0);

              var hideModifier = new Modifier({
                  opacity: 1,
                  align: [0, 0],
                  origin: [0, 0],
                  transform: function() {
                      return Transform.translate(transHide.get(), transHide.get(), self.z++);
                  }
              });

              var sizeModifier = new Modifier({
                  opacity: 1,
                  align: [0, 0],
                  origin: [0, 0],
                  transform: function() {
                      return Transform.scale(transWidth.get(), transHeight.get(), self.z++);
                  }
              });

              var posModifier = new Modifier({
                  opacity: 1,
                  align: [0, 0],
                  origin: [0, 0],
                  transform: function() {
                      return Transform.translate(transLeft.get(), transTop.get(), self.z++);
                  }
              });

              var sizer = document.getElementById('sizerPlaceholder');
              var div = document.createElement('div');
              div.id = panel;
              sizer.appendChild(div);

              var surface = new Surface({
                  content: document.getElementById(panel)
              });

              FamousUtils.famousMain.content.add(hideModifier).add(posModifier).add(sizeModifier).add(surface);

              var h = Ext.get('sizerPlaceholder').parent().dom.offsetHeight;
              var w = Ext.get('sizerPlaceholder').parent().dom.offsetWidth;

              var main = Ext.create({
                  xtype: panel,
                  renderTo: panel,
                  listeners: {
                      beforerender: function() {
                          var that = this;
                          that.setHeight(h);
                          that.setWidth(w);
                          Ext.EventManager.onWindowResize(function() {
                              that.setHeight(Ext.get(panel).parent().getHeight());
                              that.setWidth(Ext.get(panel).parent().getWidth());
                          });
                      }
                  }
              });
              self.panels[panel] = {
                  left: transLeft,
                  top: transTop,
                  height: transHeight,
                  width: transWidth,
                  hide: transHide
              };
          }

          var active = self.panels[panel];
          active.hide.set(0);

          active.left.set(startRect.left);
          active.top.set(startRect.top - 50);
          active.height.set(startRect.height / parentRect.height);
          active.width.set(startRect.width / parentRect.width);

          active.left.set(0, {
              duration: 1200,
              curve: Easing.inOutQuint
          });
          active.top.set(0, {
              duration: 1200,
              curve: Easing.inOutQuint
          });
          active.height.set(1, {
              duration: 1200,
              curve: Easing.inOutQuint
          });
          active.width.set(1, {
              duration: 1200,
              curve: Easing.inOutQuint
          });

          var previous = self.panels[self.prev];
          if (previous && self.prev !== panel) {
              previous.hide.set(5000);
          }

          self.prev = panel;
      }
  };
