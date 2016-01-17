'use strict';

/* Controllers */

angular.module('CellularAutomata')
  .controller('HomeCtrl', ['$scope', function($scope) {

    $scope.start = false;
    $scope.step = 500;
    $scope.init = {
      cells: [{
        i: 1,
        j: 1
      }, {
        i: 1,
        j: 2
      }, {
        i: 1,
        j: 3
      }]
    };
  }]);
