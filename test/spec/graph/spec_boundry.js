(function() {
  define(['graph/boundry'], function(GraphBoundry) {
    return describe("GraphBoundry", function() {
      beforeEach(function() {
        var boundryOptions;

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
        };
        return this.boundry = new GraphBoundry();
      });
      it("should return an instance of GraphBoundry", function() {
        return expect(this.boundry).to.be["instanceof"](GraphBoundry);
      });
      it("should have a method getValueAtPoint", function() {
        return expect(this.boundry).to.respondTo("getValueAtPoint");
      });
      it("should have a method render", function() {
        return expect(this.boundry).to.respondTo("render");
      });
      describe("render", function() {
        return it("should not throw an error", function() {
          var test,
            _this = this;

          test = function() {
            return _this.boundry.render();
          };
          return expect(test).to.not["throw"]();
        });
      });
      describe("createHorzLines", function() {
        return it("should not throw an error", function() {
          var test,
            _this = this;

          test = function() {
            return _this.boundry.createHorzLines();
          };
          return expect(test).to.not["throw"]();
        });
      });
      return describe("createVertLines", function() {
        return it("should not throw an error", function() {
          var test,
            _this = this;

          test = function() {
            return _this.boundry.createVertGrid();
          };
          return expect(test).to.not["throw"]();
        });
      });
    });
  });

}).call(this);
