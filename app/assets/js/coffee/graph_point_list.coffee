window.graph = graph ? {}
class graph.GraphPointList extends createjs.Container
  constructor: (graphPointClass)->
    super
    @points = []
    @GraphPoint = graphPointClass

  addPoint: (x, y, point_options={})->
    point = new @GraphPoint(x, y, point_options)
    @setEventListeners(point)
    @points.push(point)
    @sortPoints()
    @adjustPointLineEnds()

  setEventListeners: (point)->
    point.addEventListener 'mousedown', (e)->
      e.addEventListener 'mousemove', (e)->
        e.target.x = e.stageX
        e.target.y = e.stageY

    point.addEventListener 'click', (e)->
      # console.log e

    point.addEventListener 'dbclick', (e)->
      # console.log e

  removePoint: (pid)->
    @points = _.reject @points, (point)->
        return point.id == pid

  sortPoints: ->
    @points = _.sortBy @points, (point)->
        return Math.min(point.x)

  adjustPointLineEnds: ->
    if @points.length > 2
      @points[0].y = @points[1].y

      last_point = @points.length - 1
      @points[last_point].y = @points[last_point - 1].y

  render: ->
    for point in @points
      @addChild(point)

  getPoints: ->
    return @points