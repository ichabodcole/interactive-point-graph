define ['createjs', 'graph/label'], (createjs, GraphLabel)->

  class GraphGrid extends createjs.Container
    constructor: (options={})->
      super
      defaults = {
                  width: 600,
                  height: 300,
                  borderLineWidth: 1,
                  borderColor: '#ccc',
                  borderCornerRadius: 0,
                  gridLineWidth: 1,
                  gridColor: '#ccc',
                  gridPaddingLeft: 45,
                  gridPaddingBottom: 20
                }

      # set merge defaults with options
      @config = _.defaults(options, defaults)

      hitArea = new createjs.Shape()
      hitArea.graphics.beginFill('red').drawRect(0, 0, @config.width, @config.height)
      @hitArea = hitArea

      @grid = new createjs.Shape()
      @addChild(@grid)
      @grid.x = @config.gridPaddingLeft
      return @

    createBorder: ->
      @grid.graphics.setStrokeStyle(@config.borderLineWidth)
      @grid.graphics.beginStroke(@config.borderColor).drawRect(0, 0, @config.width, @config.height)

    formatTime: (totalSeconds)->
        time = totalSeconds / 60
        mins = Math.floor(time)
        seconds = Math.round((time % 1) * 60)
        if seconds == 0
          seconds = "00"
        else if seconds < 10
          seconds = "0" + seconds
        text = mins + ":" + seconds

    addLabelX: (step, x, y)->
      timeStep = (step * @config.scaleXInterval) + @config.scaleXStart
      text = @formatTime(timeStep)
      label = new GraphLabel(text)
      label.render()
      label.x = (x - label.textWidth() / 2) + @config.gridPaddingLeft
      label.y = y + @config.gridPaddingBottom
      @addChild(label)

    addLabelY: (step, x, y)->
      stepNum = step * @config.scaleYInterval + @config.scaleYStart
      text = (Math.round(stepNum * 100) / 100)  + "hz"
      label = new GraphLabel(text)
      label.render()
      label.x = 0
      label.y = y - label.textHeight() / 2
      @addChild(label)

    createGridX: ->
      scaleStart = @config.scaleXStart
      scaleEnd =  @config.scaleXEnd
      # scaleInterval = @config.scaleXInterval
      # steps = @getIntervalSteps(scaleStart, scaleEnd, scaleInterval)
      steps = @config.scaleXStepCount
      @config.scaleXInterval = @getStepsInterval(scaleStart, scaleEnd, steps)
      stepIncrement = @getStepIncrement(@config.width, steps)

      @grid.graphics.setStrokeStyle(@config.gridLineWidth)
      @grid.graphics.beginStroke(@config.gridColor)

      for step in [0..steps]
        x = stepIncrement * step
        y = @config.height

        if step > 0 && step < steps
          @grid.graphics.moveTo(x, 0)
          @grid.graphics.lineTo(x, y)

        @addLabelX(step, x, y)

    createGridY: ->
      scaleStart = @config.scaleYStart
      scaleEnd = @config.scaleYEnd
      # scaleInterval = @config.scaleYInterval
      # steps = @getIntervalSteps(scaleStart, scaleEnd, scaleInterval)
      steps = @config.scaleYStepCount
      @config.scaleYInterval = @getStepsInterval(scaleStart, scaleEnd, steps)
      stepIncrement = @getStepIncrement(@config.height, steps)

      @grid.graphics.setStrokeStyle(@config.gridLineWidth)
      @grid.graphics.beginStroke(@config.gridColor)

      start = @config.elavationStart
      for step in [steps..0]
        x = @config.width
        y = stepIncrement * step

        if step > 0 && step < steps
          @grid.graphics.moveTo(0, y)
          @grid.graphics.lineTo(x, y)

        @addLabelY(steps - step, x, y)

    getStepsInterval: (scaleStart, scaleEnd, steps)->
      interval = (scaleEnd - scaleStart) / steps

    getIntervalSteps: (scaleStart, scaleEnd, interval)->
      steps = (scaleEnd - scaleStart) / interval

    getStepIncrement: (size, steps)->
      stepIncrement = size / steps

    getValueAtPoint: (p)->

    getValueAtTime: (t)->

    getGridRegPoint: ()->
      x = @grid.x
      y = @grid.y
      return { x: x, y: y }

    createGrid: ->
      @createGridX()
      @createGridY()

    render: ->
      @createGrid()
      @createBorder()

  return GraphGrid

