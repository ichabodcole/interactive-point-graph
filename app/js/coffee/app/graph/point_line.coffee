define ['createjs'], (createjs)->

  class GraphPointLine extends createjs.Shape
    constructor: (graphPointList, @line_options={})->
      super
      @pointList      = graphPointList
      @line_weight    = @line_options.line_weight ? 1
      @line_color     = @line_options.line_color ? '#000'
      return @

    render: ->
      # need to clear the graphics object or previous render will
      # still be showing.
      @graphics.clear()
      # Must set up the strokeStyle and beginStroke after clearing the graphics object
      # because they are set set too.
      @graphics.setStrokeStyle(@line_weight)
      @graphics.beginStroke(@line_color)
      points = @pointList.getPoints()

      # line_offset = if line_thickness % 2 == 1 then 0.5 else 0
      for point, index in points
        if index == 0
          @graphics.moveTo(point.x, point.y)
        else
          last_point = points[index-1]
          lp_x = last_point.x
          lp_y = last_point.y
          if point.type == 'curve' && last_point.type == 'curve'
            cpx1 = lp_x + (point.x - lp_x)/2
            cpy1 = lp_y
            cpx2 = lp_x + (point.x - lp_x)/2
            cpy2 = point.y
            @graphics.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, point.x, point.y)

          else if point.type == 'curve'  && last_point.type == 'linear'
            cpx = lp_x + (point.x - lp_x)/2
            cpy = point.y
            @graphics.curveTo(cpx, cpy, point.x, point.y)

          else if point.type == 'linear' && last_point.type == 'curve'
            cpx = lp_x + (point.x - lp_x)/2
            cpy = lp_y
            @graphics.curveTo(cpx, cpy, point.x, point.y)

          else
            @graphics.lineTo(point.x, point.y)

    setLineColor: (color)->
      @line_color = color

    setLineThickness: (weight)->
      @line_weight = weight

  return GraphPointLine