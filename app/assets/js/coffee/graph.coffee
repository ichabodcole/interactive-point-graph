window.graph = graph ? {}
class graph.Graph extends createjs.Container
  constructor: (width, height)->
    super
    # createjs.EventDispatcher.initialize(@)

    boundry_options = {line_color: "#ddd"}
    @boundry   = new graph.GraphBoundry(width, height, boundry_options)
    @pointList = new graph.GraphPointList(graph.GraphPoint)
    @setInitialPoints(width, height)

    @pointLine = new graph.GraphPointLine(@pointList.getPoints())

    @addChild(@boundry)
    @addChild(@pointLine)
    @addChild(@pointList)

    @setEventListeners()
    # Right now boundry doesn't need to update on every change,
    # but it will in the future when there is zooming functionality
    @boundry.render()
    return @

  setEventListeners: ->
    @boundry.addEventListener 'click', @onBoundryClick.bind(@)

  onBoundryClick: (e)->
    @pointList.addPoint(e.stageX, e.stageY)
    @pointLine.setPoints(@pointList.getPoints())
    @render()
    @dispatchEvent('graphUpdate')

  setInitialPoints: (width, height)->
    base_line = height / 2
    point_options  = {visible:false, editable:false}
    @pointList.addPoint(0, base_line, point_options)
    @pointList.addPoint(width, base_line, point_options)

  render: ->
    @pointList.render()
    @pointLine.render()
