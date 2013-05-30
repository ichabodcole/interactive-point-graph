window.graph = graph ? {}
class graph.GraphRenderQueue extends Array
  constructor: (elements)->
    super elements

  add: ()->
    for argument in arguments
      @push(argument)

  clear: ->
    @length = 0

  render: ->
    for obj in @
      obj.render()
