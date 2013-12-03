requirejs.config({
  baseUrl: '../',

  paths: {
    jquery: 'app/js/lib/jquery',
    underscore: 'app/js/lib/underscore',
    createjs: 'http://code.createjs.com/easeljs-0.6.1.min',

    lib: 'app/js/lib',
    utils: 'app/js/utils',
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

requirejs(['chai', 'mocha', 'bridge', 'utils/bind_fill'], function(chai){
  expect = chai.expect;
  mocha.setup('bdd');

  requirejs([//'spec/graph/spec_time_point',
             //'spec/graph/spec_point_list',
             //'spec/graph/spec_point',
             'spec/graph/spec_boundry'], function(){
    mocha.run();
  });
});
