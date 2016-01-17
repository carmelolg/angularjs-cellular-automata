'use strict';


// Declare app level module which depends on filters, and services
angular.module('CellularAutomata', [
  'ngRoute',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.otherwise({
    redirectTo: '/home'
  });
}]);
