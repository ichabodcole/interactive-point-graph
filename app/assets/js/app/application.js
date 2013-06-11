(function() {
  define(['lib/domReady', 'createjs', 'graph/graph'], function(domReady, createjs, Graph) {
    var AeatherBeats;

    AeatherBeats = (function() {
      function AeatherBeats() {
        this.stage = new createjs.Stage('pointGraph');
        this.stage_width = this.stage.canvas.width;
        this.stage_height = this.stage.canvas.height;
        this.stage.autoClear = true;
        this.graphView = new Graph(this.stage_width, this.stage_height);
        this.graphView.addEventListener('graphUpdate', this);
      }

      AeatherBeats.prototype.handleEvent = function(e) {
        if (e.type === 'graphUpdate') {
          return this.onGraphUpdate();
        }
      };

      AeatherBeats.prototype.onGraphUpdate = function() {
        return this.render();
      };

      AeatherBeats.prototype.render = function() {
        this.stage.removeAllChildren();
        this.stage.clear();
        this.stage.addChild(this.graphView);
        this.graphView.render();
        return this.stage.update();
      };

      return AeatherBeats;

    })();
    return domReady(function() {
      var AB;

      AB = new AeatherBeats();
      return AB.render();
    });
  });

}).call(this);
