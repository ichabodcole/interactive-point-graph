define ['jquery'], ($)->

  class GraphKeyBoard
    @SHIFT_KEY = 16
    constructor: ->
      @active_key = null
      @setEventListeners()
      return @

    setEventListeners: ->
      $(document).keydown (e)=>
        @active_key = e.which

      $(document).keyup (e)=>
        @active_key = null

    keyIsDown: (keyCode)->
      if keyCode == @active_key
        return true

  return GraphKeyBoard


