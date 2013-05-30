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
    _self = @
    point.addEventListener 'mousedown', (e)->
      e.addEventListener 'mousemove', _self.onPointMove.bind(_self)

    point.addEventListener 'click', (e)->
      e.dispatchEvent('pointEdit')

    point.addEventListener 'dbclick', (e)->
      e.dispatchEvent('pointRemove')

  onPointMove: (e)->
    @sortPoints()
    @adjustPointLineEnds()
    @dispatchEvent('pointMove', e.target)

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