define ['underscore', 'createjs', 'graph/keyboard'], (_, createjs, GraphKeyBoard)->

  class GraphPointList extends createjs.Container
    constructor: (GraphPointClass)->
      super
      @points = []
      @GraphPoint = GraphPointClass
      @keyboard = new GraphKeyBoard()

    addPoint: (x, y, options={})->
      point = new @GraphPoint(x, y, options)
      @setEventListeners(point)
      @points.push(point)
      @updatePoints()

    addPoints: (points)->
      for point in points
        @addPoint(point.x, point.y, point.options)
      @updatePoints()

    setEventListeners: (point)->
      _self = @
      point.addEventListener 'mousedown', (e)->
        e.addEventListener 'mousemove', _self.movePoint.bind(_self)

      point.addEventListener 'click', _self.togglePointType.bind(_self)
      point.addEventListener 'dblclick', _self.removePoint.bind(_self)
      # @dispatchEvent('shiftClickPoint')

    movePoint: (e)->
      e.target.x = e.stageX
      e.target.y = e.stageY
      @updatePoints()
      @dispatchEvent('pointMove', e.target)

    togglePointType: (e)->
      if @keyboard.keyIsDown(GraphKeyBoard.SHIFT_KEY)
        e.target.toggleType()
        @updatePoints()
        @dispatchEvent('pointTypeChange', e.target)

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
      for point in @points
        @addChild(point)

    getPoints: ->
      return @points

  return GraphPointList