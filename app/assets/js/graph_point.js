(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.graph = typeof graph !== "undefined" && graph !== null ? graph : {};

  graph.GraphPoint = (function(_super) {
    __extends(GraphPoint, _super);

    function GraphPoint(x, y, options, graphics) {
      var _ref, _ref1, _ref2, _ref3;

      if (options == null) {
        options = {};
      }
      GraphPoint.__super__.constructor.call(this, graphics);
      this.type = (_ref = options.type) != null ? _ref : 'linear';
      this.editable = (_ref1 = options.editable) != null ? _ref1 : true;
      this.visible = (_ref2 = options.visible) != null ? _ref2 : true;
      this.radius = (_ref3 = options.radius) != null ? _ref3 : 6;
      this.graphics.beginFill('lightblue').drawCircle(0, 0, this.radius);
      this.x = x;
      this.y = y;
      return this;
    }

    GraphPoint.prototype.setType = function(type) {
      return this.type = type;
    };

    GraphPoint.prototype.toggleType = function() {
      if (this.type === 'linear') {
        return this.type = 'curve';
      } else {
        return this.type = 'linear';
      }
    };

    return GraphPoint;

  })(createjs.Shape);

}).call(this);
