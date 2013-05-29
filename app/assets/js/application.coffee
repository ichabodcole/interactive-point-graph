$ ()->
  stage = new createjs.Stage('pointGraph')
  stage_width = stage.canvas.width
  stage_height = stage.canvas.height
  stage.autoClear = true
  vert_mid_point = stage_height / 2
  points = []

  #
  # GRAPH DRAWING CODE
  #

  drawGraph = (width, height)->
    graph = new createjs.Graphics()

    horz_spacing = 100
    vert_spacing = 30

    horz_lines = width  / horz_spacing
    vert_lines = height / vert_spacing

    line_options = {}
    line_options.line_color = '#ddd'

    graph.beginFill("#fff").drawRect(0, 0, width, height)

    drawLines(graph, height, horz_lines, horz_spacing, 'horz', line_options)
    drawLines(graph, width, vert_lines, vert_spacing, 'vert', line_options)

    graph_shape = new createjs.Shape(graph)
    stage.addChild(graph_shape)

    graph_shape.addEventListener('click', onGraphClick)

  # generic graph maker
  # context, width, height, value_pairs={}, line_options={}

  drawLines = (context, size, num_lines, line_spacing, direction, line_options={})->
    line_thickness = line_options.line_thickness ? 1
    line_color     = line_options.line_color ? '#000'

    line_offset = if line_thickness % 2 == 1 then 0.5 else 0

    context.setStrokeStyle(line_thickness)
    context.beginStroke(line_color)

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

        context.moveTo(start_x, start_y)
        context.lineTo(end_x, end_y)


  #
  # LINE DRAWING CODE
  #

  sortPoints = ->
    points = _.sortBy points, (point)->
        return Math.min(point.x)

  adjustPointLineEnds = ->
    points[0].y = points[1].y

    last_point = points.length - 1
    points[last_point].y = points[last_point - 1].y

  onGraphClick = (evt)->
    point = createPoint(evt.stageX, evt.stageY)
    point.addEventListener('mousedown', (evt)->
        evt.addEventListener('mousemove', (evt)->
            evt.target.x = evt.stageX
            evt.target.y = evt.stageY
            render()
          )
      )
    points.push(point)
    sortPoints()
    adjustPointLineEnds()

    render()

  createPoint = (x, y, editable=false)->
    size = 6
    point = new createjs.Shape()
    point.graphics.beginFill('lightblue').drawCircle(0, 0, size)
    point.x = x
    point.y = y
    # point.editable = editable
    return point

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

  drawPoints = ->
    for point in points
      stage.addChild(point)

  render = ->
    stage.removeAllChildren()
    stage.clear()
    drawGraph(stage_width, stage_height)
    drawPointLine(stage_width, stage_height, points)
    drawPoints()
    stage.update()

  aniLoop = ->
    setTimeout ->
      requestAnimationFrame(aniLoop)
      render()
    ,100


  p1 = createPoint(0, vert_mid_point)
  p1.visible = 0
  p2 = createPoint(stage_width, vert_mid_point)
  p2.visible = 0
  points.push(p1, p2)

  render()

  # Click canvas to add a point.
    # line should connect to new point.
    # new points should not be able to have an
    # x value less than previous point