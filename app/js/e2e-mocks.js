
(function() {
  var myAppDev = angular.module('myAppDev', ['myApp', 'ngMockE2E']);
  myAppDev.run(function($httpBackend, testUser) {
    // adds a new phone to the phones array
    // $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
    //   var phone = angular.fromJson(data);
    //   phones.push(phone);
    //   return [200, phone, {}];
    // });
    $httpBackend.whenGET(/^partials\//).passThrough();
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
  });
}());
