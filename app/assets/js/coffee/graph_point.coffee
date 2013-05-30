window.graph = graph ? {}
class graph.GraphPoint
  constructor: (x, y, options={})->
    size = 6
    point = new createjs.Shape()
    point.graphics.beginFill('lightblue').drawCircle(0, 0, size)
    point.x = x
    point.y = y
    point.editable = options.editable ? true
    point.visible  = options.visible ? true
    # point.editable = editable
    return point