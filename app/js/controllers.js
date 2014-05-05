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
  .controller('signupControl', ['$scope', function($scope) {

  }])
  .controller('signinControl', ['$scope', function($scope) {

  }]);
