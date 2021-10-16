'use strict';

angular.module('CellularAutomata')
  .directive('footer', [function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'views/footer.html',
      link: function(scope, element) {
        scope.currentYear = new Date().getFullYear();
      }
    };
  }]);
