(function() {
  window.math = typeof math !== "undefined" && math !== null ? math : {};

  math.Point = (function() {
    function Point(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }

    return Point;

  })();

  math.Vector = (function() {
    function Vector() {}

    return Vector;

  })();

}).call(this);
