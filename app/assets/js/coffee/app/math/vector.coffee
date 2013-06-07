window.math = math ? {}

class math.Point
  constructor: (x, y)->
    @x = x
    @y = y
    return @

class math.Vector
  constructor: ()->