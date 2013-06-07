window.graph = graph ? {}
class graph.GraphTimePoint extends graph.GraphPoint
  constructor: (graphPointList)->
    options = {color: 'red', radius: 3}
    @pointList  = graphPointList
    @fps = 1000 / 30
    @start_time = new Date()
    @total_time = 5000
    @distance = 780
    @time_scale = @distance / @total_time

    first_point = @pointList.getPoints()[0]
    super first_point.x, first_point.y, options
    # @aniLoop()

  findPointAlongPath: ->


  move: ->
    now  = new Date()
    time = (now - @start_time)
    @x = @time_scale * time


  render: ->
    @move()

  aniLoop: ->
    _self = @
    setTimeout ->
        window.requestAnimationFrame(_self.aniLoop.bind(_self))
      , @fps
    @dispatchEvent('update')
