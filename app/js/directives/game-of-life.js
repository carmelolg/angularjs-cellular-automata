'use strict';

var width = 0;
var height = 0;
var init = {};
var matrix = [
  []
];

function _create2DMatrix(matrix, width, height) {
  for (var i = 0; i < width; i++) {
    matrix[i] = new Array(height);
    for (var j = 0; j < height; j++) {
      matrix[i][j] = 0;
    }
  }
}

function _init() {
  init.cells.forEach(function(value, index) {
    matrix[value.i][value.j] = 1;
  });
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
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      alive = (_getNumberOfNeighbors_Moore(i,j) < 2 && matrix[i][j] ) ? 1 : 0;
    }
  }
}

angular.module('CellularAutomata')
  .directive('gol', ['$interval', function($interval) {
    return {
      restrict: 'E',
      scope: {
        width: '=',
        height: '=',
        init: '='
      },
      templateUrl: 'views/gol.html',
      link: function(scope, element) {
        width = scope.width;
        height = scope.height;
        init = scope.init;
        _create2DMatrix(matrix, width, height);
        _init();
        $interval(function() {
          _transitionFn();
        }, 250);
        // getNumberOfNeighbors_Moore(0,0);
      }
    };
  }]);
