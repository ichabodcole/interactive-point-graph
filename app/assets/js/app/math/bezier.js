(function() {
  define(function() {
    var Bezier;

    Bezier = (function() {
      Bezier.linearPoint = function(t, p0, p1) {
        var a, b, x, y;

        a = 1 - t;
        b = t;
        x = p0.x * a + p1.x * b;
        y = p0.y * a + p1.y * b;
        return {
          x: x,
          y: y
        };
      };

      Bezier.quadraticPoint = function(t, p0, p1, p2) {
        var a, b, c, x, y;

        a = Math.pow(t, 2);
        b = 2 * t * (1 - t);
        c = Math.pow(1 - t, 2);
        x = p0.x * a + p1.x * b + p2.x * c;
        y = p0.y * a + p1.y * b + p2.y * c;
        return {
          x: x,
          y: y
        };
      };

      Bezier.cubicPoint = function(t, p0, p1, p2, p3) {
        var a, b, c, d, x, y;

        a = Math.pow(t, 3);
        b = 3 * Math.pow(t, 2) * (1 - t);
        c = 3 * t * Math.pow(1 - t, 2);
        d = Math.pow(1 - t, 3);
        x = p0.x * a + p1.x * b + p2.x * c + p3.x * d;
        y = p0.y * a + p1.y * b + p2.y * c + p3.y * d;
        return {
          x: x,
          y: y
        };
      };

      Bezier.cpFlat = function(p0, p1) {
        var x, y;

        x = this.median(p0.x, p1.x);
        y = p0.y;
        return {
          x: x,
          y: y
        };
      };

      Bezier.cpAngle = function(p0, p1, p2) {
        var mp0x, mp0y, mp1x, mp1y;

        mp0x = this.median(p0.x, p1.x);
        mp0y = this.median(p0.y, p1.y);
        mp1x = this.median(p1.x, p2.x);
        return mp1y = this.median(p1.y, p2.y);
      };

      Bezier.median = function(n0, n1) {
        var v;

        v = (n0 - n1) / 2 + n0;
        return v;
      };

      function Bezier() {}

      return Bezier;

    })();
    return Bezier;
  });

}).call(this);
