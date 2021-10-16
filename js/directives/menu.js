'use strict';

angular.module('CellularAutomata')
  .directive('menu', [function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'views/menu.html',
      link: function(scope, element) {}
    };
  }]);
