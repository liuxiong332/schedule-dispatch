'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ui.router',
  'ui.bootstrap',
  'ui.codemirror',
  'hc.marked',
  'myApp.filters',
  'myApp.constants',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
// config(['$locationProvider', function($locationProvider) {
//   $locationProvider.html5Mode(true);
// }]).
config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
  // $routeProvider.when(signinUrl, {templateUrl: 'partials/signin-page.html',
  //   controller: 'signinControl'});
  // $routeProvider.when(signupUrl, {templateUrl: 'partials/signup-page.html',
  //   controller: 'signupControl'});
  // $routeProvider.otherwise({redirectTo: signinUrl});
  $stateProvider.state('signup', {
    url: '/',
    templateUrl: 'partials/signup-page.html',
    controller: 'signupControl'
  });
  $stateProvider.state('signin', {
    url: '/',
    templateUrl: 'partials/signin-page.html',
    controller: 'signinControl'
  });
  var taskListUrl = '/:user/tasklist/{path:.*}';
  $stateProvider.state('tasklist', {
    url: taskListUrl,
    controller: 'tasklistControl',
    templateUrl: 'partials/task-detail.html',
    resolve: {
      currentUrl: function() {
        return taskListUrl;
      }
    }
  });
  $stateProvider.state('newTask', {
    url: taskListUrl,
    templateUrl: 'partials/new-task.html',
    controller: 'newTaskControl'
  });
}]).
config(['markedProvider', function(markedProvider) {
  markedProvider.setOptions({gfm: true});
}]);
