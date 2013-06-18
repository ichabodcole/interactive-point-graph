define ['graph/boundry'], (GraphBoundry)->

  describe "GraphBoundry", ->
    beforeEach ->
      @boundry = new GraphBoundry(800, 300)

    it "should return an instance of GraphBoundry", ->
      expect(@boundry).to.be.instanceof GraphBoundry

    describe "createLines", ->
      it "should have a method createLines", ->
        expect(@boundry).to.respondTo 'createLines'

    describe "getValueAtPoint", ->
      it "should have a methad getValueAtPoint", ->
        expect(@boundry).to.respondTo 'getValueAtPoint'

