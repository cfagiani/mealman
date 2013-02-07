'use strict';

/* Controllers */

function IngredientListCtrl($scope, Ingredient) {  
  
  $scope.ingredients = Ingredient.query();  
  
  $scope.open = function(item){
        if ($scope.isOpen(item)){
            $scope.ingredient = undefined;
        } else {
            $scope.ingredient = item;
        }        
    };
    
    $scope.isOpen = function(item){
        return $scope.ingredient === item;
    };

     
    $scope.anyItemOpen = function() {
        return $scope.ingredient !== undefined;
    };

  $scope.close = function() {
        $scope.ingredient = undefined;
    };
}

function IngredientController($scope, Ingredient){
 
  $scope.update = function(data){    
    Ingredient.update(data);
  };
  
}

