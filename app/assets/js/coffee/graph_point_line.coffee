graph = graph ? {}
class graph.GraphPointLine
  constructor: ->

  drawPointLine = (width, height, points, line_options={})->
    sortPoints()
    adjustPointLineEnds()
    pointLine = new createjs.Graphics()

    line_thickness = line_options.line_thickness ? 1
    line_color     = line_options.line_color ? '#000'
    # line_offset = if line_thickness % 2 == 1 then 0.5 else 0
    pointLine.setStrokeStyle(line_thickness)
    pointLine.beginStroke(line_color)

    for point, index in points
      if index == 0
        pointLine.moveTo(point.x, point.y)
      else
        pointLine.lineTo(point.x, point.y)

    pointLineShape = new createjs.Shape(pointLine)
    stage.addChild(pointLineShape)