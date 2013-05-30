window.graph = graph ? {}
class graph.Graph extends createjs.Container
  constructor: (width, height)->
    super
    @renderQueue = new graph.GraphRenderQueue()

    boundry_options = {line_color: "#ddd"}
    @boundry   = new graph.GraphBoundry(width, height, boundry_options)
    @pointList = new graph.GraphPointList(graph.GraphPoint)
    @setInitialPoints(width, height)

    @pointLine = new graph.GraphPointLine(@pointList)

    @addChild(@boundry)
    @addChild(@pointLine)
    @addChild(@pointList)

    @setEventListeners()
    # Add initial items to be rendered on instantiation
    @renderQueue.add(@boundry, @pointList, @pointLine)
    return @

  setEventListeners: ->
    @boundry.addEventListener 'click', @onBoundryClick.bind(@)
    @pointList.addEventListener 'pointMove', @onPointUpdate.bind(@)

  onPointUpdate: (e)->
    @renderQueue.add(@pointList, @pointLine)
    @dispatchEvent('graphUpdate')

  onBoundryClick: (e)->
    @pointList.addPoint(e.stageX, e.stageY)
    @renderQueue.add(@pointList, @pointLine)
    @dispatchEvent('graphUpdate')

  setInitialPoints: (width, height)->
    base_line = height / 2
    point_options  = {visible:false, editable:false}
    @pointList.addPoint(0, base_line, point_options)
    @pointList.addPoint(width, base_line, point_options)

  render: ->
    @renderQueue.render()
    @renderQueue.clear()


