window.graph = graph ? {}
class graph.GraphPointLine
  constructor: (@points=[], @line_options={})->
    @pointLine      = new createjs.Graphics()
    @pointLineShape = new createjs.Shape()

    @line_weight    = @line_options.line_weight ? 1
    @line_color     = @line_options.line_color ? '#000'
    return @

  draw: ->
    @pointLine.clear()
    @pointLine.setStrokeStyle(@line_weight)
    @pointLine.beginStroke(@line_color)

    # line_offset = if line_thickness % 2 == 1 then 0.5 else 0
    for point, index in @points
      if index == 0
        @pointLine.moveTo(point.x, point.y)
      else
        @pointLine.lineTo(point.x, point.y)

    @pointLineShape.graphics = @pointLine

  setPoints: (points)->
    @points = points

  getContainer: ->
    return @pointLineShape

  setLineColor: (color)->
    @line_color = color

  setLineThickness: (weight)->
    @line_weight = weight