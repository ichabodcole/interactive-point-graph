(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.graph = typeof graph !== "undefined" && graph !== null ? graph : {};

  graph.GraphPoint = (function(_super) {
    __extends(GraphPoint, _super);

    function GraphPoint(x, y, options, graphics) {
      var _ref, _ref1, _ref2;

      if (options == null) {
        options = {};
      }
      GraphPoint.__super__.constructor.call(this, graphics);
      this.editable = (_ref = options.editable) != null ? _ref : true;
      this.visible = (_ref1 = options.visible) != null ? _ref1 : true;
      this.radius = (_ref2 = options.radius) != null ? _ref2 : 6;
      this.graphics.beginFill('lightblue').drawCircle(0, 0, this.radius);
      this.x = x;
      this.y = y;
      return this;
    }

    return GraphPoint;

  })(createjs.Shape);

}).call(this);
