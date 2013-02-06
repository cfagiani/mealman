'use strict';

/* Services */

angular.module('mealmanagerServices', ['ngResource']).
    factory('Ingredient', function($resource){
  return $resource('api/ingredients', {}, {
    query: {method:'GET',  isArray:true}
  });
});