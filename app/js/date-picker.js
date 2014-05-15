'use strict';

angular.module('myApp.datePicker', [])
  .controller('datePickerEditor', ['$scope',
  function($scope) {
    //dateInput is object contain content property
    $scope.isOpen = false;
    $scope.onPopupDatePicker = function($event) {
      $event.stopPropagation();
      $event.preventDefault();
      $scope.isOpen = true;
    };
  }])
  .directive('dateEditor', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/date-picker.html',
      scope: {
        dateInput: '='
      }
    };
  });
