(function() {
  define(['graph/boundry'], function(GraphBoundry) {
    return describe("GraphBoundry", function() {
      beforeEach(function() {
        return this.boundry = new GraphBoundry(800, 300);
      });
      it("should return an instance of GraphBoundry", function() {
        return expect(this.boundry).to.be["instanceof"](GraphBoundry);
      });
      describe("createLines", function() {
        return it("should have a method createLines", function() {
          return expect(this.boundry).to.respondTo('createLines');
        });
      });
      return describe("getValueAtPoint", function() {
        return it("should have a methad getValueAtPoint", function() {
          return expect(this.boundry).to.respondTo('getValueAtPoint');
        });
      });
    });
  });

}).call(this);
