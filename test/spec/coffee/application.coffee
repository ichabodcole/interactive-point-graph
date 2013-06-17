define ['app/application', 'app/module'], (MyApplication, MyModule) ->

  describe 'MyApplication', ->

    beforeEach (done)->
      @app = new MyApplication(MyModule)
      done()

    it "should return an instance of MyApplication", ->
      expect(@app).to.be.instanceof MyApplication

    describe 'sayHello', ->
      it "should return 'Hello Application'", ->
        expect(@app.sayHello()).to.equal 'Hello Application'