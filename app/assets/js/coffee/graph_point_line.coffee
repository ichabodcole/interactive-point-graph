window.graph = graph ? {}
class graph.GraphPointLine extends createjs.Shape
  constructor: (@points=[], @line_options={})->
    super
    @line_weight    = @line_options.line_weight ? 1
    @line_color     = @line_options.line_color ? '#000'
    return @

  render: ->
    # need to clear the graphics object or previous render will
    # still be showing.
    @graphics.clear()
    # Must set up the strokeStyle and beginStroke after clearing the graphics object
    # because they are set set too.
    @graphics.setStrokeStyle(@line_weight)
    @graphics.beginStroke(@line_color)

    # line_offset = if line_thickness % 2 == 1 then 0.5 else 0
    for point, index in @points
      if index == 0
        @graphics.moveTo(point.x, point.y)
      else
        @graphics.lineTo(point.x, point.y)

  setPoints: (points)->
    @points = points

  setLineColor: (color)->
    @line_color = color

  setLineThickness: (weight)->
    @line_weight = weight