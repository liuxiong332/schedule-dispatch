'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
.factory('RootTasks', ['$resource', function($resource) {
  return $resource('/:user/rootTasks');
}])
.factory('TaskInfo', ['$resource', function($resource) {
  return $resource('/:user/taskInfo', {taskPath: '@taskPath'});
}])
.factory('TaskProgress', ['$resource', function($resource) {
  //progressName: the name of the progress or the name array
  return $resource('/:user/taskProgress', {taskPath: '@taskPath', progressName: '@name'});
}]);
