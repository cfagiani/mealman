'use strict';

/* Controllers */

function IngredientListCtrl($scope, Ingredient) {
  $scope.ingredients = Ingredient.query();  
}

