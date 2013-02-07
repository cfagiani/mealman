'use strict';

/* Controllers */

function IngredientListController($scope, Ingredient) {  
  
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

function SourceListController($scope, Source) {  
  
  $scope.sources = Source.query();  
  
  $scope.open = function(item){
        if ($scope.isOpen(item)){
            $scope.source = undefined;
        } else {
            $scope.source = item;
        }        
    };
    
    $scope.isOpen = function(item){
        return $scope.source === item;
    };

     
    $scope.anyItemOpen = function() {
        return $scope.source !== undefined;
    };

  $scope.close = function() {
        $scope.source = undefined;
    };
}

function SourceController($scope, Source){ 
  $scope.update = function(data){    
    Source.update(data);
  }; 
}


