'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
.factory('subTasks', ['$resource', function($resource) {
  return $resource('/:user/subTasks', {taskPath: '@taskPath'});
}])
.factory('TaskInfo', ['$resource', function($resource) {
  return $resource('/:user/taskInfo', {taskPath: '@taskPath'});
}])
.factory('TaskBasic', ['$resource', function($resource) {
  return $resource('/:user/taskBasic', {taskPath: '@taskPath'});
}])
.factory('TaskDetail', ['$resource', function($resource) {
  return $resource('/:user/taskDetail', {taskPath: '@taskPath'});
}])
.factory('TaskProgress', ['$resource', function($resource) {
  //progressName: the name of the progress or the name array
  return $resource('/:user/progress', {taskPath: '@taskPath', name: '@name'});
}]);
