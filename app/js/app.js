'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.constants',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', 'signinUrl', 'signupUrl',
  function($routeProvider, signinUrl, signupUrl) {
  $routeProvider.when(signinUrl, {templateUrl: 'partials/signin-page.html',
    controller: 'signinControl'});
  $routeProvider.when(signupUrl, {templateUrl: 'partials/signup-page.html',
    controller: 'signupControl'});
  $routeProvider.otherwise({redirectTo: signinUrl});
}]);
