(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['createjs', 'graph/label'], function(createjs, GraphLabel) {
    var GraphGrid;

    GraphGrid = (function(_super) {
      __extends(GraphGrid, _super);

      function GraphGrid(options) {
        var defaults, hitArea;

        if (options == null) {
          options = {};
        }
        GraphGrid.__super__.constructor.apply(this, arguments);
        defaults = {
          width: 600,
          height: 300,
          borderLineWidth: 1,
          borderColor: '#ccc',
          borderCornerRadius: 0,
          gridLineWidth: 1,
          gridColor: '#ccc',
          gridPaddingLeft: 45,
          gridPaddingBottom: 20
        };
        this.config = _.defaults(options, defaults);
        hitArea = new createjs.Shape();
        hitArea.graphics.beginFill('red').drawRect(0, 0, this.config.width, this.config.height);
        this.hitArea = hitArea;
        this.grid = new createjs.Shape();
        this.addChild(this.grid);
        this.grid.x = this.config.gridPaddingLeft;
        return this;
      }

      GraphGrid.prototype.createBorder = function() {
        this.grid.graphics.setStrokeStyle(this.config.borderLineWidth);
        return this.grid.graphics.beginStroke(this.config.borderColor).drawRect(0, 0, this.config.width, this.config.height);
      };

      GraphGrid.prototype.formatTime = function(totalSeconds) {
        var mins, seconds, text, time;

        time = totalSeconds / 60;
        mins = Math.floor(time);
        seconds = Math.round((time % 1) * 60);
        if (seconds === 0) {
          seconds = "00";
        } else if (seconds < 10) {
          seconds = "0" + seconds;
        }
        return text = mins + ":" + seconds;
      };

      GraphGrid.prototype.addLabelX = function(step, x, y) {
        var label, text, timeStep;

        timeStep = (step * this.config.scaleXInterval) + this.config.scaleXStart;
        text = this.formatTime(timeStep);
        label = new GraphLabel(text);
        label.render();
        label.x = (x - label.textWidth() / 2) + this.config.gridPaddingLeft;
        label.y = y + this.config.gridPaddingBottom;
        return this.addChild(label);
      };

      GraphGrid.prototype.addLabelY = function(step, x, y) {
        var label, stepNum, text;

        stepNum = step * this.config.scaleYInterval + this.config.scaleYStart;
        text = (Math.round(stepNum * 100) / 100) + "hz";
        label = new GraphLabel(text);
        label.render();
        label.x = 0;
        label.y = y - label.textHeight() / 2;
        return this.addChild(label);
      };

      GraphGrid.prototype.createGridX = function() {
        var scaleEnd, scaleStart, step, stepIncrement, steps, x, y, _i, _results;

        scaleStart = this.config.scaleXStart;
        scaleEnd = this.config.scaleXEnd;
        steps = this.config.scaleXStepCount;
        this.config.scaleXInterval = this.getStepsInterval(scaleStart, scaleEnd, steps);
        stepIncrement = this.getStepIncrement(this.config.width, steps);
        this.grid.graphics.setStrokeStyle(this.config.gridLineWidth);
        this.grid.graphics.beginStroke(this.config.gridColor);
        _results = [];
        for (step = _i = 0; 0 <= steps ? _i <= steps : _i >= steps; step = 0 <= steps ? ++_i : --_i) {
          x = stepIncrement * step;
          y = this.config.height;
          if (step > 0 && step < steps) {
            this.grid.graphics.moveTo(x, 0);
            this.grid.graphics.lineTo(x, y);
          }
          _results.push(this.addLabelX(step, x, y));
        }
        return _results;
      };

      GraphGrid.prototype.createGridY = function() {
        var scaleEnd, scaleStart, start, step, stepIncrement, steps, x, y, _i, _results;

        scaleStart = this.config.scaleYStart;
        scaleEnd = this.config.scaleYEnd;
        steps = this.config.scaleYStepCount;
        this.config.scaleYInterval = this.getStepsInterval(scaleStart, scaleEnd, steps);
        stepIncrement = this.getStepIncrement(this.config.height, steps);
        this.grid.graphics.setStrokeStyle(this.config.gridLineWidth);
        this.grid.graphics.beginStroke(this.config.gridColor);
        start = this.config.elavationStart;
        _results = [];
        for (step = _i = steps; steps <= 0 ? _i <= 0 : _i >= 0; step = steps <= 0 ? ++_i : --_i) {
          x = this.config.width;
          y = stepIncrement * step;
          if (step > 0 && step < steps) {
            this.grid.graphics.moveTo(0, y);
            this.grid.graphics.lineTo(x, y);
          }
          _results.push(this.addLabelY(steps - step, x, y));
        }
        return _results;
      };

      GraphGrid.prototype.getStepsInterval = function(scaleStart, scaleEnd, steps) {
        var interval;

        return interval = (scaleEnd - scaleStart) / steps;
      };

      GraphGrid.prototype.getIntervalSteps = function(scaleStart, scaleEnd, interval) {
        var steps;

        return steps = (scaleEnd - scaleStart) / interval;
      };

      GraphGrid.prototype.getStepIncrement = function(size, steps) {
        var stepIncrement;

        return stepIncrement = size / steps;
      };

      GraphGrid.prototype.getValueAtPoint = function(p) {};

      GraphGrid.prototype.getValueAtTime = function(t) {};

      GraphGrid.prototype.getGridRegPoint = function() {
        var x, y;

        x = this.grid.x;
        y = this.grid.y;
        return {
          x: x,
          y: y
        };
      };

      GraphGrid.prototype.createGrid = function() {
        this.createGridX();
        return this.createGridY();
      };

      GraphGrid.prototype.render = function() {
        this.createGrid();
        return this.createBorder();
      };

      return GraphGrid;

    })(createjs.Container);
    return GraphGrid;
  });

}).call(this);
