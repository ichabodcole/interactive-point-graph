define ['underscore', 'createjs', 'graph/keyboard', 'graph/point'], (_, createjs, GraphKeyBoard, GraphPoint)->

  class GraphPointList extends createjs.Container
    constructor: (min, max)->
      super
      @min = min
      @max = max
      @points = []
      @keyboard = new GraphKeyBoard()

    addPoint: (x, y, options={})->
      point = new GraphPoint(x, y, options)
      @setEventListeners(point)
      @points.push(point)

    addPoints: (points)->
      for point in points
        @addPoint(point.x, point.y, point.options)

    setEventListeners: (point)->
      _self = @
      point.addEventListener 'mousedown', (e)->
        e.addEventListener 'mousemove', _self.movePoint.bind(_self)

      point.addEventListener 'click', _self.togglePointType.bind(_self)
      point.addEventListener 'dblclick', _self.removePoint.bind(_self)

    checkPointBounds: (point)->
      if point.y > @max.y
        point.y = @max.y
      else if point.y < @min.y
        point.y = @min.y

      if point.x > @max.x
        point.x = @max.x
      else if point.x < @min.x
        point.x = @min.y

      return point

    movePoint: (e)->
      pnt = @checkPointBounds(e.target.parent.globalToLocal(e.stageX, e.stageY))
      e.target.x = pnt.x
      e.target.y = pnt.y
      @dispatchEvent('pointMove', e.target)

    togglePointType: (e)->
      if @keyboard.keyIsDown(GraphKeyBoard.SHIFT_KEY)
        e.target.toggleType()
        @dispatchEvent('pointTypeChange', e.target)

    removePoint: (e)->
      @removeChild(e.target)
      @removePointFromList(e.target.id)
      @dispatchEvent('pointRemove', e.target)

    removePointFromList: (pointId)->
      @points = _.reject @points, (point)->
          return point.id == pointId

    sortPoints: ->
      @points = _.sortBy @points, (point)->
          return Math.min(point.x)

    adjustPointLineEnds: ->
      if @points.length > 2
        @points[0].y = @points[1].y

        last_point = @points.length - 1
        @points[last_point].y = @points[last_point - 1].y

    #TODO: This may not be the best place for this function
    getCurrentPoints: (x, points)->
      p0 = null
      p1 = null
      pIndex = null
      for point, index in points
        if point.x > x
          pIndex = index
          break;
      p0 = points[pIndex - 1]
      p1 = points[pIndex]

      return {p0: p0, p1: p1}

    updatePoints: ->
      @sortPoints()
      @adjustPointLineEnds()

    render: ->
      @updatePoints()
      for point in @points
        @addChild(point)

    getPoints: ->
      return @points

  return GraphPointList