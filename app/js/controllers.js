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
  }])
  .controller('tasklistControl', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    $scope.user = $stateParams.user;
    disposeLink();
    //set the link of the path
    function disposeLink() {
      var baseLink = '#/'+$scope.user+'/tasklist/';
      var viewModel = $scope.viewModel = [];

      var userModel = {
          view: $scope.user,  //the string show in the ui
          link: baseLink,     //link address
          isDeactive: false   //the link is not active
        };
      var viewStr = $scope.user;
      var pathLink = baseLink;

      function AnalyzePath() {
        var i;
        for(i=0;i<$scope.path.length;++i) {
          if(!$scope.path[i])  continue;
          viewStr = $scope.path[i];
          pathLink = pathLink + $scope.path[i] + '/';
          viewModel.push( {view: viewStr, link: pathLink, isDeactive: false });
        }
      }

      viewModel.push(userModel);
      if($stateParams.path) {
        $scope.path = $stateParams.path.split('/');
        AnalyzePath();
      }
      //the last element will deactive
      viewModel[viewModel.length-1].isDeactive = true;
    }

    function TaskDate() {
      this.content = new Date();
      this.isInEdit = false;
      this.isOpen = false;
    }
    TaskDate.prototype.onPopupDatePicker = function($event) {
      $event.stopPropagation();
      $event.preventDefault();
      this.isOpen = true;
    };

    $scope.overview = {
      isInEdit: false,
      content: '如果你是，赶紧使用吧，从现在开始规划自己的人生！'
    };
    $scope.beginDate = new TaskDate();
    $scope.endDate = new TaskDate();

  }]);
