(function() {
  define(['app/module'], function(MyModule) {
    return describe("MyModule", function() {
      beforeEach(function(done) {
        this.mod = new MyModule();
        return done();
      });
      it('should return a MyModule object', function() {
        return expect(this.mod).to.be["instanceof"](MyModule);
      });
      return describe('sayHello', function() {
        return it("should return 'Hello Module'", function() {
          return expect(this.mod.sayHello()).to.equal("Hello Module");
        });
      });
    });
  });

}).call(this);
