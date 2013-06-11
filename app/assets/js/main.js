(function() {
  requirejs.config({
    baseUrl: 'assets/js',
    paths: {
      lib: 'lib',
      app: 'app',
      graph: 'app/graph',
      jquery: 'lib/jquery',
      underscore: 'lib/underscore',
      createjs: 'http://code.createjs.com/easeljs-0.6.1.min'
    },
    shim: {
      'jquery': {
        exports: '$'
      },
      'underscore': {
        exports: '_'
      },
      'createjs': {
        exports: 'createjs'
      }
    }
  });

  requirejs(['app/application']);

}).call(this);
