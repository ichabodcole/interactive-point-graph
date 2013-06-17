define ['createjs'], (createjs)->

  class GraphPoint extends createjs.Shape
    constructor: (x, y, options={}, graphics)->
      super graphics
      @type     = options.type ? 'linear'
      @editable = options.editable ? true
      @visible  = options.visible ? true
      @radius   = options.radius ? 6
      @color    = options.color ? 'lightblue'
      # point = new createjs.Shape()
      @graphics.beginFill(@color).drawCircle(0, 0, @radius)
      @x = x ? 0
      @y = y ? 0
      # point.editable = editable
      return @

    setType: (type)->
      @type = type

    toggleType: ->
      if @type == 'linear'
        @type = 'curve'
      else
        @type = 'linear'

  return GraphPoint