(function() {
  window.graph = typeof graph !== "undefined" && graph !== null ? graph : {};

  graph.GraphPointList = (function() {
    function GraphPointList(graphPointClass) {
      this.container = new createjs.Container();
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
          e.target.x = stageX;
          return e.target.y = stageY;
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

    GraphPointList.prototype.draw = function() {
      var point, _i, _len, _ref, _results;

      _ref = this.points;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        _results.push(this.container.addChild(point));
      }
      return _results;
    };

    GraphPointList.prototype.getContainer = function() {
      return this.container;
    };

    GraphPointList.prototype.getPoints = function() {
      return this.points;
    };

    return GraphPointList;

  })();

}).call(this);
