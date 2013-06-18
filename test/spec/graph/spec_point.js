(function() {
  define(['graph/point'], function(GraphPoint) {
    return describe("GraphPoint", function() {
      beforeEach(function() {
        return this.gPoint = new GraphPoint(50, 50);
      });
      it("should return an instance of GraphPoint", function() {
        return expect(this.gPoint).to.be["instanceof"](GraphPoint);
      });
      it("should have a default type of 'linear'", function() {
        return expect(this.gPoint.type).to.equal('linear');
      });
      describe("toggleType", function() {
        return it("should toggle between linear and curve", function() {
          this.gPoint.toggleType();
          expect(this.gPoint.type).to.equal('curve');
          this.gPoint.toggleType();
          return expect(this.gPoint.type).to.equal('linear');
        });
      });
      return describe('setType', function() {
        return it("should set the type", function() {
          this.gPoint.setType('curve');
          return expect(this.gPoint.type).to.equal('curve');
        });
      });
    });
  });

}).call(this);
