'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngCookies'])
  .controller('identifyControl', ['$scope','$cookies',
   function($scope,$cookies,$http) {
    $scope.isSigninActive = true;
    $scope.isSignupActive = false;
    //get the userName from the cookie
    $scope.userName = $cookies.userName;
    $scope.isUserExists = !!$cookies.userName;

    //when click the login and logup button invoked
    $scope.onMenuClick = function() {
      $scope.isSigninActive = !$scope.isSigninActive;
      $scope.isSignupActive = !$scope.isSignupActive;
    };
  }])
  .controller('signupControl', ['$scope', function($scope) {
    $scope.user = {};
  }]);
