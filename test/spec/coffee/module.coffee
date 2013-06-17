define ['app/module'], (MyModule)->

  describe "MyModule", ->
    beforeEach (done)->
      @mod = new MyModule();
      done();

    it 'should return a MyModule object', ->
      expect(@mod).to.be.instanceof MyModule

    describe 'sayHello', ->
      it "should return 'Hello Module'", ->
        expect(@mod.sayHello()).to.equal "Hello Module"