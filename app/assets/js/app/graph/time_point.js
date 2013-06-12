(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['graph/point', 'math/bezier'], function(GraphPoint, Bezier) {
    var GraphTimePoint;

    GraphTimePoint = (function(_super) {
      __extends(GraphTimePoint, _super);

      function GraphTimePoint(graphPointList) {
        var first_point, i, options, _i;

        options = {
          color: 'red',
          radius: 3
        };
        this.pointList = graphPointList;
        this.fps = 1000 / 30;
        this.start_time = null;
        this.total_time = 5000;
        this.distance = 800;
        this.time_scale = this.distance / this.total_time;
        first_point = this.pointList.getPoints()[0];
        GraphTimePoint.__super__.constructor.call(this, first_point.x, first_point.y, options);
        for (i = _i = 0; _i <= 2; i = ++_i) {
          this.render();
        }
      }

      GraphTimePoint.prototype.findT = function(p0, p1) {
        var graphTimeX, now, relativeTimeX, t, tIncrement, time, xDiff;

        this.setStartTime();
        now = new Date();
        time = now - this.start_time;
        xDiff = p1.x - p0.x;
        tIncrement = 1 / xDiff;
        graphTimeX = this.time_scale * time;
        relativeTimeX = graphTimeX - p0.x;
        return t = relativeTimeX * tIncrement;
      };

      GraphTimePoint.prototype.findPointAlongPath = function() {
        var cPnts, cp0, cp1, p, p0, p1, t;

        cPnts = this.getCurrentPoints(this.x, this.pointList.getPoints());
        p0 = cPnts.p0;
        p1 = cPnts.p1;
        t = this.findT(p0, p1);
        cp0 = Bezier.cpFlat(p0, p1);
        cp1 = Bezier.cpFlat(p1, p0);
        return p = Bezier.cubicPoint(t, p0, cp0, cp1, p1);
      };

      GraphTimePoint.prototype.clearStartTime = function() {
        return this.start_time = null;
      };

      GraphTimePoint.prototype.setStartTime = function() {
        var start_time;

        if (this.start_time === null) {
          return start_time = new Date();
        }
      };

      GraphTimePoint.prototype.getCurrentPoints = function(x, points) {
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

      GraphTimePoint.prototype.move = function() {
        var p;

        p = this.findPointAlongPath();
        this.x = p.x;
        return this.y = p.y;
      };

      GraphTimePoint.prototype.render = function() {
        return this.move();
      };

      GraphTimePoint.prototype.aniLoop = function() {
        var _self;

        _self = this;
        setTimeout(function() {
          return window.requestAnimationFrame(_self.aniLoop.bind(_self));
        }, this.fps);
        return this.dispatchEvent('update');
      };

      return GraphTimePoint;

    })(GraphPoint);
    return GraphTimePoint;
  });

}).call(this);
