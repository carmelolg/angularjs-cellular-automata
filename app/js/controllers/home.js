'use strict';

/* Controllers */

angular.module('CellularAutomata')
  .controller('HomeCtrl', ['$scope', function($scope) {

    $scope.start = false;
    $scope.step = 500;
    $scope.init = {
      cells: [{
        i: 2,
        j: 2
      }, {
        i: 2,
        j: 2
      }, {
        i: 3,
        j: 2
      }, {
        i: 3,
        j: 1
      }, {
        i: 2,
        j: 0
      }]

    };
  }]);
