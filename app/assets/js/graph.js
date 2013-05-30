(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.graph = typeof graph !== "undefined" && graph !== null ? graph : {};

  graph.Graph = (function(_super) {
    __extends(Graph, _super);

    function Graph(width, height) {
      var boundry_options;

      Graph.__super__.constructor.apply(this, arguments);
      boundry_options = {
        line_color: "#ddd"
      };
      this.boundry = new graph.GraphBoundry(width, height, boundry_options);
      this.pointList = new graph.GraphPointList(graph.GraphPoint);
      this.setInitialPoints(width, height);
      this.pointLine = new graph.GraphPointLine(this.pointList.getPoints());
      this.addChild(this.boundry);
      this.addChild(this.pointLine);
      this.addChild(this.pointList);
      this.setEventListeners();
      this.boundry.render();
      return this;
    }

    Graph.prototype.setEventListeners = function() {
      return this.boundry.addEventListener('click', this.onBoundryClick.bind(this));
    };

    Graph.prototype.onBoundryClick = function(e) {
      this.pointList.addPoint(e.stageX, e.stageY);
      this.pointLine.setPoints(this.pointList.getPoints());
      this.render();
      return this.dispatchEvent('graphUpdate');
    };

    Graph.prototype.setInitialPoints = function(width, height) {
      var base_line, point_options;

      base_line = height / 2;
      point_options = {
        visible: false,
        editable: false
      };
      this.pointList.addPoint(0, base_line, point_options);
      return this.pointList.addPoint(width, base_line, point_options);
    };

    Graph.prototype.render = function() {
      this.pointList.render();
      return this.pointLine.render();
    };

    return Graph;

  })(createjs.Container);

}).call(this);
