window.graph = graph ? {}
class graph.GraphPoint extends createjs.Shape
  constructor: (x, y, options={}, graphics)->
    super graphics
    @editable = options.editable ? true
    @visible  = options.visible ? true
    @radius   = options.radius ? 6
    # point = new createjs.Shape()
    @graphics.beginFill('lightblue').drawCircle(0, 0, @radius)
    @x = x
    @y = y
    # point.editable = editable
    return @