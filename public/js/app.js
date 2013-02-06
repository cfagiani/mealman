'use strict';

/* App Module */

angular.module('mealmanagerApp', ['mealmanagerServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/ingredients', {templateUrl: 'templates/ingredient-list.html',   controller: IngredientListCtrl}).
      when('/',{templateUrl:'templates/main.html'}).      
      otherwise({redirectTo: '/ingredients'});
}]);