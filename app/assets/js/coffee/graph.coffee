window.graph = graph ? {}
class graph.Graph
  constructor: (@context, width, height)->
    createjs.EventDispatcher.initialize(@)
    @container = new createjs.Container()

    boundry_options = {line_color: "#ddd"}
    @boundry   = new graph.GraphBoundry(width, height, boundry_options)
    @pointList = new graph.GraphPointList(graph.GraphPoint)
    @setInitialPoints(width, height)

    @pointLine = new graph.GraphPointLine(@pointList.getPoints())

    @container.addChild(@boundry.getContainer())
    @container.addChild(@pointLine.getContainer())
    @container.addChild(@pointList.getContainer())

    #set initial start and end points.
    @setEventListeners()
    @draw()
    return @

  setEventListeners: ->
    @boundry.getContainer().addEventListener 'click', @onBoundryClick.bind(@)

  onBoundryClick: (e)->
    @pointList.addPoint(e.stageX, e.stageY)
    @pointLine.setPoints(@pointList.getPoints())
    @draw()
    @.dispatchEvent('graphUpdate')

  getContainer: ->
    return @container

  setInitialPoints: (width, height)->
    base_line = height / 2
    point_options  = {visible:false, editable:false}
    @pointList.addPoint(0, base_line, point_options)
    @pointList.addPoint(width, base_line, point_options)

  draw: ->
    @pointList.draw()
    @pointLine.draw()