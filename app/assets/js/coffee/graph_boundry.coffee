window.graph = graph ? {}
class graph.GraphBoundry extends createjs.Shape
  constructor: (@width, @height, @line_options={})->
    super
    @horz_spacing = 100
    @vert_spacing = 30

    @horz_lines = @width  / @horz_spacing
    @vert_lines = @height / @vert_spacing

    hitArea = new createjs.Shape()
    hitArea.graphics.beginFill('red').drawRect(0, 0, @width, @height)
    @hitArea = hitArea
    return @

  createLines: (size, num_lines, line_spacing, direction, line_options={})->
    line_thickness = line_options.line_thickness ? 1
    line_color     = line_options.line_color ? '#000'

    line_offset = if line_thickness % 2 == 1 then 0.5 else 0

    @graphics.setStrokeStyle(line_thickness)
    @graphics.beginStroke(line_color)

    for line in [0..num_lines]
      if line != 0 && line != num_lines
        increment = line * line_spacing + line_offset

        if direction == 'horz'
          start_x = end_x = increment
          start_y = 0
          end_y   = size

        else if direction == 'vert'
          start_x = 0
          start_y = end_y = increment
          end_x   = size

        @graphics.moveTo(start_x, start_y)
        @graphics.lineTo(end_x, end_y)

  getValueAtPoint: (x, y)->
    return [x, y]

  render: ->
    @graphics.clear()
    @createLines(@height, @horz_lines, @horz_spacing, 'horz', @line_options)
    @createLines(@width, @vert_lines, @vert_spacing, 'vert', @line_options)

# generic graph maker
# context, width, height, value_pairs={}, line_options={}
