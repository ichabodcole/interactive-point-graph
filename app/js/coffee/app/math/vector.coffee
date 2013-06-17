define ->
  class Vector
    constructor: (p0, p1)->
      @p0 = p0
      @p1 = p1

    median: (p0, p1)->
      p = (p0 - p1) / 2 + p0
      return p

  return Vector