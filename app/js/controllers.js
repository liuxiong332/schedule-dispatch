'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngCookies'])
  .controller('logupControl', ['$scope','$cookies','$http',
   function($scope,$cookies,$http) {
    $scope.isLoginActive = true;
    $scope.isLogupActive = false;
    //get the userName from the cookie
    $scope.userName = $cookies.userName;
    $scope.isUserExists = !!$cookies.userName;

    //when click the login and logup button invoked
    $scope.onMenuClick = function() {
      $scope.isLoginActive = !$scope.isLoginActive;
      $scope.isLogupActive = !$scope.isLogupActive;
    };
    // $scope.onLogin = function() {
    //   $http.post('/login',{userName:})
    // };
    // $scope.onLogup = function() {
    //   onMenuClick();
    // };

  }]);
