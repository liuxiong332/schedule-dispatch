'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'));

  it('should active the specific menu item', inject(
    function($controller) {
    var scope = {};
    var cookies = {};
    var myCtrl1 = $controller('identifyControl',
      {$scope: scope, $cookies: cookies});
    expect(myCtrl1).toBeDefined();

    expect(scope.isSigninActive).toBe(true);
    expect(scope.isSignupActive).toBe(false);

    scope.onMenuClick();
    expect(scope.isSigninActive).toBe(false);
    expect(scope.isSignupActive).toBe(true);

    scope.onMenuClick();
    expect(scope.isSigninActive).toBe(true);
    expect(scope.isSignupActive).toBe(false);
  }));

  it('should get the userName', inject(function($controller) {
    var scope = {};
    var logupControl = $controller('identifyControl',
      {$scope: scope, $cookies: {}});

    expect(scope.userName).toBeFalsy();
    expect(scope.isUserExists).toBe(false);

    var USER_NAME = "good";
    var cookies = {userName: USER_NAME};
    logupControl = $controller('identifyControl',
      {$scope: scope, $cookies:cookies});
    expect(scope.userName).toMatch(USER_NAME);
    expect(scope.isUserExists).toBe(true);
  }));
});
