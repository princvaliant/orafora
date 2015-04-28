  Transform = famous.core.Transform;
  Easing = famous.transitions.Easing;
  ModifierChain = famous.modifiers.ModifierChain;
  Transitionable = famous.transitions.Transitionable;
  SpringTransition = famous.transitions.SpringTransition;
  SnapTransition = famous.transitions.SnapTransition;
  Surface = famous.core.Surface;
  RenderController = famous.views.RenderController;
  Modifier = famous.core.Modifier;
  StateModifier = famous.modifiers.StateModifier;
  Lightbox = famous.views.Lightbox;

  Logger.setLevel("famous-views", "info");

  FamousUtils = {

      famousMain: null,
      panels: {},
      z: 1,

      showMainTabPanel: function(panel, startRect) {

          var main;
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
                      return Transform.translate(0, 0, transHide.get());
                  }
              });

              var sizeModifier = new Modifier({
                  opacity: 1,
                  align: [0, 0],
                  origin: [0, 0],
                  transform: function() {
                      return Transform.scale(transWidth.get(), transHeight.get(), 1);
                  }
              });

              var posModifier = new Modifier({
                  opacity: 1,
                  align: [0, 0],
                  origin: [0, 0],
                  transform: function() {
                      return Transform.translate(transLeft.get(), transTop.get(), 1);
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

              main = Ext.create({
                  xtype: panel,
                  renderTo: panel,
                  listeners: {
                      beforerender: function() {
                          var that = this;
                          that.setHeight(h);
                          that.setWidth(w);
                          Ext.EventManager.onWindowResize(function() {
                              that.setHeight(Ext.get('sizerPlaceholder').parent().dom.offsetHeight);
                              that.setWidth(Ext.get('sizerPlaceholder').parent().dom.offsetWidth);
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
          } else {
              main = Ext.ComponentQuery.query(panel)[0];
          }

          var active = self.panels[panel];
          active.hide.set(1);

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
              previous.hide.set(0);
          }

          self.prev = panel;
          return main;
      },

      hideMainTabPanel: function(panelToHide, panelToShow, endRect) {

          var main;
          var self = FamousUtils;
          var parentRect = Ext.get('sizerPlaceholder').parent().dom.getBoundingClientRect();
          var active = self.panels[panelToHide];
          if (self.panels[panelToShow]) {
              self.panels[panelToShow].hide.set(1);
          }
          if (active && endRect) {
              active.left.set(endRect.left, {
                  duration: 1200,
                  curve: Easing.inOutQuint
              });
              active.top.set(endRect.top - 50, {
                  duration: 1200,
                  curve: Easing.inOutQuint
              });
              active.height.set(endRect.height / parentRect.height, {
                  duration: 1200,
                  curve: Easing.inOutQuint
              });
              active.width.set(endRect.width / parentRect.width, {
                      duration: 1200,
                      curve: Easing.inOutQuint
                  },
                  function() {
                      active.hide.set(0);
                      active.left.set(5000);
                  }
              );
          }
      },

      showComp: function(definition) {

          var main;
          var self = FamousUtils;
          var div = document.createElement('div');
          div.id = Meteor.hashid();
          Ext.getBody().appendChild(div);
          definition.renderTo = div.id;
          definition.listeners = {
              beforerender: function() {
                  var that = this;
                  that.setHeight(definition.height);
                  that.setWidth(definition.width);
              }
          };
          main = Ext.create(definition);

          var transPos = new Transitionable(0);
          var transRotate = new Transitionable(Math.PI / 2);

          var translateModifier = new Modifier({
              transform: function() {
                  return Transform.translate(transPos.get(), 0, self.z++);
              }
          });

          var rotateModifier = new Modifier({
              align: [0.3, 0.2],
              origin: [0.5, 0],
              transform: function() {
                  return Transform.rotateY(transRotate.get());
              }
          });
          var surface = new Surface({
              size: [definition.width, definition.height],
              content: document.getElementById(div.id)
          });
          main.surface = surface;

          self.ctx.add(translateModifier).add(rotateModifier).add(surface);

          transRotate.set(0, {
              duration: 1800,
              curve: Easing.inOutQuint
          });

          return main;
      },

      hideComp: function(comp) {
          comp.surface.destroy();
      }
  };
