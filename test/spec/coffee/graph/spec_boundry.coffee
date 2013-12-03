define ['graph/boundry'], (GraphBoundry)->

  describe "GraphBoundry", ->
    beforeEach ->
      boundryOptions = {
                          width: 500,
                          height: 300,
                          duration: 20,
                          durationIncrement: 0.1,
                          elevation: 135,
                          elevationStart: 0,
                          elevationIncrement: 0.1,
                          borderLineWidth: 1,
                          borderColor: '#ccc',
                          borderBornerRadius: 0,
                          gridLineWidth: 1,
                          gridColor: '#ccc',
                          fontColor: '#ccc',
                          fontFamily: 'Arial',
                          fontSize: 12
                        }

      @boundry = new GraphBoundry()

    it "should return an instance of GraphBoundry", ->
      expect(@boundry).to.be.instanceof GraphBoundry

    it "should have a method getValueAtPoint", ->
      expect(@boundry).to.respondTo "getValueAtPoint"

    it "should have a method render", ->
      expect(@boundry).to.respondTo "render"

    describe "render", ->
      it "should not throw an error", ->
        test = =>
          @boundry.render()
        expect(test).to.not.throw()

    describe "createHorzLines", ->
      it "should not throw an error", ->
        test = =>
          @boundry.createHorzLines()
        expect(test).to.not.throw()

    describe "createVertLines", ->
      it "should not throw an error", ->
        test = =>
          @boundry.createVertGrid()
        expect(test).to.not.throw()

    # describe "getIntervalSteps", ->
    #   it "should return a number", ->
    #     @boundry.getIntervalSteps()

    # describe "createLines", ->
    #   it "should have a method createLines", ->
    #     expect(@boundry).to.respondTo 'createLines'

    # describe "getValueAtPoint", ->
    #   it "should have a methad getValueAtPoint", ->
    #     expect(@boundry).to.respondTo 'getValueAtPoint'

