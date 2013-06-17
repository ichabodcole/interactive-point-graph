(function() {
  define(['math/bezier', 'graph/time_point'], function(Bezier, GraphTimePoint) {
    var pointList;

    pointList = {};
    pointList.getPoints = function() {
      return [
        {
          x: 0,
          y: 25
        }, {
          x: 100,
          y: 75
        }, {
          x: 200,
          y: 180,
          options: {
            type: 'curve'
          }
        }, {
          x: 350,
          y: 120,
          options: {
            type: 'curve'
          }
        }, {
          x: 400,
          y: 200
        }
      ];
    };
    return describe("GraphTimePoint", function() {
      beforeEach(function() {
        return this.timePoint = new GraphTimePoint(pointList);
      });
      it("should return an instance of GraphTimePoint", function() {
        return expect(this.timePoint).to.be["instanceof"](GraphTimePoint);
      });
      return describe("getCurrentPoints", function() {
        return it("should return the points x is inbetween", function() {
          var curPoints, points, testPoints, xPos;

          xPos = 250;
          points = pointList.getPoints();
          testPoints = {
            p0: points[2],
            p1: points[3]
          };
          curPoints = this.timePoint.getCurrentPoints(xPos, points);
          return expect(curPoints).to.deep.equal(testPoints);
        });
      });
    });
  });

}).call(this);
