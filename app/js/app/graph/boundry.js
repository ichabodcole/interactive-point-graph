(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['createjs'], function(createjs) {
    var GraphBoundry;

    GraphBoundry = (function(_super) {
      __extends(GraphBoundry, _super);

      function GraphBoundry(options) {
        GraphBoundry.__super__.constructor.apply(this, arguments);
        this.config = {
          width: 700,
          height: 250,
          durationScale: 10,
          durationInterval: 60,
          elevationScale: 18,
          elevationInterval: 3,
          borderLineWidth: 1,
          borderColor: '#ccc',
          borderCornerRadius: 0,
          gridLineWidth: 1,
          gridColor: '#ccc',
          fontColor: '#ccc',
          fontFamily: 'Arial',
          fontStyle: 'normal',
          fontSize: 12,
          labelPosition: 'outside',
          labelMargin: 10,
          gridMargin: 30
        };
        this.grid = new createjs.Shape();
        this.grid.x = this.config.gridMargin;
        this.addChild(this.grid);
      }

      GraphBoundry.prototype.createBorder = function() {
        this.grid.graphics.setStrokeStyle(1);
        return this.grid.graphics.beginStroke('#ccc').drawRect(0, 0, this.config.width, this.config.height);
      };

      GraphBoundry.prototype.getIntervalSteps = function(scale, interval) {
        var steps;

        return steps = scale / interval;
      };

      GraphBoundry.prototype.getStepIncrement = function(size, steps) {
        var stepIncrement;

        return stepIncrement = size / steps;
      };

      GraphBoundry.prototype.getDurationSeconds = function() {
        return this.config.durationScale * 60;
      };

      GraphBoundry.prototype.createIntervalLabel = function(text) {
        var color, font, label;

        font = this.config.fontSize + "px " + this.config.fontFamily;
        color = this.config.fontColor;
        return label = new createjs.Text(text, font, color);
      };

      GraphBoundry.prototype.createVertGrid = function() {
        var label, scale, scaleInterval, step, stepIncrement, steps, x, y, _i, _ref, _results;

        scale = this.getDurationSeconds();
        scaleInterval = this.config.durationInterval;
        steps = this.getIntervalSteps(scale, scaleInterval);
        stepIncrement = this.getStepIncrement(this.config.width, steps);
        this.grid.graphics.beginStroke('#ccc');
        _results = [];
        for (step = _i = 1, _ref = steps - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; step = 1 <= _ref ? ++_i : --_i) {
          x = stepIncrement * step;
          y = this.config.height;
          this.grid.graphics.moveTo(x, 0);
          this.grid.graphics.lineTo(x, y);
          label = this.createIntervalLabel(step);
          label.x = x - (label.getMeasuredWidth() / 2) + this.config.gridMargin;
          label.y = y + this.config.labelMargin;
          _results.push(this.addChild(label));
        }
        return _results;
      };

      GraphBoundry.prototype.createHorzLines = function() {
        var label, scale, scaleInterval, step, stepIncrement, steps, x, y, _i, _ref, _results;

        scale = this.config.elevationScale;
        scaleInterval = this.config.elevationInterval;
        steps = this.getIntervalSteps(scale, scaleInterval);
        stepIncrement = this.getStepIncrement(this.config.height, steps);
        this.grid.graphics.beginStroke('#ccc');
        _results = [];
        for (step = _i = 1, _ref = steps - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; step = 1 <= _ref ? ++_i : --_i) {
          x = this.config.width;
          y = stepIncrement * step;
          this.grid.graphics.moveTo(0, y);
          this.grid.graphics.lineTo(x, y);
          label = this.createIntervalLabel(steps - step);
          label.x = this.config.labelMargin;
          label.y = y - (label.getMeasuredHeight() / 2);
          _results.push(this.addChild(label));
        }
        return _results;
      };

      GraphBoundry.prototype.createGrid = function() {
        this.createHorzLines();
        return this.createVertGrid();
      };

      GraphBoundry.prototype.getValueAtPoint = function(p) {};

      GraphBoundry.prototype.render = function() {
        this.createGrid();
        return this.createBorder();
      };

      return GraphBoundry;

    })(createjs.Container);
    return GraphBoundry;
  });

}).call(this);
