'use strict';

/* Services */

angular.module('mealmanagerServices', ['ngResource']).
factory('Ingredient', function($resource) {
  return $resource('api/ingredients/:ingredientId', {ingredientId: '@_id'}, {
    query : {
      method : 'GET',
      isArray : true      
    },
    update : {
      method: 'PUT'      
    },
    create: {
      method: 'POST'    
    }    
  });
}).
factory('Source', function($resource) {
  return $resource('api/sources/:sourceId', {sourceId: '@_id'}, {
    query : {
      method : 'GET',
      isArray : true      
    },
    update : {
      method: 'PUT'      
    },
    create: {
      method: 'POST'    
    },
    remove: {
      method: 'DELETE'      
    }
      
  });
}).
factory('Recipe', function($resource) {
	//TODO: remove hard-coded UserId and use id from cookie once that is set up
  return $resource('api/recipes/:userId/:recipeId', {recipeId: '@_id', userId:'5115498739dd85582b000005'}, {
    query : {
      method : 'GET',
      isArray : true      
    },
    find : {
    	method : 'GET'    	
    },
    update : {
      method: 'PUT'      
    },
    create: {
      method: 'POST'    
    },
    remove: {
      method: 'DELETE'      
    }
      
  });
})
; 