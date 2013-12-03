(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'createjs', 'graph/keyboard', 'graph/point'], function(_, createjs, GraphKeyBoard, GraphPoint) {
    var GraphPointList;

    GraphPointList = (function(_super) {
      __extends(GraphPointList, _super);

      function GraphPointList(min, max) {
        GraphPointList.__super__.constructor.apply(this, arguments);
        this.min = min;
        this.max = max;
        this.points = [];
        this.keyboard = new GraphKeyBoard();
      }

      GraphPointList.prototype.addPoint = function(x, y, options) {
        var point;

        if (options == null) {
          options = {};
        }
        point = new GraphPoint(x, y, options);
        this.setEventListeners(point);
        return this.points.push(point);
      };

      GraphPointList.prototype.addPoints = function(points) {
        var point, _i, _len, _results;

        _results = [];
        for (_i = 0, _len = points.length; _i < _len; _i++) {
          point = points[_i];
          _results.push(this.addPoint(point.x, point.y, point.options));
        }
        return _results;
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

      GraphPointList.prototype.checkPointBounds = function(point) {
        if (point.y > this.max.y) {
          point.y = this.max.y;
        } else if (point.y < this.min.y) {
          point.y = this.min.y;
        }
        if (point.x > this.max.x) {
          point.x = this.max.x;
        } else if (point.x < this.min.x) {
          point.x = this.min.y;
        }
        return point;
      };

      GraphPointList.prototype.movePoint = function(e) {
        var pnt;

        pnt = this.checkPointBounds(e.target.parent.globalToLocal(e.stageX, e.stageY));
        e.target.x = pnt.x;
        e.target.y = pnt.y;
        return this.dispatchEvent('pointMove', e.target);
      };

      GraphPointList.prototype.togglePointType = function(e) {
        if (this.keyboard.keyIsDown(GraphKeyBoard.SHIFT_KEY)) {
          e.target.toggleType();
          return this.dispatchEvent('pointTypeChange', e.target);
        }
      };

      GraphPointList.prototype.removePoint = function(e) {
        this.removeChild(e.target);
        this.removePointFromList(e.target.id);
        return this.dispatchEvent('pointRemove', e.target);
      };

      GraphPointList.prototype.removePointFromList = function(pointId) {
        return this.points = _.reject(this.points, function(point) {
          return point.id === pointId;
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

        this.updatePoints();
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
    return GraphPointList;
  });

}).call(this);
