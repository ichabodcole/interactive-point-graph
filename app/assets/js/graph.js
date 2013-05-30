(function() {
  window.graph = typeof graph !== "undefined" && graph !== null ? graph : {};

  graph.Graph = (function() {
    function Graph(context, width, height) {
      var boundry_options;

      this.context = context;
      createjs.EventDispatcher.initialize(this);
      this.container = new createjs.Container();
      boundry_options = {
        line_color: "#ddd"
      };
      this.boundry = new graph.GraphBoundry(width, height, boundry_options);
      this.pointList = new graph.GraphPointList(graph.GraphPoint);
      this.setInitialPoints(width, height);
      this.pointLine = new graph.GraphPointLine(this.pointList.getPoints());
      this.container.addChild(this.boundry.getContainer());
      this.container.addChild(this.pointLine.getContainer());
      this.container.addChild(this.pointList.getContainer());
      this.setEventListeners();
      this.draw();
      return this;
    }

    Graph.prototype.setEventListeners = function() {
      return this.boundry.getContainer().addEventListener('click', this.onBoundryClick.bind(this));
    };

    Graph.prototype.onBoundryClick = function(e) {
      this.pointList.addPoint(e.stageX, e.stageY);
      console.log(this.pointList.getPoints());
      this.pointLine.setPoints(this.pointList.getPoints());
      this.draw();
      return this.dispatchEvent('graphUpdate');
    };

    Graph.prototype.getContainer = function() {
      return this.container;
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

    Graph.prototype.draw = function() {
      this.pointList.draw();
      return this.pointLine.draw();
    };

    return Graph;

  })();

}).call(this);
