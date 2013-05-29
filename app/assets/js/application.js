(function() {
  $(function() {
    var adjustPointLineEnds, aniLoop, createPoint, drawGraph, drawLines, drawPointLine, drawPoints, onGraphClick, p1, p2, points, render, sortPoints, stage, stage_height, stage_width, vert_mid_point;

    stage = new createjs.Stage('pointGraph');
    stage_width = stage.canvas.width;
    stage_height = stage.canvas.height;
    stage.autoClear = true;
    vert_mid_point = stage_height / 2;
    points = [];
    drawGraph = function(width, height) {
      var graph, graph_shape, horz_lines, horz_spacing, line_options, vert_lines, vert_spacing;

      graph = new createjs.Graphics();
      horz_spacing = 100;
      vert_spacing = 30;
      horz_lines = width / horz_spacing;
      vert_lines = height / vert_spacing;
      line_options = {};
      line_options.line_color = '#ddd';
      graph.beginFill("#fff").drawRect(0, 0, width, height);
      drawLines(graph, height, horz_lines, horz_spacing, 'horz', line_options);
      drawLines(graph, width, vert_lines, vert_spacing, 'vert', line_options);
      graph_shape = new createjs.Shape(graph);
      stage.addChild(graph_shape);
      return graph_shape.addEventListener('click', onGraphClick);
    };
    drawLines = function(context, size, num_lines, line_spacing, direction, line_options) {
      var end_x, end_y, increment, line, line_color, line_offset, line_thickness, start_x, start_y, _i, _ref, _ref1, _results;

      if (line_options == null) {
        line_options = {};
      }
      line_thickness = (_ref = line_options.line_thickness) != null ? _ref : 1;
      line_color = (_ref1 = line_options.line_color) != null ? _ref1 : '#000';
      line_offset = line_thickness % 2 === 1 ? 0.5 : 0;
      context.setStrokeStyle(line_thickness);
      context.beginStroke(line_color);
      _results = [];
      for (line = _i = 0; 0 <= num_lines ? _i <= num_lines : _i >= num_lines; line = 0 <= num_lines ? ++_i : --_i) {
        if (line !== 0 && line !== num_lines) {
          increment = line * line_spacing + line_offset;
          if (direction === 'horz') {
            start_x = end_x = increment;
            start_y = 0;
            end_y = size;
          } else if (direction === 'vert') {
            start_x = 0;
            start_y = end_y = increment;
            end_x = size;
          }
          context.moveTo(start_x, start_y);
          _results.push(context.lineTo(end_x, end_y));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    sortPoints = function() {
      return points = _.sortBy(points, function(point) {
        return Math.min(point.x);
      });
    };
    adjustPointLineEnds = function() {
      var last_point;

      points[0].y = points[1].y;
      last_point = points.length - 1;
      return points[last_point].y = points[last_point - 1].y;
    };
    onGraphClick = function(evt) {
      var point;

      point = createPoint(evt.stageX, evt.stageY);
      point.addEventListener('mousedown', function(evt) {
        return evt.addEventListener('mousemove', function(evt) {
          evt.target.x = evt.stageX;
          evt.target.y = evt.stageY;
          return render();
        });
      });
      points.push(point);
      sortPoints();
      adjustPointLineEnds();
      return render();
    };
    createPoint = function(x, y, editable) {
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
    };
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
    drawPoints = function() {
      var point, _i, _len, _results;

      _results = [];
      for (_i = 0, _len = points.length; _i < _len; _i++) {
        point = points[_i];
        _results.push(stage.addChild(point));
      }
      return _results;
    };
    render = function() {
      stage.removeAllChildren();
      stage.clear();
      drawGraph(stage_width, stage_height);
      drawPointLine(stage_width, stage_height, points);
      drawPoints();
      return stage.update();
    };
    aniLoop = function() {
      return setTimeout(function() {
        requestAnimationFrame(aniLoop);
        return render();
      }, 100);
    };
    p1 = createPoint(0, vert_mid_point);
    p1.visible = 0;
    p2 = createPoint(stage_width, vert_mid_point);
    p2.visible = 0;
    points.push(p1, p2);
    return render();
  });

}).call(this);
