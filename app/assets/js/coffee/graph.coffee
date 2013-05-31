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
    @timePoint = new graph.GraphTimePoint(@pointList)

    @addChild(@boundry)
    @addChild(@pointLine)
    @addChild(@pointList)
    @addChild(@timePoint)

    @setEventListeners()
    # Add initial items to be rendered on instantiation
    @renderQueue.add(@boundry, @pointList, @pointLine)
    return @

  setEventListeners: ->
    @boundry.addEventListener 'click', @onBoundryClick.bind(@)
    @pointList.addEventListener 'pointMove', @onPointUpdate.bind(@)
    @pointList.addEventListener 'pointRemove', @onPointUpdate.bind(@)
    @pointList.addEventListener 'pointTypeChange', @onPointUpdate.bind(@)

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

    # For Testing
    @pointList.addPoints [
                          {x:100, y:75},
                          {x:200, y:180, options:{type:'curve'}},
                          {x:350, y:120, options:{type:'curve'}},
                          {x:400, y:200}
                         ]

  render: ->
    @renderQueue.render()
    @renderQueue.clear()

