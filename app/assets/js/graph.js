(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.graph = typeof graph !== "undefined" && graph !== null ? graph : {};

  graph.Graph = (function(_super) {
    __extends(Graph, _super);

    function Graph(width, height) {
      var boundry_options;

      Graph.__super__.constructor.apply(this, arguments);
      this.renderQueue = new graph.GraphRenderQueue();
      boundry_options = {
        line_color: "#ddd"
      };
      this.boundry = new graph.GraphBoundry(width, height, boundry_options);
      this.pointList = new graph.GraphPointList(graph.GraphPoint);
      this.setInitialPoints(width, height);
      this.pointLine = new graph.GraphPointLine(this.pointList);
      this.timePoint = new graph.GraphTimePoint(this.pointList);
      this.addChild(this.boundry);
      this.addChild(this.pointLine);
      this.addChild(this.pointList);
      this.addChild(this.timePoint);
      this.setEventListeners();
      this.renderQueue.add(this.boundry, this.pointList, this.pointLine);
      return this;
    }

    Graph.prototype.setEventListeners = function() {
      this.boundry.addEventListener('click', this.onBoundryClick.bind(this));
      this.pointList.addEventListener('pointMove', this.onPointUpdate.bind(this));
      this.pointList.addEventListener('pointRemove', this.onPointUpdate.bind(this));
      return this.pointList.addEventListener('pointTypeChange', this.onPointUpdate.bind(this));
    };

    Graph.prototype.onPointUpdate = function(e) {
      this.renderQueue.add(this.pointList, this.pointLine);
      return this.dispatchEvent('graphUpdate');
    };

    Graph.prototype.onBoundryClick = function(e) {
      this.pointList.addPoint(e.stageX, e.stageY);
      this.renderQueue.add(this.pointList, this.pointLine);
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
      this.pointList.addPoint(width, base_line, point_options);
      return this.pointList.addPoints([
        {
          x: 100,
          y: 75
        }, {
          x: 200,
          y: 180,
          options: {
            type: 'curve'
          }
        }, {
          x: 350,
          y: 120,
          options: {
            type: 'curve'
          }
        }, {
          x: 400,
          y: 200
        }
      ]);
    };

    Graph.prototype.render = function() {
      this.renderQueue.render();
      return this.renderQueue.clear();
    };

    return Graph;

  })(createjs.Container);

}).call(this);
