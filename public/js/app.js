'use strict';

/* App Module */

angular.module('mealmanagerApp', ['mealmanagerServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/ingredients', {templateUrl: 'templates/ingredients.html',   controller: IngredientListController}).
      when('/sources', {templateUrl: 'templates/sources.html',   controller: SourceListController}).
      when('/recipes', {templateUrl: 'templates/recipelist.html',   controller: RecipeListController}).
      when('/recipes/:userId/:recipeId', {templateUrl: 'templates/recipe.html',   controller: RecipeController}).
      when('/',{templateUrl:'templates/main.html'}).      
      otherwise({redirectTo: '/'});
}]);