
(function() {
  var myAppDev = angular.module('myAppDev', ['myApp', 'ngMockE2E']);
  myAppDev.run(function($http, $httpBackend, testUser) {
    // adds a new phone to the phones array
    // $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
    //   var phone = angular.fromJson(data);
    //   phones.push(phone);
    //   return [200, phone, {}];
    // });
    $httpBackend.whenGET(/^partials\//).passThrough();
    $httpBackend.whenGET(/^testdata\//).passThrough();
    //...
    $httpBackend.whenPOST('/signup', testUser.validSignup)
      .respond(testUser.validSignupRespond);
    $httpBackend.whenPOST('/signup', testUser.invalidSignup)
      .respond(testUser.invalidSignupRespond);

    $httpBackend.whenPOST('/signin', testUser.validSignin)
      .respond(testUser.validSigninRespond);
    $httpBackend.whenPOST('/signin', testUser.notMatchSignin)
      .respond(testUser.notMatchSigninRespond);
    $httpBackend.whenPOST('/signin', testUser.notExistsSignin)
      .respond(testUser.notExistsSigninRespond);
    // angular.module('myApp').requires.push('e2eMocks');

    //TaskInfo Restful MOCK
    // /user/subTasks  子任务资源
    // /user/progress  进度资源
    // /user/taskInfo  任务信息
    // /user/taskBasic 任务基本信息
    // /user/taskDetail 任务详细描述

    $http.get('testdata/tasks.json').success(function(tasks) {
      var task1Path = encodeURIComponent('/Task1');
      var task2Path = encodeURIComponent('/Task2');
      var taskInfoURI = '/user/taskInfo?taskPath=';
      var rootPath= encodeURIComponent('/');

      $httpBackend.whenGET('/user/subTasks?taskPath='+rootPath)
      .respond( tasks );
      $httpBackend.whenGET(taskInfoURI+rootPath).respond({subTasks: tasks});
      $httpBackend.whenGET(taskInfoURI+task1Path).respond( tasks[0] );
      $httpBackend.whenGET(taskInfoURI+task2Path).respond( tasks[1] );

      $httpBackend.whenPOST('/user/taskBasic?taskPath='+task1Path).respond(
        function(method, url, task) {
          var changeTask = tasks[0];
          for(var prop in task) {
            changeTask[prop] = task[prop];
          }
          return [200];
      });
      $httpBackend.whenPOST('/user/taskBasic?taskPath='+task2Path).respond(
        function(method, url, task) {
          var changeTask = tasks[1];
          for(var prop in task) {
            changeTask[prop] = task[prop];
          }
          return [200];
      });
      $httpBackend.whenPOST('/user/taskDetail?taskPath='+task1Path).respond(
      function(method, url, text) {
        tasks[0].detail = text;
        return [200];
       });
      $httpBackend.whenPOST('/user/taskDetail?taskPath='+task2Path).respond(
      function(method, url, text) {
        tasks[1].detail = text;
        return [200];
      });
    });
  });
}());
