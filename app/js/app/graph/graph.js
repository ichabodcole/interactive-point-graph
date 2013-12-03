(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['createjs', 'graph/render_queue', 'graph/grid', 'graph/point_list', 'graph/point_line', 'graph/time_point'], function(createjs, RenderQueue, Grid, PointList, PointLine, TimePoint) {
    var Graph;

    Graph = (function(_super) {
      __extends(Graph, _super);

      function Graph(options) {
        var defaults;

        if (options == null) {
          options = {};
        }
        Graph.__super__.constructor.apply(this, arguments);
        defaults = {
          width: 600,
          height: 300,
          scaleXStart: this._minutesToSeconds(0),
          scaleXEnd: this._minutesToSeconds(60),
          scaleXStepCount: 10,
          scaleXZoom: 1,
          scaleYStart: 0,
          scaleYEnd: 16,
          scaleYStepCount: 8,
          scaleYZoom: 1,
          borderLineWidth: 1,
          borderColor: '#ccc',
          borderCornerRadius: 0,
          gridLineWidth: 1,
          gridColor: '#ccc',
          gridPaddingLeft: 45,
          gridPaddingBottom: 20,
          fontColor: '#ccc',
          fontFamily: 'Arial',
          fontStyle: 'normal',
          fontSize: 12
        };
        this.config = _.defaults(options, defaults);
        this.grid = new Grid(this.config);
        this.pointContainer = this._setupPointContainer(this.grid);
        this.pointList = this._setupPointList();
        this.pointLine = new PointLine(this.pointList);
        this.timePoint = new TimePoint(this.pointList);
        this.addChild(this.grid);
        this.addChild(this.pointContainer);
        this.pointContainer.addChild(this.pointLine);
        this.pointContainer.addChild(this.pointList);
        this.pointContainer.addChild(this.timePoint);
        this._setEventListeners();
        this.renderQueue = new RenderQueue();
        this.renderQueue.add(this.grid, this.pointList, this.pointLine);
        return this;
      }

      Graph.prototype._minutesToSeconds = function(minutes) {
        var seconds;

        return seconds = minutes * 60;
      };

      Graph.prototype._labelYFormat = function(seconds) {};

      Graph.prototype._setupPointContainer = function(grid) {
        var gridPoint, pointContainer;

        pointContainer = new createjs.Container();
        gridPoint = grid.getGridRegPoint();
        pointContainer.x = gridPoint.x;
        pointContainer.y = gridPoint.y;
        return pointContainer;
      };

      Graph.prototype._setupPointList = function() {
        var max, min, pointList;

        min = {
          x: 0,
          y: 0
        };
        max = {
          x: this.config.width,
          y: this.config.height
        };
        pointList = new PointList(min, max);
        this._setInitialPoints(pointList, this.config.width, this.config.height);
        return pointList;
      };

      Graph.prototype._setEventListeners = function() {
        this.grid.addEventListener('click', this.onGridClick.bind(this));
        this.pointList.addEventListener('pointMove', this.onPointUpdate.bind(this));
        this.pointList.addEventListener('pointRemove', this.onPointUpdate.bind(this));
        this.pointList.addEventListener('pointTypeChange', this.onPointUpdate.bind(this));
        return this.timePoint.addEventListener('update', this.onTimePointUpdate.bind(this));
      };

      Graph.prototype.onTimePointUpdate = function(e) {
        this.renderQueue.add(this.timePoint);
        return this.dispatchEvent('graphUpdate');
      };

      Graph.prototype.onPointUpdate = function(e) {
        this.renderQueue.add(this.pointList, this.pointLine);
        return this.dispatchEvent('graphUpdate');
      };

      Graph.prototype.onGridClick = function(e) {
        var pnt;

        pnt = e.target.grid.globalToLocal(e.stageX, e.stageY);
        this.pointList.addPoint(pnt.x, pnt.y);
        this.renderQueue.add(this.pointList, this.pointLine);
        return this.dispatchEvent('graphUpdate');
      };

      Graph.prototype._setInitialPoints = function(pointList, width, height) {
        var base_line, point_options;

        base_line = height / 2;
        point_options = {
          visible: false,
          editable: false
        };
        pointList.addPoint(0, base_line, point_options);
        pointList.addPoint(width, base_line, point_options);
        return pointList.addPoints([
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
    return Graph;
  });

}).call(this);
