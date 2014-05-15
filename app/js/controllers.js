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
  .controller('tasklistControl', ['$scope', '$stateParams', '$state',
    'currentUrl', function($scope, $stateParams, $state, currentUrl) {
    $scope.user = $stateParams.user;
    disposeLink();

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

    $scope.getSubTaskUrl = function(name) {
      return currentUrl+name+'/';
    }
    $scope.onCreateNewTask = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $state.go('newTask');
    };
    $scope.overview = {
      isInEdit: false,
      content: '如果你是，赶紧使用吧，从现在开始规划自己的人生！'
    };
    $scope.beginDate = new TaskDate();
    $scope.endDate = new TaskDate();
    $scope.detail = {
      isInEdit: false,
      content: '* 要点一\n* 要点二\n* 要点三\n\n[链接](#)\n'
    };

    function Progress(name, date, content) {
      this.nameCommit = name;
      this.dateCommit = date;
      this.contentCommit = content;
    }

    $scope.progressList = [
      new Progress('提交1', new Date(), '好像什么都没做'),
      new Progress('提交2', new Date(), '做了什么呢？')
    ];
    function currentUrlEndWithSlash() {
      if(currentUrl[currentUrl.length-1] !== '/') //judge is end with /
        currentUrl = currentUrl+'/';
    }
    //set the link of the path
    function disposeLink() {
      var baseLink = '#/'+$scope.user+'/tasklist/';
      var viewModel = $scope.viewModel = [];

      var userModel = {
          view: $scope.user,  //the string show in the ui
          link: baseLink,     //link address
          isDeactive: false   //the link is not active
        };
      viewModel.push(userModel);
      if($stateParams.path) {
        $scope.currentPath = $stateParams.path;
        $scope.path = $stateParams.path.split('/');
        AnalyzePath();
      }
      //the last element will deactive
      viewModel[viewModel.length-1].isDeactive = true;

      function AnalyzePath() {
        var i;
        var viewStr = $scope.user;  //the str show in the web pages
        var pathLink = baseLink;    //the link url for every path string
        for(i=0;i<$scope.path.length;++i) {
          if(!$scope.path[i])  continue;
          viewStr = $scope.path[i];
          pathLink = pathLink + $scope.path[i] + '/';
          viewModel.push( {view: viewStr, link: pathLink, isDeactive: false });
        }
      }
    }
  }])
  .controller('newTaskControl', ['$scope', '$state',
  function($scope, $state) {
    $scope.onComplete = function($event) {
      $event.stopPropagation();
      $event.preventDefault();
      $state.go('tasklist');
    };
  }]);
