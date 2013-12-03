(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['graph/grid'], function(Grid) {
    var VerticalGrid;

    VerticalGrid = (function(_super) {
      __extends(VerticalGrid, _super);

      function VerticalGrid(options) {
        VerticalGrid.__super__.constructor.call(this, options);
      }

      VerticalGrid.prototype.render = function() {
        var step, stepIncrement, steps, x, y, _i, _ref, _results;

        steps = this.getIntervalSteps(this.config.scale, this.config.interval);
        stepIncrement = this.getStepIncrement(this.config.width, steps);
        _results = [];
        for (step = _i = 1, _ref = steps - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; step = 1 <= _ref ? ++_i : --_i) {
          x = stepIncrement * step;
          y = this.config.height;
          this.grid.graphics.moveTo(x, 0);
          _results.push(this.grid.graphics.lineTo(x, y));
        }
        return _results;
      };

      return VerticalGrid;

    })(Grid);
    return VerticalGrid;
  });

}).call(this);
