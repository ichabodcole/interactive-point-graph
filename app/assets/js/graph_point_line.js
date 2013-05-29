(function() {
  var graph;

  graph = graph != null ? graph : {};

  graph.GraphPointLine = (function() {
    var drawPointLine;

    function GraphPointLine() {}

    drawPointLine = function(width, height, points, line_options) {
      var index, line_color, line_thickness, point, pointLine, pointLineShape, _i, _len, _ref, _ref1;

      if (line_options == null) {
        line_options = {};
      }
      sortPoints();
      adjustPointLineEnds();
      pointLine = new createjs.Graphics();
      line_thickness = (_ref = line_options.line_thickness) != null ? _ref : 1;
      line_color = (_ref1 = line_options.line_color) != null ? _ref1 : '#000';
      pointLine.setStrokeStyle(line_thickness);
      pointLine.beginStroke(line_color);
      for (index = _i = 0, _len = points.length; _i < _len; index = ++_i) {
        point = points[index];
        if (index === 0) {
          pointLine.moveTo(point.x, point.y);
        } else {
          pointLine.lineTo(point.x, point.y);
        }
      }
      pointLineShape = new createjs.Shape(pointLine);
      return stage.addChild(pointLineShape);
    };

    return GraphPointLine;

  })();

}).call(this);
