(function() {
  requirejs.config({
    baseUrl: 'assets/js',
    paths: {
      lib: 'lib',
      app: 'app',
      graph: 'app/graph',
      jquery: 'http://code.createjs.com/easeljs-0.6.1.min'
    }
  });

  requirejs(['lib/jquery', 'lib/underscore', 'jquery', 'app/application']);

}).call(this);
