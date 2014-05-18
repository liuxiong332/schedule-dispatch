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
  .controller('tasklistControl',
    ['$scope', 'TaskInfo', '$stateParams', '$state', 'currentUrl',
    function($scope, TaskInfo, $stateParams, $state, currentUrl) {
    $scope.user = $stateParams.user;
    $scope.stateParams = $stateParams;

    var taskPath = $stateParams.path;
    if(taskPath[0] === '/')   taskPath = '/' + taskPath;
    TaskInfo.get({user: $stateParams.user, taskPath: taskPath},
    function(task) {
      $scope.task = task;
    });

    $scope.getSubTaskUrl = function(name) {
      return currentUrl+name+'/';
    }
    $scope.onCreateNewTask = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $state.go('newTask', $stateParams);
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
    $scope.onAddProgress = function($event) {
      $event.stopPropagation();
      $event.preventDefault();
      $state.go('newProgress', $stateParams);
    };

    function currentUrlEndWithSlash() {
      if(currentUrl[currentUrl.length-1] !== '/') //judge is end with /
        currentUrl = currentUrl+'/';
    }
    //set the link of the path

  }])
  .controller('taskPathControl', ['$scope', function($scope) {
    var baseLink = '#/'+$scope.user+'/tasklist/';
    var viewModel = $scope.viewModel = [];
    var taskPath, path = $scope.stateParams.path;

    var userModel = {
        view: $scope.user,  //the string show in the ui
        link: baseLink,     //link address
        isDeactive: false   //the link is not active
      };
    viewModel.push(userModel);
    if(path) {
      taskPath = path.split('/');
      AnalyzePath(taskPath);
    }
    //the last element will deactive
    viewModel[viewModel.length-1].isDeactive = true;

    function AnalyzePath(taskPath) {
      var viewStr;  //the str show in the web pages
      var pathLink = baseLink;    //the link url for every path string
      for(var i=0;i<taskPath.length;++i) {
        if(!(viewStr = taskPath[i]))  continue;
        pathLink = pathLink + viewStr + '/';
        viewModel.push( {view: viewStr, link: pathLink, isDeactive: false });
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
  }])
  .controller('progressAddControl', ['$scope', '$state',
  function($scope, $state) {
    $scope.progress = {};
    $scope.progress.date = new Date();
    $scope.onComplete = function($event) {
      $event.stopPropagation();
      $event.preventDefault();
      $state.go('tasklist');
    };
  }]);
