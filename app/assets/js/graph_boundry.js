(function() {
  var graph;

  graph = graph != null ? graph : {};

  graph.Graph = (function() {
    function Graph(width, height, line_options) {
      var graph_shape;

      this.width = width;
      this.height = height;
      this.line_options = line_options != null ? line_options : {};
      this.graph = new createjs.Graphics();
      this.horz_spacing = 100;
      this.vert_spacing = 30;
      this.horz_lines = this.width / this.horz_spacing;
      this.vert_lines = this.height / this.vert_spacing;
      createLines(this.graph, this.height, this.horz_lines, this.horz_spacing, 'horz', line_options);
      createLines(this.graph, this.width, this.vert_lines, this.vert_spacing, 'vert', line_options);
      graph_shape = new createjs.Shape(this.graph);
      return graph_shape;
    }

    Graph.prototype.createLines = function(context, size, num_lines, line_spacing, direction, line_options) {
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

    return Graph;

  })();

}).call(this);
