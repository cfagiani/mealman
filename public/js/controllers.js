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
        return $scope.ingredient != undefined;
    };

  $scope.close = function() {
        $scope.ingredient = undefined;
    };
}

function IngredientController($scope, Ingredient){ 
  $scope.save = function(data){    
    if(data._id == null){
      $scope.ingredients.push(Ingredient.save(data));
    }else{
      Ingredient.update(data);
    }      
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
        return $scope.source != undefined;
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
  
  $scope.remove = function(data){
    if(data._id != null){
      Source.remove({sourceId:data._id});
      $scope.source = undefined;      
    }else{
      $scope.source = undefined;
    }    
  };
}

function RecipeListController($scope, Recipe) {    
  $scope.recipes = Recipe.query();    
  
  $scope.open = function(item){
        if ($scope.isOpen(item)){
            $scope.recipe = undefined;
        } else {
            $scope.recipe = item;
        }        
    };
    
    $scope.isOpen = function(item){
		if($scope.recipe != null && item !=null){
    		return $scope.recipe._id == item._id;
		}else{
    		return false;
    	}
    };
     
    $scope.anyItemOpen = function() {       
       return $scope.recipe != undefined;
    };

   $scope.close = function() {
        $scope.recipe = undefined;
    };
}

function RecipeController($scope, Recipe, $routeParams){
	if($scope.recipe != null && $scope.recipe._id != null){ 
		$scope.recipe = Recipe.find({recipeId:$scope.recipe._id, userId:$routeParams.userId});
	}
	
  $scope.save = function(data){  	  	   
    if(data._id == null){
      $scope.recipes.push(Recipe.save(data));
    }else{
      Recipe.update(data);
    }       	  
  }; 
  
  $scope.remove = function(data){
    if(data._id != null){
      Recipe.remove({recipeId:data._id});
      $scope.recipe = undefined;      
    }else{
      $scope.recipe = undefined;
    }    
  };
}


