define ->

  class GraphRenderQueue extends Array
    constructor: (elements)->
      super elements
      @autoClear = false

    add: ()->
      for argument in arguments
        @push(argument)

    clear: ->
      @length = 0

    render: ->
      for obj in @
        obj.render()

      if @autoClear then @clear()

  return GraphRenderQueue
