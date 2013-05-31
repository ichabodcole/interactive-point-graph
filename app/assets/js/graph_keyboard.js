(function() {
  window.graph = typeof graph !== "undefined" && graph !== null ? graph : {};

  graph.GraphKeyBoard = (function() {
    GraphKeyBoard.SHIFT_KEY = 16;

    function GraphKeyBoard() {
      this.active_key = null;
      this.setEventListeners();
      return this;
    }

    GraphKeyBoard.prototype.setEventListeners = function() {
      var _this = this;

      $(document).keydown(function(e) {
        return _this.active_key = e.which;
      });
      return $(document).keyup(function(e) {
        return _this.active_key = null;
      });
    };

    GraphKeyBoard.prototype.keyIsDown = function(keyCode) {
      if (keyCode === this.active_key) {
        return true;
      }
    };

    return GraphKeyBoard;

  })();

}).call(this);
