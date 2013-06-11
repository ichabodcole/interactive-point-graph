(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['graph/point'], function(GraphPoint) {
    var GraphTimePoint;

    GraphTimePoint = (function(_super) {
      __extends(GraphTimePoint, _super);

      function GraphTimePoint(graphPointList) {
        var first_point, options;

        options = {
          color: 'red',
          radius: 3
        };
        this.pointList = graphPointList;
        this.fps = 1000 / 30;
        this.start_time = new Date();
        this.total_time = 5000;
        this.distance = 780;
        this.time_scale = this.distance / this.total_time;
        first_point = this.pointList.getPoints()[0];
        GraphTimePoint.__super__.constructor.call(this, first_point.x, first_point.y, options);
      }

      GraphTimePoint.prototype.findPointAlongPath = function() {};

      GraphTimePoint.prototype.move = function() {
        var now, time;

        now = new Date();
        time = now - this.start_time;
        return this.x = this.time_scale * time;
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
