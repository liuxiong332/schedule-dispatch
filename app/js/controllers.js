'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('logupControl', ['$scope', function($scope) {
    $scope.isLoginActive = true;
    $scope.isLogupActive = false;
    //when click the login and logup button invoked
    $scope.onMenuClick = function() {
      $scope.isLoginActive = !$scope.isLoginActive;
      $scope.isLogupActive = !$scope.isLogupActive;
    };
  }]);
