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
});
