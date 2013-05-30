(function() {
  window.graph = typeof graph !== "undefined" && graph !== null ? graph : {};

  graph.GraphPoint = (function() {
    function GraphPoint(x, y, options) {
      var point, size, _ref, _ref1;

      if (options == null) {
        options = {};
      }
      size = 6;
      point = new createjs.Shape();
      point.graphics.beginFill('lightblue').drawCircle(0, 0, size);
      point.x = x;
      point.y = y;
      point.editable = (_ref = options.editable) != null ? _ref : true;
      point.visible = (_ref1 = options.visible) != null ? _ref1 : true;
      return point;
    }

    return GraphPoint;

  })();

}).call(this);
