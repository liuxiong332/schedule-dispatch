'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'));

  describe('identifyControl ', function() {
    var scope, cookies ;
    var signinUrl, signupUrl;
    var getController;

    //init the mock variables
    beforeEach( inject( function($controller, _signinUrl_, _signupUrl_) {
      scope = cookies = {};
      signinUrl = _signinUrl_;
      signupUrl = _signupUrl_;
      getController = function() {
        return $controller('identifyControl',
          {$scope: scope, $cookies: cookies});
      };
    }));

    it('should active the specific menu item', function() {
      //get the identify Controller
      var identifyControl = getController();
      expect(identifyControl).toBeDefined();

      scope.onRouteChange(signinUrl);
      expect(scope.isSigninActive).toBe(true);
      expect(scope.isSignupActive).toBe(false);

      scope.onRouteChange(signupUrl);
      expect(scope.isSigninActive).toBe(false);
      expect(scope.isSignupActive).toBe(true);
    });

    it('should get the userName', function() {
      getController();
      expect(scope.userName).toBeFalsy();
      expect(scope.isUserExists).toBe(false);

      //set the user name of cookie
      var USER_NAME = "good";
      cookies = {userName: USER_NAME};
      getController();
      expect(scope.userName).toMatch(USER_NAME);
      expect(scope.isUserExists).toBe(true);
    });
  });

  describe('signupControl & signinControl', function() {

    it('when user signup, post the signup request',
      inject(function($controller, $httpBackend, testUser) {
        var responseData = {isUserAvailable: true};
        var responseFalseData = {isUserAvailable: false};

        $httpBackend.whenPOST('/signup', testUser.validSignup)
          .respond(responseData);
        $httpBackend.whenPOST('/signup', testUser.invalidSignup)
          .respond(responseFalseData);

        var scope = {};
        $controller('signupControl', {'$scope': scope});
        expect(scope.isUserAvailable).toBe(true);

        scope.email = testUser.invalidSignup.email;
        scope.password = testUser.invalidSignup.password;
        scope.onSignup();
        $httpBackend.flush();
        expect(scope.isUserAvailable).toBe(false);

        scope.email = testUser.validSignup.email;
        scope.password = testUser.validSignup.password;
        scope.onSignup();
        $httpBackend.flush();
        expect(scope.isUserAvailable).toBe(true);

      }));

      // it('when user signin, should post the correct email and password',
      //   inject(function($controller, $httpBackend) {
      //     var userNotExistsResponse = {isUserExists: false};
      //     var userNotCorrectResponse =
      //       {isUserExists: true, isUserCorrect: false};
      //     var userCorrectResponse =
      //       {isUserExists: true, isUserCorrect: true};

      //     var notCorrectData = {email:EMAIL, password:EMPTY_STR};
      //     $httpBackend.whenPOST('/signin', userData)
      //       .respond(userCorrectResponse);
      //     $httpBackend.whenPOST('/signin', notCorrectData)
      //       .respond(userNotCorrectResponse);
      //     $httpBackend.whenPOST('/signin', userFalseData)
      //       .respond(userNotExistsResponse);

      //     var scope = {};
      //     $controller('signinControl', {$scope: scope});
      //     scope.email = scope.password = EMPTY_STR;
      //     scope.onSignin();
      //     $httpBackend.flush();
      //     expect(scope.isUserExists).toBe(false);

      //     scope.email = EMAIL;
      //     scope.password = EMPTY_STR;
      //     scope.onSignin();
      //     $httpBackend.flush();
      //     expect(scope.isUserExists).toBe(true);
      //     expect(scope.isUserCorrect).toBe(false);

      //     scope.email = EMAIL;
      //     scope.password = PASSWORD;
      //     scope.onSignin();
      //     $httpBackend.flush();
      //     expect(scope.isUserCorrect).toBe(true);
      // }));
  });

});
