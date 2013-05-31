window.graph = graph ? {}
class graph.GraphTimePoint extends graph.GraphPoint
  constructor: (graphPointList)->
    options = {color: 'red', radius: 3}
    @pointList  = graphPointList

    first_point = @pointList.getPoints()[0]
    super first_point.x, first_point.y, options
    # @aniLoop()


  render: ->


  aniLoop: ->
    window.requestAnimationFrame(@aniLoop.bind(@))
    @render()
