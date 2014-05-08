'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngCookies'])
  .controller('identifyControl',
    ['$scope','$cookies', '$state', function($scope,$cookies, $state) {
    //get the userName from the cookie
    $scope.userName = $cookies.userName;
    $scope.isUserExists = !!$cookies.userName;

    $scope.isSignupActive = true;
    $scope.isSigninActive = false;
    if(!$scope.isUserExists) {
      $state.go('signup');
    }

    function switchActiveState() {
      $scope.isSignupActive = !$scope.isSignupActive;
      $scope.isSigninActive = !$scope.isSigninActive;
    }
    $scope.onSignupClick = function($event) {
      if(!$scope.isSignupActive) {
        switchActiveState();
        $state.go('signup');
      }
      $event.preventDefault();
    };

    $scope.onSigninClick = function($event) {
      if(!$scope.isSigninActive) {
        switchActiveState();
        $state.go('signin');
      }
      $event.preventDefault();
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
