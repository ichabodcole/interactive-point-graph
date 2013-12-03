define ['createjs'], (createjs)->

  class GraphLabel extends createjs.Container
    constructor: (text, options={})->
      super
      defaults = {
        fontColor: '#ccc',
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontSize: 12,
      }

      @config = _.defaults(options, defaults)

      font =  @config.fontSize + "px " + @config.fontFamily
      color = @config.fontColor
      @label = new createjs.Text(text, font, color)
      return @

    textHeight: ->
      return @label.getMeasuredHeight()

    textWidth: ->
      return @label.getMeasuredWidth()

    render: ->
      @addChild(@label)

  return GraphLabel
