(function() {
  var graph;

  graph = graph != null ? graph : {};

  graph.GraphPoint = (function() {
    function GraphPoint(x, y, editable) {
      var point, size;

      if (editable == null) {
        editable = false;
      }
      size = 6;
      point = new createjs.Shape();
      point.graphics.beginFill('lightblue').drawCircle(0, 0, size);
      point.x = x;
      point.y = y;
      return point;
    }

    return GraphPoint;

  })();

}).call(this);
