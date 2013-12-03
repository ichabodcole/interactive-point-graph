(function() {
  define(['createjs'], function(createjs) {
    var GridLabel;

    GridLabel = (function() {
      function GridLabel(text, options) {
        this.config = {
          fontColor: '#ccc',
          fontFamily: 'Arial',
          fontStyle: 'normal',
          fontSize: 12,
          labelPosition: 'outside',
          labelMargin: 10
        };
        this.create(text);
      }

      GridLabel.prototype.create = function(text) {
        var color, font, label;

        font = this.config.fontSize + "px " + this.config.fontFamily;
        color = this.config.fontColor;
        return label = new createjs.Text(text, font, color);
      };

      return GridLabel;

    })();
    return GridLabel;
  });

}).call(this);
