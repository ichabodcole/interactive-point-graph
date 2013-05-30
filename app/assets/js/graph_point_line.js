(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.graph = typeof graph !== "undefined" && graph !== null ? graph : {};

  graph.GraphPointLine = (function(_super) {
    __extends(GraphPointLine, _super);

    function GraphPointLine(graphPointList, line_options) {
      var _ref, _ref1;

      this.line_options = line_options != null ? line_options : {};
      GraphPointLine.__super__.constructor.apply(this, arguments);
      this.pointList = graphPointList;
      this.line_weight = (_ref = this.line_options.line_weight) != null ? _ref : 1;
      this.line_color = (_ref1 = this.line_options.line_color) != null ? _ref1 : '#000';
      return this;
    }

    GraphPointLine.prototype.render = function() {
      var index, point, points, _i, _len, _results;

      this.graphics.clear();
      this.graphics.setStrokeStyle(this.line_weight);
      this.graphics.beginStroke(this.line_color);
      points = this.pointList.getPoints();
      _results = [];
      for (index = _i = 0, _len = points.length; _i < _len; index = ++_i) {
        point = points[index];
        if (index === 0) {
          _results.push(this.graphics.moveTo(point.x, point.y));
        } else {
          _results.push(this.graphics.lineTo(point.x, point.y));
        }
      }
      return _results;
    };

    GraphPointLine.prototype.setLineColor = function(color) {
      return this.line_color = color;
    };

    GraphPointLine.prototype.setLineThickness = function(weight) {
      return this.line_weight = weight;
    };

    return GraphPointLine;

  })(createjs.Shape);

}).call(this);
