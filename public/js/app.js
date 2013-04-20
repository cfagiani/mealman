'use strict';

/* App Module */

angular.module('mealmanagerApp', ['mealmanagerServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/ingredients', {templateUrl: 'templates/ingredients.html',   controller: IngredientListController}).
      when('/sources', {templateUrl: 'templates/sources.html',   controller: SourceListController}).
      when('/recipes/:userId', {templateUrl: 'templates/recipes.html',   controller: RecipeListController}).
      when('/about', {templateUrl:'templates/about.html'}).
      when('/mealplans/:userId', {templateUrl:'templates/mealplans.html', controller:MealPlanListController}).
      when('/mealplan/:userId/:mealPlanId', {templateUrl:'templates/mealplan.html', controller:MealPlanController}).
      when('/',{templateUrl:'templates/main.html'}).      
      otherwise({redirectTo: '/'});
}]).
    directive('autocomplete',function() {
        return {
            restrict: 'A',
            link: function postLink(scope, elem, attr){
                elem.autocomplete({
                    source: attr.autocomplete,
                    minLength: 2,
                    select: function(event, ui){
                        scope.$eval(attr.modelname).name =ui.item.label;
                        scope.selection=ui.item;
                        scope.$digest();
                        return false;
                    },
                    focus: function(event, ui){
                        scope.$eval(attr.modelname).name =ui.item.label;
                        scope.selection=ui.item;
                        scope.$digest();
                        return false;
                    }
                });
            }
        };
    });