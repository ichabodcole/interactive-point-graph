requirejs.config({
  baseUrl: 'assets/js',
  paths: {
    lib: 'lib'
    app: 'app'
    graph: 'app/graph'
    jquery: 'http://code.createjs.com/easeljs-0.6.1.min'
  }

  shim:{
    'jquery':{
      exports: '$'
    },
    'underscore': {
      exports: '_'
    }
  }

})

requirejs([
  'lib/jquery',
  'lib/underscore',
  'http://code.createjs.com/easeljs-0.6.1.min.js',
  'graph/keyboard',
  'graph/point',
  'graph/point_list',
  'graph/point_line',
  'graph/time_point',
  'graph/render_queue',
  'graph/boundry',
  'graph/graph',
  'app/application'
  ])