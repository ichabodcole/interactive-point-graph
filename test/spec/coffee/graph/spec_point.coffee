define ['graph/point'], (GraphPoint)->

  describe "GraphPoint", ->

    beforeEach ->
      @gPoint = new GraphPoint(50, 50)

    it "should return an instance of GraphPoint", ->
      expect(@gPoint).to.be.instanceof GraphPoint

    it "should have a default type of 'linear'", ->
      expect(@gPoint.type).to.equal 'linear'

    describe "toggleType", ->
      it "should toggle between linear and curve", ->
        @gPoint.toggleType()
        expect(@gPoint.type).to.equal 'curve'

        @gPoint.toggleType()
        expect(@gPoint.type).to.equal 'linear'

    describe 'setType', ->
      it "should set the type", ->
        @gPoint.setType('curve')
        expect(@gPoint.type).to.equal 'curve'
