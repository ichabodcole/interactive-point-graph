  requirejs.config({
    baseUrl: '../',

    paths: {
      jquery: 'app/js/lib/jquery',
      underscore: 'app/js/lib/underscore',
      createjs: 'http://code.createjs.com/easeljs-0.6.1.min',

      lib: 'app/js/lib',
      app: 'app/js/app',
      math: 'app/js/app/math',
      graph: 'app/js/app/graph',
      spec: 'test/spec',

      chai: 'node_modules/chai/chai',
      mocha: 'node_modules/mocha/mocha',
      bridge: 'node_modules/grunt-mocha/phantomjs/bridge'
    },

    shim: {
      'underscore': {
        exports: '_'
      },
      'createjs': {
        exports: 'createjs'
      }
    }
  });

  requirejs(['chai', 'mocha', 'bridge'], function(chai){
    expect = chai.expect;
    mocha.setup('bdd');

    requirejs(['spec/spec_time_point'], function(){
      mocha.run();
    });
  });
