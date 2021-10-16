'use strict';

var width = 0;
var height = 0;
var cellsize = 0;
var init = {};
var matrix = [
  []
];
var canvas;
var computationOnAir = false;
var interval = undefined;

function _create2DMatrix(matrix, width, height) {
  for (var i = 0; i < width; i++) {
    matrix[i] = new Array(height);
    for (var j = 0; j < height; j++) {
      matrix[i][j] = 0;
    }
  }
}

function _init() {
  for (var i = 0; i < init.cells.length; i++) {
    var object = init.cells[i];
    matrix[object.i][object.j] = 1;
  }
}

function _isInsideAndAlive(i, j) {
  return matrix[i] && matrix[i][j];
}

/*
 * ---------
 * -   X   -
 * - X C X -
 * -   X   -
 * ---------
 */
function _getNumberOfNeighbors_VonNeumann(i, j) {
  var neighbors = 0;

  if (_isInsideAndAlive(i - 1, j)) neighbors++;
  if (_isInsideAndAlive(i, j - 1)) neighbors++;
  if (_isInsideAndAlive(i, j + 1)) neighbors++;
  if (_isInsideAndAlive(i + 1, j)) neighbors++;

  return neighbors;
}


/*
 * ---------
 * - X X X -
 * - X C X -
 * - X X X -
 * ---------
 */
function _getNumberOfNeighbors_Moore(i, j) {
  var neighbors = 0;

  if (_isInsideAndAlive(i - 1, j - 1)) neighbors++;
  if (_isInsideAndAlive(i - 1, j)) neighbors++;
  if (_isInsideAndAlive(i - 1, j + 1)) neighbors++;
  if (_isInsideAndAlive(i, j - 1)) neighbors++;
  if (_isInsideAndAlive(i, j + 1)) neighbors++;
  if (_isInsideAndAlive(i + 1, j - 1)) neighbors++;
  if (_isInsideAndAlive(i + 1, j)) neighbors++;
  if (_isInsideAndAlive(i + 1, j + 1)) neighbors++;

  return neighbors;
}

function _transitionFn() {
  computationOnAir = true;
  var temp = [];
  for (var i = 0; i < width; i++) {
    temp[i] = [];
    for (var j = 0; j < height; j++) {
      var alive = 0,
        n = _getNumberOfNeighbors_Moore(i, j);
      if (matrix[i][j]) {
        alive = (n == 2 || n == 3) ? 1 : 0;
      } else {
        alive = (n == 3) ? 1 : 0;
      }
      temp[i][j] = alive;
    }
  }
  matrix = temp;
  computationOnAir = false;
}

function _draw() {
  canvas.clearRect(0, 0, width, height);
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      canvas.beginPath();
      canvas.rect(i * cellsize, j * cellsize, cellsize, cellsize);
      if (matrix[i][j]) {
        canvas.fill();
      } else {
        canvas.stroke();
      }
    }
  }
}


angular.module('CellularAutomata')
  .directive('gol', ['$interval', 'Const', function($interval, Const) {
    return {
      restrict: 'A',
      scope: {
        width: '=',
        height: '=',
        init: '=',
        cellsize: '=',
        start: '=',
        step: '='
      },
      templateUrl: 'views/gol.html',
      link: function(scope, element) {

        width = scope.width;
        height = scope.height;
        init = scope.init;
        cellsize = scope.cellsize;

        canvas = element[0].getContext('2d');
        canvas.strokeStyle = Const.strokeColor;
        canvas.fillStyle = Const.fillColor;

        scope.$watch(function() {
          return scope.start;
        }, function(start) {
          console.log(scope.step);
          if (start) {
            _create2DMatrix(matrix, width, height);
            _init();
            interval = $interval(function() {
              _transitionFn();
              _draw();
            }, scope.step);

          }else{
            if(interval){
              $interval.cancel(interval);
            }
            _create2DMatrix(matrix, width, height);
            _init();
          }
        });
      }
    };
  }]);
