'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('ngCookies'));
  beforeEach(angular.mock.module('myApp.controllers'));

  it('should active the specific menu item', inject(
    function($httpBackend, $cookies, $controller) {
    var scope = {};
    var myCtrl1 = $controller('logupControl',
      {$scope: scope});
    expect(myCtrl1).toBeDefined();
    scope.onMenuClick();
    expect(scope.isLoginActive).toBe(false);
    expect(scope.isLogupActive).toBe(true);

    scope.onMenuClick();
    expect(scope.isLoginActive).toBe(true);
    expect(scope.isLogupActive).toBe(false);
  }));
});
