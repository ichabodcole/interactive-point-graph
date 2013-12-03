(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['graph/grid'], function(Grid) {
    var GridY;

    GridY = (function(_super) {
      __extends(GridY, _super);

      function GridY(options) {
        GridY.__super__.constructor.call(this, options);
      }

      GridY.prototype.render = function() {
        var step, stepIncrement, steps, x, y, _i, _ref, _results;

        steps = this.getIntervalSteps(this.config.scale, this.config.interval);
        stepIncrement = this.getStepIncrement(this.config.height, steps);
        _results = [];
        for (step = _i = 1, _ref = steps - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; step = 1 <= _ref ? ++_i : --_i) {
          x = this.config.width;
          y = stepIncrement * step;
          this.grid.graphics.moveTo(0, y);
          _results.push(this.grid.graphics.lineTo(x, y));
        }
        return _results;
      };

      return GridY;

    })(Grid);
    return GridY;
  });

}).call(this);
