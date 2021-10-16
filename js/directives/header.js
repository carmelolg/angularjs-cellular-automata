'use strict';

angular.module('CellularAutomata')
  .directive('header', [function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'views/header.html',
      link: function(scope, element) {}
    };
  }]);
