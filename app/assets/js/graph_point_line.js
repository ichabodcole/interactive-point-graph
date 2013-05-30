(function() {
  window.graph = typeof graph !== "undefined" && graph !== null ? graph : {};

  graph.GraphPointLine = (function() {
    function GraphPointLine(points, line_options) {
      var _ref, _ref1;

      this.points = points != null ? points : [];
      this.line_options = line_options != null ? line_options : {};
      this.pointLine = new createjs.Graphics();
      this.pointLineShape = new createjs.Shape();
      this.line_weight = (_ref = this.line_options.line_weight) != null ? _ref : 1;
      this.line_color = (_ref1 = this.line_options.line_color) != null ? _ref1 : '#000';
      return this;
    }

    GraphPointLine.prototype.draw = function() {
      var index, point, _i, _len, _ref;

      this.pointLine.clear();
      this.pointLine.setStrokeStyle(this.line_weight);
      this.pointLine.beginStroke(this.line_color);
      _ref = this.points;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        point = _ref[index];
        if (index === 0) {
          this.pointLine.moveTo(point.x, point.y);
        } else {
          this.pointLine.lineTo(point.x, point.y);
        }
      }
      return this.pointLineShape.graphics = this.pointLine;
    };

    GraphPointLine.prototype.setPoints = function(points) {
      return this.points = points;
    };

    GraphPointLine.prototype.getContainer = function() {
      return this.pointLineShape;
    };

    GraphPointLine.prototype.setLineColor = function(color) {
      return this.line_color = color;
    };

    GraphPointLine.prototype.setLineThickness = function(weight) {
      return this.line_weight = weight;
    };

    return GraphPointLine;

  })();

}).call(this);
