'use strict';

/* App Module */

angular.module('mealmanagerApp', ['mealmanagerServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/ingredients', {templateUrl: 'templates/ingredients.html',   controller: IngredientListController}).
      when('/sources', {templateUrl: 'templates/sources.html',   controller: SourceListController}).
      when('/recipes/:userId', {templateUrl: 'templates/recipes.html',   controller: RecipeListController}).
      when('/',{templateUrl:'templates/main.html'}).      
      otherwise({redirectTo: '/'});
}]);