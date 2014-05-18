'use strict';

/* Directives */


angular.module('myApp.directives', []).
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
  }).
  directive('onRoutechange', ['$route', function($route) {
    return {
      link: function(scope, elem, attrs) {
        scope.$on('$routeChangeSuccess', function onRouteChange() {
          scope.$eval(attrs.onRoutechange,
            {url: $route.current.originalPath});
        });
      }
    };
  }]).
  directive('buttonDisable', function() {
    return {
      link: function(scope, elem, attrs) {
        scope.$watch(attrs.buttonDisable, function(newValue) {
          if(newValue) {
            elem.attr('disabled', 'disabled');
          } else {
            elem.removeAttr('disabled');
          }
        });
      }
    }
  });
