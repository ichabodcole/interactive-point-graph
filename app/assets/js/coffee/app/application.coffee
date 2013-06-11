define ['lib/domReady', 'createjs', 'graph/graph'], (domReady, createjs, Graph)->
  class AeatherBeats
    constructor: ->
      @stage           = new createjs.Stage('pointGraph')
      @stage_width     = @stage.canvas.width
      @stage_height    = @stage.canvas.height
      @stage.autoClear = true
      @graphView = new Graph(@stage_width, @stage_height)
      @graphView.addEventListener('graphUpdate', @)

    handleEvent: (e)->
      # console.log e.type
      if e.type == 'graphUpdate'
        @onGraphUpdate()

    onGraphUpdate: ->
      @render()

    render: ->
      # console.log "render"
      @stage.removeAllChildren()
      @stage.clear()
      @stage.addChild(@graphView)
      @graphView.render()
      @stage.update()

  domReady ->
    AB = new AeatherBeats()
    AB.render()

# Click canvas to add a point.
  # line should connect to new point.
  # new points should not be able to have an
  # x value less than previous point