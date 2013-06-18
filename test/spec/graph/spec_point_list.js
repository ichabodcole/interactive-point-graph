(function() {
  define(['graph/point_list', 'graph/point'], function(GraphPointList, GraphPoint) {
    return describe("GraphPointList", function() {
      beforeEach(function() {
        return this.pointList = new GraphPointList(GraphPoint);
      });
      it("should return an instance of GraphPointList", function() {
        return expect(this.pointList).to.be["instanceof"](GraphPointList);
      });
      describe("addPoint", function() {
        it("should have a method addPoint", function() {
          return expect(this.pointList).to.respondTo('addPoint');
        });
        return it("should add a single Point to the list", function() {
          var numPoints;

          this.pointList.addPoint(50, 50);
          numPoints = this.pointList.getPoints().length;
          return expect(numPoints).to.equal(1);
        });
      });
      describe("addPoints", function() {
        it("should have a method addPoints", function() {
          return expect(this.pointList).to.respondTo('addPoints');
        });
        return it("add multiple points to the list", function() {
          var numPoints, p0, p1, points;

          p0 = {
            x: 50,
            y: 25
          };
          p1 = {
            x: 150,
            y: 105
          };
          points = [p0, p1];
          this.pointList.addPoints(points);
          numPoints = this.pointList.getPoints().length;
          return expect(numPoints).to.equal(2);
        });
      });
      describe("removePoint", function() {
        it("should have a method removePoint", function() {
          return expect(this.pointList).to.respondTo('removePoint');
        });
        return it("should remove a point from the list", function() {
          var evt;

          this.pointList.addPoint(50, 50);
          evt = {};
          evt.target = this.pointList.getPoints()[0];
          this.pointList.removePoint(evt);
          return expect(this.pointList.getPoints()).to.be.empty;
        });
      });
      describe("getPoints", function() {
        it("should have a method getPoints", function() {
          return expect(this.pointList).to.respondTo('getPoints');
        });
        it("should return an array of points", function() {
          return expect(this.pointList.getPoints()).to.be["instanceof"](Array);
        });
        it("should return an empty Array before adding a point", function() {
          return expect(this.pointList.getPoints()).to.be.empty;
        });
        return it("should not return an empty Array after adding a point", function() {
          this.pointList.addPoint(50, 50);
          return expect(this.pointList.getPoints()).to.not.be.empty;
        });
      });
      return describe("adjustPointLineEnds", function() {
        it("should have a method adjustPointLineEnds", function() {
          return expect(this.pointList).to.respondTo('adjustPointLineEnds');
        });
        it("should set the first points y value to the next points y value", function() {
          var p;

          this.pointList.addPoint(100, 50);
          this.pointList.addPoint(200, 120);
          p = _.first(this.pointList.getPoints());
          return expect(p.y).to.equal(50);
        });
        return it("should set the last points y value to the previous points y value", function() {
          var p;

          this.pointList.addPoint(100, 50);
          this.pointList.addPoint(200, 120);
          p = _.last(this.pointList.getPoints());
          return expect(p.y).to.equal(120);
        });
      });
    });
  });

}).call(this);
