'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signin', {templateUrl: 'partials/signin-page.html',
    controller: 'identifyControl'});
  $routeProvider.when('/signup', {templateUrl: 'partials/signup-page.html',
    controller: 'identifyControl'});
  $routeProvider.otherwise({redirectTo: '/signin'});
}]);
