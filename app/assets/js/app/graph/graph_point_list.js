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
      this.keyboard = new graph.GraphKeyBoard();
    }

    GraphPointList.prototype.addPoint = function(x, y, options) {
      var point;

      if (options == null) {
        options = {};
      }
      point = new this.GraphPoint(x, y, options);
      this.setEventListeners(point);
      this.points.push(point);
      return this.updatePoints();
    };

    GraphPointList.prototype.addPoints = function(points) {
      var point, _i, _len;

      for (_i = 0, _len = points.length; _i < _len; _i++) {
        point = points[_i];
        this.addPoint(point.x, point.y, point.options);
      }
      return this.updatePoints();
    };

    GraphPointList.prototype.setEventListeners = function(point) {
      var _self;

      _self = this;
      point.addEventListener('mousedown', function(e) {
        return e.addEventListener('mousemove', _self.movePoint.bind(_self));
      });
      point.addEventListener('click', _self.togglePointType.bind(_self));
      return point.addEventListener('dblclick', _self.removePoint.bind(_self));
    };

    GraphPointList.prototype.movePoint = function(e) {
      e.target.x = e.stageX;
      e.target.y = e.stageY;
      this.updatePoints();
      return this.dispatchEvent('pointMove', e.target);
    };

    GraphPointList.prototype.togglePointType = function(e) {
      if (this.keyboard.keyIsDown(graph.GraphKeyBoard.SHIFT_KEY)) {
        e.target.toggleType();
        this.updatePoints();
        return this.dispatchEvent('pointTypeChange', e.target);
      }
    };

    GraphPointList.prototype.removePoint = function(e) {
      this.removeChild(e.target);
      this.points = _.reject(this.points, function(point) {
        return point.id === e.target.id;
      });
      this.updatePoints();
      return this.dispatchEvent('pointRemove', e.target);
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

    GraphPointList.prototype.getCurrentPoints = function(x, points) {
      var index, p0, p1, pIndex, point, _i, _len;

      p0 = null;
      p1 = null;
      pIndex = null;
      for (index = _i = 0, _len = points.length; _i < _len; index = ++_i) {
        point = points[index];
        if (point.x > x) {
          pIndex = index;
          break;
        }
      }
      p0 = points[pIndex - 1];
      p1 = points[pIndex];
      return {
        p0: p0,
        p1: p1
      };
    };

    GraphPointList.prototype.updatePoints = function() {
      this.sortPoints();
      return this.adjustPointLineEnds();
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
