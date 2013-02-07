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
        } else if(item != null) {          
            $scope.source = item;        
        }  
    };
    
    $scope.isOpen = function(item){
        if(item != null ){
          return $scope.source === item;
        }else{
          return false;
        }
    };

     
    $scope.anyItemOpen = function() {       
        return $scope.source !== undefined;
    };

  $scope.close = function() {
        $scope.source = undefined;
    };
}

function SourceController($scope, Source){ 
  $scope.save = function(data){   
    if(data._id == null){
      $scope.sources.push(Source.save(data));
    }else{
      Source.update(data);
    }      
  }; 
}


