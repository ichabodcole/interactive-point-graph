(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['createjs'], function(createjs) {
    var GraphLabel;

    GraphLabel = (function(_super) {
      __extends(GraphLabel, _super);

      function GraphLabel(text, options) {
        var color, defaults, font;

        if (options == null) {
          options = {};
        }
        GraphLabel.__super__.constructor.apply(this, arguments);
        defaults = {
          fontColor: '#ccc',
          fontFamily: 'Arial',
          fontStyle: 'normal',
          fontSize: 12
        };
        this.config = _.defaults(options, defaults);
        font = this.config.fontSize + "px " + this.config.fontFamily;
        color = this.config.fontColor;
        this.label = new createjs.Text(text, font, color);
        return this;
      }

      GraphLabel.prototype.textHeight = function() {
        return this.label.getMeasuredHeight();
      };

      GraphLabel.prototype.textWidth = function() {
        return this.label.getMeasuredWidth();
      };

      GraphLabel.prototype.render = function() {
        return this.addChild(this.label);
      };

      return GraphLabel;

    })(createjs.Container);
    return GraphLabel;
  });

}).call(this);
