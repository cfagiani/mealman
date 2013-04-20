'use strict';

/* Controllers */

function IngredientListController($scope, Ingredient) {

    $scope.ingredients = Ingredient.query();

    $scope.open = function (item) {
        if ($scope.isOpen(item)) {
            $scope.ingredient = undefined;
        } else {
            $scope.ingredient = item;
        }
    };

    $scope.isOpen = function (item) {
        return $scope.ingredient === item;
    };


    $scope.anyItemOpen = function () {
        return $scope.ingredient != undefined;
    };

    $scope.close = function () {
        $scope.ingredient = undefined;
    };
}

function IngredientController($scope, Ingredient, Source) {
    $scope.sources = Source.query();

    $scope.save = function (data) {
        if (data._id == null) {
            $scope.ingredients.push(Ingredient.save(data));
        } else {
            Ingredient.update(data);
        }
    };


}

function SourceListController($scope, Source) {

    $scope.sources = Source.query();

    $scope.open = function (item) {
        if ($scope.isOpen(item)) {
            $scope.source = undefined;
        } else if (item != null) {
            $scope.source = item;
        }
    };

    $scope.isOpen = function (item) {
        if (item != null) {
            return $scope.source === item;
        } else {
            return false;
        }
    };


    $scope.anyItemOpen = function () {
        return $scope.source != undefined;
    };

    $scope.close = function () {
        $scope.source = undefined;
    };
}

function SourceController($scope, Source) {
    $scope.save = function (data) {
        if (data._id == null) {
            $scope.sources.push(Source.save(data));
        } else {
            Source.update(data);
        }
    };

    $scope.remove = function (data) {
        if (data._id != null) {
            Source.remove({sourceId: data._id});
            $scope.source = undefined;
        } else {
            $scope.source = undefined;
        }
    };
}

function RecipeListController($scope, Recipe) {
    $scope.recipes = Recipe.query();

    $scope.open = function (item) {
        if ($scope.isOpen(item)) {
            $scope.recipe = undefined;
        } else {
            $scope.recipe = item;
        }
    };

    $scope.isOpen = function (item) {
        if ($scope.recipe != null && item != null) {
            return $scope.recipe._id == item._id;
        } else {
            return false;
        }
    };

    $scope.anyItemOpen = function () {
        return $scope.recipe != undefined;
    };

    $scope.close = function () {
        $scope.recipe = undefined;
    };
}

function RecipeController($scope, Recipe, $routeParams) {

    if ($scope.recipe != null && $scope.recipe._id != null) {
        $scope.recipe = Recipe.find({recipeId: $scope.recipe._id, userId: $routeParams.userId});
    }

    $scope.disableAdd = function () {
        if ($scope.selection == null || $scope.selection == undefined) {
            return true;
        } else if ($scope.ingredient == undefined || $scope.ingredient.qty == undefined || $scope.ingredient.qty == null || $scope.ingredient.qty <= 0) {
            return true;
        } else {
            return false;
        }
    }


    $scope.save = function (data) {
        if (data._id == null) {
            $scope.recipes.push(Recipe.save(data));
        } else {
            Recipe.update(data);
        }
    };

    $scope.remove = function (data) {
        if (data._id != null) {
            Recipe.remove({recipeId: data._id});
            $scope.recipe = undefined;
        } else {
            $scope.recipe = undefined;
        }
    };


    $scope.addIngredient = function (data) {
        if (!$scope.disableAdd()) {
            $scope.selection.quantity = $scope.ingredient.qty;
            if ($scope.recipe.ingredients == undefined) {
                $scope.recipe.ingredients = [];
            }
            $scope.recipe.ingredients.push($scope.selection);
            $scope.ingredient = undefined;
        }
    }

    $scope.removeIngredient = function (data) {
        var idx = $scope.recipe.ingredients.indexOf(data);
        $scope.recipe.ingredients.splice(idx, 1);
    }


}


function MealPlanListController($scope, $location, $routeParams, MealPlan) {
    $scope.mealPlans = MealPlan.query();

    $scope.open = function (item) {
        if ($scope.isOpen(item)) {
            $scope.mealPlan = undefined;
        } else {
            $scope.mealPlan = item;
        }
        var id = "new";
        if(item != undefined && item._id != undefined && item._id != null){
            id = item._id;
        }
        $location.path('/mealplan/'+$routeParams.userId+'/'+id);
    };

    $scope.isOpen = function (item) {
        if ($scope.mealPlan != null && item != null) {
            return $scope.mealPlan._id == item._id;
        } else {
            return false;
        }
    };

    $scope.anyItemOpen = function () {
        return $scope.mealPlan != undefined;
    };

    $scope.close = function () {
        $scope.mealPlan = undefined;
    };

}

function MealPlanController($scope, MealPlan, $routeParams, $location) {

    if ($scope.mealPlan == undefined || $scope.mealPlan == null) {
        if($routeParams.mealPlanId != 'new'){
            $scope.mealPlan = MealPlan.find({mealPlanId: $routeParams.mealPlanId, userId: $routeParams.userId});
        }
    }

    $scope.disableAdd = function () {
        if ($scope.selection == null || $scope.selection == undefined) {
            return true;
        } else if ($scope.ingredient == undefined || $scope.ingredient.qty == undefined || $scope.ingredient.qty == null || $scope.ingredient.qty <= 0) {
            return true;
        } else {
            return false;
        }
    }


    $scope.save = function (data) {
        if (data._id == null || data._id == 'new') {
            MealPlan.save(data);
        } else {
            MealPlan.update(data);
        }
        $location.path('/mealplans/'+$routeParams.userId);
    };

    $scope.remove = function (data) {
        if (data._id != null) {
            MealPlan.remove({mealPlanId: data._id});
            $scope.mealPlan = undefined;
        } else {
            $scope.mealPlan = undefined;
        }
    };


    $scope.addIngredient = function (data) {
        if (!$scope.disableAdd()) {
            $scope.selection.quantity = $scope.ingredient.qty;
            if ($scope.mealPlan.ingredientsOnHand == undefined) {
                $scope.mealPlan.ingredientsOnHand = [];
            }
            $scope.mealPlan.ingredientsOnHand.push($scope.selection);
            $scope.ingredient = undefined;
        }
    }

    $scope.removeIngredient = function (data) {
        var idx = $scope.mealPlan.ingredientsOnHand.indexOf(data);
        $scope.mealPlan.ingredientsOnHand.splice(idx, 1);
    }


}


