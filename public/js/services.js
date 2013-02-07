'use strict';

/* Services */

angular.module('mealmanagerServices', ['ngResource']).
factory('Ingredient', function($resource) {
  return $resource('api/ingredients/:ingredientId', {ingredientId: '@_id'}, {
    query : {
      method : 'GET',
      isArray : true,
      
    },
    update : {
      method: 'PUT'      
    },
    create: {
      method: 'POST'    
    }    
  });
}); 