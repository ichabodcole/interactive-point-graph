define ['lib/domReady', 'createjs', 'graph/graph', 'graph/boundry'], (domReady, createjs, Graph, GraphBoundry)->
  class AeatherBeats
    constructor: ->
      @stage           = new createjs.Stage('pointGraph')
      @stage_width     = @stage.canvas.width
      @stage_height    = @stage.canvas.height
      @stage.autoClear = true

      graphOptions = {
        width: 700,
        height: 230,
        scaleXStart: 0,
        scaleXEnd: (60 * 60),
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

      @graphView = new Graph(graphOptions)
      @graphView.x = 20
      @graphView.y = 20
      @graphView.addEventListener('graphUpdate', @)
      @stage.addChild(@graphView)

    handleEvent: (e)->
      # console.log e.type
      if e.type == 'graphUpdate'
        @onGraphUpdate()

    onGraphUpdate: ->
      @render()

    render: ->
      # console.log "render"
      @graphView.render()
      @stage.update()

  domReady ->
    AB = new AeatherBeats()
    AB.render()

# Click canvas to add a point.
  # line should connect to new point.
  # new points should not be able to have an
  # x value less than previous point