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
      e.addEventListener 'mousemove', _self.movePoint.bind(_self)
    # point.addEventListener 'click', _self.editPoint.bind(_self)
    point.addEventListener 'dblclick', _self.removePoint.bind(_self)

  movePoint: (e)->
    e.target.x = e.stageX
    e.target.y = e.stageY
    @updatePoints()
    @dispatchEvent('pointMove', e.target)

  editPoint: (e)->
    console.log "point click"

  removePoint: (e)->
    @removeChild(e.target)
    @points = _.reject @points, (point)->
        return point.id == e.target.id
    @updatePoints()
    @dispatchEvent('pointRemove', e.target)

  sortPoints: ->
    @points = _.sortBy @points, (point)->
        return Math.min(point.x)

  adjustPointLineEnds: ->
    if @points.length > 2
      @points[0].y = @points[1].y

      last_point = @points.length - 1
      @points[last_point].y = @points[last_point - 1].y

  updatePoints: ->
    @sortPoints()
    @adjustPointLineEnds()

  render: ->
    for point in @points
      @addChild(point)

  getPoints: ->
    return @points