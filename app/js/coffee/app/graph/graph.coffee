define ['createjs',
        'graph/render_queue',
        'graph/grid',
        'graph/point_list',
        'graph/point_line',
        'graph/time_point'
        ], (createjs, RenderQueue, Grid, PointList, PointLine, TimePoint)->

  class Graph extends createjs.Container
    constructor: (options={})->
      super
      defaults = {
        width: 600,
        height: 300,
        scaleXStart: @_minutesToSeconds(0),
        scaleXEnd: @_minutesToSeconds(60),
        # scaleXInterval: @_minutesToSeconds(5),
        scaleXStepCount: 10,
        scaleXZoom: 1,
        scaleYStart: 0,
        scaleYEnd: 16,
        # scaleYInterval: 3,
        scaleYStepCount: 8,
        scaleYZoom: 1
        borderLineWidth: 1,
        borderColor: '#ccc',
        borderCornerRadius: 0,
        gridLineWidth: 1,
        gridColor: '#ccc',
        gridPaddingLeft: 45,
        gridPaddingBottom: 20
        fontColor: '#ccc',
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontSize: 12
      }

      @config = _.defaults(options, defaults)

      @grid           = new Grid(@config)
      @pointContainer = @_setupPointContainer(@grid)

      @pointList      = @_setupPointList()
      @pointLine      = new PointLine(@pointList)
      @timePoint      = new TimePoint(@pointList)

      @addChild(@grid)
      @addChild(@pointContainer)
      @pointContainer.addChild(@pointLine)
      @pointContainer.addChild(@pointList)
      @pointContainer.addChild(@timePoint)

      @_setEventListeners()
      # Create renderQueue and add initial items to be rendered on instantiation
      @renderQueue = new RenderQueue()
      @renderQueue.add(@grid, @pointList, @pointLine)
      return @

    _minutesToSeconds: (minutes)->
      seconds = minutes * 60

    _labelYFormat: (seconds)->

    _setupPointContainer: (grid)->
      pointContainer = new createjs.Container()
      gridPoint = grid.getGridRegPoint()
      pointContainer.x = gridPoint.x
      pointContainer.y = gridPoint.y
      return pointContainer

    _setupPointList: ->
      min = {x: 0, y: 0}
      max = {x: @config.width , y: @config.height}
      pointList = new PointList(min, max)
      @_setInitialPoints(pointList, @config.width, @config.height)
      return pointList

    _setEventListeners: ->
      @grid.addEventListener 'click', @onGridClick.bind(@)
      @pointList.addEventListener 'pointMove', @onPointUpdate.bind(@)
      @pointList.addEventListener 'pointRemove', @onPointUpdate.bind(@)
      @pointList.addEventListener 'pointTypeChange', @onPointUpdate.bind(@)
      @timePoint.addEventListener 'update', @onTimePointUpdate.bind(@)

    onTimePointUpdate: (e)->
      @renderQueue.add(@timePoint)
      @dispatchEvent('graphUpdate')

    onPointUpdate: (e)->
      @renderQueue.add(@pointList, @pointLine)
      @dispatchEvent('graphUpdate')

    onGridClick: (e)->
      pnt = e.target.grid.globalToLocal(e.stageX, e.stageY)
      @pointList.addPoint(pnt.x, pnt.y)
      @renderQueue.add(@pointList, @pointLine)
      @dispatchEvent('graphUpdate')

    _setInitialPoints: (pointList, width, height)->
      base_line = height / 2
      point_options  = {visible:false, editable:false}
      pointList.addPoint(0, base_line, point_options)
      pointList.addPoint(width, base_line, point_options)

      # For Testing
      pointList.addPoints [
                            {x:100, y:75},
                            {x:200, y:180, options:{type:'curve'}},
                            {x:350, y:120, options:{type:'curve'}},
                            {x:400, y:200}
                           ]

    render: ->
      @renderQueue.render()
      @renderQueue.clear()

  return Graph

