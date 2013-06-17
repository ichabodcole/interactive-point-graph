requirejs.config({
  baseUrl: 'js',
  paths: {
    lib: 'lib',
    app: 'app',
    math: 'app/math'
    graph: 'app/graph',
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    createjs: 'http://code.createjs.com/easeljs-0.6.1.min'
  }

  shim:{
    'jquery':{
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'createjs': {
      exports: 'createjs'
    }
  }

})

requirejs ['app/application']