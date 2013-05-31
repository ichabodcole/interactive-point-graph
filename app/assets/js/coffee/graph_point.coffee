window.graph = graph ? {}
class graph.GraphPoint extends createjs.Shape
  constructor: (x, y, options={}, graphics)->
    super graphics
    @type     = options.type ? 'linear'
    @editable = options.editable ? true
    @visible  = options.visible ? true
    @radius   = options.radius ? 6
    # point = new createjs.Shape()
    @graphics.beginFill('lightblue').drawCircle(0, 0, @radius)
    @x = x
    @y = y
    # point.editable = editable
    return @

  setType: (type)->
    @type = type

  toggleType: ->
    if @type == 'linear'
      @type = 'curve'
    else
      @type = 'linear'