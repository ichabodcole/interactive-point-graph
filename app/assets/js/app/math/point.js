(function() {
  define(function() {
    var Point;

    Point = (function() {
      function Point(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }

      return Point;

    })();
    return Point;
  });

}).call(this);
