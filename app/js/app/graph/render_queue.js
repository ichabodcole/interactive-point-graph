(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function() {
    var GraphRenderQueue;

    GraphRenderQueue = (function(_super) {
      __extends(GraphRenderQueue, _super);

      function GraphRenderQueue(elements) {
        GraphRenderQueue.__super__.constructor.call(this, elements);
        this.autoClear = false;
      }

      GraphRenderQueue.prototype.add = function() {
        var argument, _i, _len, _results;

        _results = [];
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          argument = arguments[_i];
          _results.push(this.push(argument));
        }
        return _results;
      };

      GraphRenderQueue.prototype.clear = function() {
        return this.length = 0;
      };

      GraphRenderQueue.prototype.render = function() {
        var obj, _i, _len;

        for (_i = 0, _len = this.length; _i < _len; _i++) {
          obj = this[_i];
          obj.render();
        }
        if (this.autoClear) {
          return this.clear();
        }
      };

      return GraphRenderQueue;

    })(Array);
    return GraphRenderQueue;
  });

}).call(this);
