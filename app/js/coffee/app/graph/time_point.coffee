define ['graph/point', 'math/bezier'], (GraphPoint, Bezier)->

  class GraphTimePoint extends GraphPoint
    constructor: (graphPointList)->
      options = {color: 'red', radius: 3}
      @pointList  = graphPointList
      @fps = 1000 / 30
      @start_time = null
      @total_time = 5000
      @distance = 800
      @time_scale = @distance / @total_time

      first_point = @pointList.getPoints()[0]
      super first_point.x, first_point.y, options
      # @aniLoop()
      # @dispatchEvent('update')
      # for i in [0..2]
      #   @render()
      return @

    #FIXME: getting undefined return after first point look up.
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

    # Returns a number between 0 and 1
    findT: (p0, p1)->
      @setStartTime()
      now  = new Date()
      time = (now - @start_time)

      xDiff = (p1.x - p0.x)
      tIncrement = 1 / xDiff
      graphTimeX = @time_scale * time
      relativeTimeX = (graphTimeX - p0.x)

      t = relativeTimeX * tIncrement

    findPointAlongPath: ()->
      cPnts = @getCurrentPoints(@x, @pointList.getPoints())
      p0 = cPnts.p0
      p1 = cPnts.p1
      t = @findT(p0, p1)

      cp0 = Bezier.cpFlat(p0, p1)
      cp1 = Bezier.cpFlat(p1, p0)

      p = Bezier.cubicPoint(t, p0, cp0, cp1, p1)

    clearStartTime: ->
      @start_time = null

    setStartTime: ->
      if @start_time == null then start_time = new Date()

    move: ->
      p = @findPointAlongPath()
      @x = p.x
      @y = p.y

    render: ->
      @move()

    aniLoop: ->
      _self = @
      setTimeout ->
          window.requestAnimationFrame(_self.aniLoop.bind(_self))
        , @fps
      @dispatchEvent('update')

  return GraphTimePoint