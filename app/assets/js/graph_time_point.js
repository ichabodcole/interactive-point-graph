(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.graph = typeof graph !== "undefined" && graph !== null ? graph : {};

  graph.GraphTimePoint = (function(_super) {
    __extends(GraphTimePoint, _super);

    function GraphTimePoint(graphPointList) {
      var first_point, options;

      options = {
        color: 'red',
        radius: 3
      };
      this.pointList = graphPointList;
      first_point = this.pointList.getPoints()[0];
      GraphTimePoint.__super__.constructor.call(this, first_point.x, first_point.y, options);
    }

    GraphTimePoint.prototype.render = function() {};

    GraphTimePoint.prototype.aniLoop = function() {
      window.requestAnimationFrame(this.aniLoop.bind(this));
      return this.render();
    };

    return GraphTimePoint;

  })(graph.GraphPoint);

}).call(this);
