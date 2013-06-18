define ['graph/point_list', 'graph/point'], (GraphPointList, GraphPoint)->

  describe "GraphPointList", ->
    beforeEach ->
      @pointList = new GraphPointList(GraphPoint)

    it "should return an instance of GraphPointList", ->
      expect(@pointList).to.be.instanceof GraphPointList

    describe "addPoint", ->
      it "should have a method addPoint", ->
        expect(@pointList).to.respondTo 'addPoint'

      it "should add a single Point to the list", ->
        @pointList.addPoint(50, 50)
        numPoints = @pointList.getPoints().length
        expect(numPoints).to.equal 1

    describe "addPoints", ->
      it "should have a method addPoints", ->
        expect(@pointList).to.respondTo 'addPoints'

      it "add multiple points to the list", ->
        p0 = {x:50, y:25}
        p1 = {x:150, y:105}
        points = [p0, p1]
        @pointList.addPoints(points)
        numPoints = @pointList.getPoints().length
        expect(numPoints).to.equal 2

    describe "removePoint", ->
      it "should have a method removePoint", ->
        expect(@pointList).to.respondTo 'removePoint'

      it "should remove a point from the list", ->
        @pointList.addPoint(50, 50)
        evt = {}
        evt.target = @pointList.getPoints()[0]

        @pointList.removePoint(evt)
        expect(@pointList.getPoints()).to.be.empty

    describe "getPoints", ->
      it "should have a method getPoints", ->
        expect(@pointList).to.respondTo 'getPoints'

      it "should return an array of points", ->
        expect(@pointList.getPoints()).to.be.instanceof Array

      it "should return an empty Array before adding a point", ->
        expect(@pointList.getPoints()).to.be.empty

      it "should not return an empty Array after adding a point", ->
        @pointList.addPoint(50, 50)
        expect(@pointList.getPoints()).to.not.be.empty

    describe "adjustPointLineEnds", ->
      it "should have a method adjustPointLineEnds", ->
        expect(@pointList).to.respondTo 'adjustPointLineEnds'

      it "should set the first points y value to the next points y value", ->
        @pointList.addPoint(100, 50)
        @pointList.addPoint(200, 120)
        p = _.first(@pointList.getPoints())
        expect(p.y).to.equal 50

      it "should set the last points y value to the previous points y value", ->
        @pointList.addPoint(100, 50)
        @pointList.addPoint(200, 120)
        p = _.last(@pointList.getPoints())
        expect(p.y).to.equal 120

