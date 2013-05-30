(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.graph = typeof graph !== "undefined" && graph !== null ? graph : {};

  graph.GraphPointList = (function(_super) {
    __extends(GraphPointList, _super);

    function GraphPointList(graphPointClass) {
      GraphPointList.__super__.constructor.apply(this, arguments);
      this.points = [];
      this.GraphPoint = graphPointClass;
    }

    GraphPointList.prototype.addPoint = function(x, y, point_options) {
      var point;

      if (point_options == null) {
        point_options = {};
      }
      point = new this.GraphPoint(x, y, point_options);
      this.setEventListeners(point);
      this.points.push(point);
      this.sortPoints();
      return this.adjustPointLineEnds();
    };

    GraphPointList.prototype.setEventListeners = function(point) {
      point.addEventListener('mousedown', function(e) {
        return e.addEventListener('mousemove', function(e) {
          e.target.x = e.stageX;
          e.target.y = e.stageY;
          return e.dispatchEvent('pointMove');
        });
      });
      point.addEventListener('click', function(e) {});
      return point.addEventListener('dbclick', function(e) {});
    };

    GraphPointList.prototype.removePoint = function(pid) {
      return this.points = _.reject(this.points, function(point) {
        return point.id === pid;
      });
    };

    GraphPointList.prototype.sortPoints = function() {
      return this.points = _.sortBy(this.points, function(point) {
        return Math.min(point.x);
      });
    };

    GraphPointList.prototype.adjustPointLineEnds = function() {
      var last_point;

      if (this.points.length > 2) {
        this.points[0].y = this.points[1].y;
        last_point = this.points.length - 1;
        return this.points[last_point].y = this.points[last_point - 1].y;
      }
    };

    GraphPointList.prototype.render = function() {
      var point, _i, _len, _ref, _results;

      _ref = this.points;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        _results.push(this.addChild(point));
      }
      return _results;
    };

    GraphPointList.prototype.getPoints = function() {
      return this.points;
    };

    return GraphPointList;

  })(createjs.Container);

}).call(this);
