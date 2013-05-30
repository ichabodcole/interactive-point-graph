$ ()->
  class AeatherBeats
    constructor: ->
      @stage           = new createjs.Stage('pointGraph')
      @stage_width     = @stage.canvas.width
      @stage_height    = @stage.canvas.height
      @stage.autoClear = true
      @graphView = new graph.Graph(@stage_width, @stage_height)
      @graphView.addEventListener('graphUpdate', @)

    handleEvent: (e)->
      console.log e.type
      if e.type == 'graphUpdate'
        @onGraphUpdate()

    onGraphUpdate: ->
      @render()

    render: ->
      console.log "render"
      @stage.removeAllChildren()
      @stage.clear()
      @stage.addChild(@graphView)
      @graphView.render()
      @stage.update()

  AB = new AeatherBeats()
  AB.render()


  # onGraphClick = (evt)->
  #   point = createPoint(evt.stageX, evt.stageY)
  #   point.addEventListener('mousedown', (evt)->
  #       evt.addEventListener('mousemove', (evt)->
  #           evt.target.x = evt.stageX
  #           evt.target.y = evt.stageY
  #           render()
  #         )
  #     )
  #   points.push(point)
  #   sortPoints()
  #   adjustPointLineEnds()

  #   render()

  # createPoint = (x, y, editable=false)->
  #   size = 6
  #   point = new createjs.Shape()
  #   point.graphics.beginFill('lightblue').drawCircle(0, 0, size)
  #   point.x = x
  #   point.y = y
  #   # point.editable = editable
  #   return point

  # drawPointLine = (width, height, points, line_options={})->
  #   sortPoints()
  #   adjustPointLineEnds()
  #   pointLine = new createjs.Graphics()

  #   line_thickness = line_options.line_thickness ? 1
  #   line_color     = line_options.line_color ? '#000'
  #   # line_offset = if line_thickness % 2 == 1 then 0.5 else 0
  #   pointLine.setStrokeStyle(line_thickness)
  #   pointLine.beginStroke(line_color)

  #   for point, index in points
  #     if index == 0
  #       pointLine.moveTo(point.x, point.y)
  #     else
  #       pointLine.lineTo(point.x, point.y)

  #   pointLineShape = new createjs.Shape(pointLine)
  #   stage.addChild(pointLineShape)

  # drawPoints = ->
  #   for point in points
  #     stage.addChild(point)

  # Click canvas to add a point.
    # line should connect to new point.
    # new points should not be able to have an
    # x value less than previous point