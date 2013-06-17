(function() {
  define(['app/application', 'app/module'], function(MyApplication, MyModule) {
    return describe('MyApplication', function() {
      beforeEach(function(done) {
        this.app = new MyApplication(MyModule);
        return done();
      });
      it("should return an instance of MyApplication", function() {
        return expect(this.app).to.be["instanceof"](MyApplication);
      });
      return describe('sayHello', function() {
        return it("should return 'Hello Application'", function() {
          return expect(this.app.sayHello()).to.equal('Hello Application');
        });
      });
    });
  });

}).call(this);
