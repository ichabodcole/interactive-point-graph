(function() {
  define(['lib/domReady', 'createjs', 'graph/graph', 'graph/boundry'], function(domReady, createjs, Graph, GraphBoundry) {
    var AeatherBeats;

    AeatherBeats = (function() {
      function AeatherBeats() {
        var graphOptions;

        this.stage = new createjs.Stage('pointGraph');
        this.stage_width = this.stage.canvas.width;
        this.stage_height = this.stage.canvas.height;
        this.stage.autoClear = true;
        graphOptions = {
          width: 700,
          height: 230,
          scaleXStart: 0,
          scaleXEnd: 60 * 60,
          scaleXStepCount: 10,
          scaleXZoom: 1,
          scaleYStart: 0,
          scaleYEnd: 16,
          scaleYStepCount: 8,
          scaleYZoom: 1,
          borderLineWidth: 1,
          borderColor: '#ccc',
          borderCornerRadius: 0,
          gridLineWidth: 1,
          gridColor: '#ccc',
          gridPaddingLeft: 45,
          gridPaddingBottom: 20,
          fontColor: '#ccc',
          fontFamily: 'Arial',
          fontStyle: 'normal',
          fontSize: 12
        };
        this.graphView = new Graph(graphOptions);
        this.graphView.x = 20;
        this.graphView.y = 20;
        this.graphView.addEventListener('graphUpdate', this);
        this.stage.addChild(this.graphView);
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
