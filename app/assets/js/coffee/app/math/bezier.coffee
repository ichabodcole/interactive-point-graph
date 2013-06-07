window.math = math ? {}

class math.bezier
  # 1 = (1 - t) + t

  @linearPoint: (t, p0, p1)->
    a = (1 - t)
    b = t

    x = p0.x * a + p1.x * b
    y = p0.y * a + p1.y * b

    return { x: x, y: y }

  @quadraticPoint: (t, p0, p1, p2)->
    a = Math.pow(t, 2)
    b = 2 * t * (1 - t)
    c = Math.pow(1 - t, 2)

    x = p0.x * a + p1.x * b + p2.x * c
    y = p0.y * a + p1.y * b + p2.y * c

    return { x: x, y: y }

  @cubicPoint: (t, p0, p1, p2, p3)->
    a = Math.pow(t, 3)
    b = 3 * Math.pow(t, 2) * (1 - t)
    c = 3 * t * Math.pow(1 - t, 2)
    d = Math.pow(1 - t, 3)

    x = p0.x * a + p1.x * b + p2.x * c + p3.x * d
    y = p0.y * a + p1.y * b + p2.y * c + p3.y * d

    return { x: x, y: y }

  @cpFlat: (p0, p1)->
    x = @median(p0.x, p1.x)
    y = p0.y

    return { x: x, y: y }

  @cpAngle: (p0, p1, p2)->
    mp0x = @median(p0.x, p1.x)
    mp0y = @median(p0.y, p1.y)

    mp1x = @median(p1.x, p2.x)
    mp1y = @median(p1.y, p2.y)

    # return { x: x, y: y }

  @median: (n0, n1)->
    v = (n0 - n1) / 2 + n0
    return v

  constructor: ->
