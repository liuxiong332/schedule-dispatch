'use strict';


angular.module('myApp.constants', []).
  constant('testUser', {
    invalidSignup: {email: '1@1', password: '1'},
    validSignup: {email: '1@123', password: '1'},
    validSignin: {email: '1@123', password: '1'},
    notMatchSignin: {email: '1@123', password: '12'},
    notExistsSignin: {email: '1@1', password: '1'},

    invalidSignupRespond: {isUserAvailable: false},
    validSignupRespond: {isUserAvailable: true},
    validSigninRespond: {isUserExists: true, isUserCorrect: true},
    notMatchSigninRespond: {isUserExists: true, isUserCorrect: false},
    notExistsSigninRespond: {isUserExists: false}
  });
