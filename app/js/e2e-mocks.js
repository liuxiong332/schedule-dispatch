
myAppDev = angular.module('myAppDev', ['myApp', 'ngMockE2E']);
  myAppDev.run(function($httpBackend, validEmailForTest, validPasswordForTest,
  invalidEmailForTest, invalidPasswordForTest) {
    phones = [{name: 'phone1'}, {name: 'phone2'}];

    // returns the current list of phones
    $httpBackend.whenGET('/phones').respond(phones);

    // adds a new phone to the phones array
    $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
      var phone = angular.fromJson(data);
      phones.push(phone);
      return [200, phone, {}];
    });
    $httpBackend.whenGET(/^\/templates\//).passThrough();
    //...
    function() {
      var validUser = {email: validEmailForTest,
        password: validPasswordForTest};
      var notExistsUser = {email: invalidEmailForTest,
        password: validPasswordForTest};
      var notCorrectUser = {email: validEmailForTest,
        password: invalidPasswordForTest};
      var invalidUser = {email: invalidEmailForTest,
        password: invalidPasswordForTest};

      var userCorrectResponse = {isUserExists:true, isUserCorrect: true};
      var userExistsResponse = {isUserExists:true, isUserCorrect: false};
      var userNotExistsResponse = {isUserExists:false, isUserCorrect: false};

      $httpBackend.whenPOST('/signin',validUser).respond(userCorrectResponse);
      $httpBackend.whenPOST('/signin', notExistsUser)
        .respond(userNotExistsResponse);
      $httpBackend.whenPOST('/signin', invalidUser)
        .respond(userNotExistsResponse);
      $httpBackend.whenPOST('/signin', notCorrectUser)
        .respond(userExistsResponse);

      var validResponse = {isUserAvailable: true};
      var invalidResponse = {isUserAvailable: false};
      $httpBackend.whenPOST('/signup', validUser).respond(validResponse);
      $httpBackend.whenPOST('/signup', notExistsUser)
    }

  });
