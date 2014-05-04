'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('passwordVerify', function() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        function Validate() {
          if(!scope.passwordVerification || !scope.password ||
            scope.passwordVerification === scope.password) {
            ctrl.$setValidity('passwordVerify', true);
          } else {
            ctrl.$setValidity('passwordVerify', false);
          }
        }

        scope.$watch('password', Validate);
        scope.$watch('passwordVerification', Validate);
      }
    };
  });
