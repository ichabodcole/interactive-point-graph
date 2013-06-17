define ['math/bezier', 'graph/time_point'], (Bezier, GraphTimePoint)->

  pointList = {}
  pointList.getPoints = ->
    return [
            {x:0, y:25},
            {x:100, y:75},
            {x:200, y:180, options:{type:'curve'}},
            {x:350, y:120, options:{type:'curve'}},
            {x:400, y:200}
           ]

  describe "GraphTimePoint", ->
    beforeEach ->
      @timePoint = new GraphTimePoint(pointList)

    it "should return an instance of GraphTimePoint", ->
      expect(@timePoint).to.be.instanceof GraphTimePoint

    describe "getCurrentPoints", ->
      it "should return the points x is inbetween", ->
        xPos = 250
        points = pointList.getPoints()
        testPoints = {p0: points[2], p1: points[3]}
        curPoints = @timePoint.getCurrentPoints(xPos, points)

        expect(curPoints).to.deep.equal testPoints


