'use strict';

angular.module('myApp.datePicker')
  .controller('datePickerEditor', ['$scope', 'dateInput',
  function($scope, dateInput) {
    //dateInput is object contain content property
    $scope.dateInput = dateInput;
    $scope.isOpen = false;
    $scope.onPopupDatePicker = function($event) {
      $event.stopPropagation();
      $event.preventDefault();
      dateInput.isOpen = true;
    };
  }]);
