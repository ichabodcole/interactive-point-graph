(function() {
  define(function() {
    var Vector;

    Vector = (function() {
      function Vector(p0, p1) {
        this.p0 = p0;
        this.p1 = p1;
      }

      Vector.prototype.median = function(p0, p1) {
        var p;

        p = (p0 - p1) / 2 + p0;
        return p;
      };

      return Vector;

    })();
    return Vector;
  });

}).call(this);
