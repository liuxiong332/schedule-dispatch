'use strict';

angular.module('myApp.taskAccordion', [])
.directive('taskAccordion', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      heading: '=',
      isOpen: '=',
      onEdit: '&onEdit'
    },
    templateUrl: 'partials/task-accordion.html'
  };
});
