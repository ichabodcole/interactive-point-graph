graph = graph ? {}
class graph.GraphPoint
  constructor: (x, y, editable=false)->
    size = 6
    point = new createjs.Shape()
    point.graphics.beginFill('lightblue').drawCircle(0, 0, size)
    point.x = x
    point.y = y
    # point.editable = editable
    return point