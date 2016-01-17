'use strict';

var width = 0;
var height = 0;
var init = {};
var matrix = [[]];


angular.module('CellularAutomata')
  .directive('gol', [function() {
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

        console.log(width);
        console.log(height);
        console.log(init);
      }
    };
  }]);
