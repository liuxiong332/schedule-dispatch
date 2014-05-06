'use strict';


angular.module('myApp.constants', []).
  constant('signinUrl', '/signin').
  constant('signupUrl', '/signup').
  constant('testUser.invalidSignup', {email: '1@1', password: '1'}).
  constant('testUser.validSignup', {email: '1@123', password: '1'}).
  constant('testUser.validSignin', {email: '1@123', password: '1'}).
  constant('testUser.notMatchSignin', {email: '1@123', password: '12'}).
  constant('testUser.notExistsSignin', {email: '1@1', password: '1'});
