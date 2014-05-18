
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
    $http.get('/testdata/tasks.json').success(function(tasks)
    {
      var task1URI = '/user/taskInfo?taskPath='+
        encodeURIComponent('/Task1');
      var task2URI = '/user/taskInfo?taskPath='+
        encodeURIComponent('/Task2');

      $httpBackend.whenGET('/user/rootTasks')
      .respond( tasks );
      $httpBackend.whenGET(task1URI).respond( tasks[0] );
      $httpBackend.whenGET(task2URI).respond( tasks[1] );
      $httpBackend.whenPOST(RegExp(task1URI+'|'+task2URI).respond(
        function(method, url, task) {
          var isPost = false;
          for(var i=0;i<tasks.length;++i) {
            if(tasks[i].name === task.name) {
              isPost = true;
              tasks[i] = task;
              break;
            }
          }
          if(!isPost)
            tasks.push(task);
          return [200];
      });

      $httpBackend.whenDELETE(task1URI)
    });

  });
}());
