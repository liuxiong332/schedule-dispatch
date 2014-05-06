'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngCookies', 'myApp.constants', 'ngRoute'])
  .controller('identifyControl',
    ['$scope','$cookies', 'signinUrl', 'signupUrl',
   function($scope,$cookies, signinUrl, signupUrl) {
    //get the userName from the cookie
    $scope.userName = $cookies.userName;
    $scope.isUserExists = !!$cookies.userName;

    $scope.onRouteChange = function(url) {
      if(url === signinUrl) {
        $scope.isSigninActive = true;
        $scope.isSignupActive = false;
      } else if(url === signupUrl) {
        $scope.isSignupActive = true;
        $scope.isSigninActive = false;
      }
    };
  }])
  .controller('signupControl', ['$scope', '$http',
  function($scope, $http) {
    $scope.isUserAvailable = true;
    $scope.onSignup = function() {
      var userInfo = {email: $scope.email, password: $scope.password };
      $http.post('/signup', userInfo).success( function(data) {
        $scope.isUserAvailable = data.isUserAvailable;
      });
    };
  }])
  .controller('signinControl', ['$scope', '$http', function($scope, $http) {
    $scope.isUserCorrect = true;
    $scope.isUserExists = true;
    $scope.onSignin = function() {
      var userInfo = {email: $scope.email, password: $scope.password };
      $http.post('/signin', userInfo).success(function(data) {
        if(!data.isUserExists) {
          $scope.isUserExists = false;
        } else if(!data.isUserCorrect) {
          $scope.isUserExists = true;
          $scope.isUserCorrect = false;
        } else {
          $scope.isUserExists = $scope.isUserCorrect = true;
        }
      });
    };
  }]);
