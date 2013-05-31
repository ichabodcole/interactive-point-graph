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
      var cpx, cpx1, cpx2, cpy, cpy1, cpy2, index, last_point, lp_x, lp_y, point, points, _i, _len, _results;

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
          last_point = points[index - 1];
          lp_x = last_point.x;
          lp_y = last_point.y;
          if (point.type === 'curve' && last_point.type === 'curve') {
            cpx1 = lp_x + (point.x - lp_x) / 2;
            cpy1 = lp_y;
            cpx2 = lp_x + (point.x - lp_x) / 2;
            cpy2 = point.y;
            _results.push(this.graphics.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, point.x, point.y));
          } else if (point.type === 'curve' && last_point.type === 'linear') {
            cpx = lp_x + (point.x - lp_x) / 2;
            cpy = point.y;
            _results.push(this.graphics.curveTo(cpx, cpy, point.x, point.y));
          } else if (point.type === 'linear' && last_point.type === 'curve') {
            cpx = lp_x + (point.x - lp_x) / 2;
            cpy = lp_y;
            _results.push(this.graphics.curveTo(cpx, cpy, point.x, point.y));
          } else {
            _results.push(this.graphics.lineTo(point.x, point.y));
          }
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
