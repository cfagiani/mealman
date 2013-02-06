var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var application_root = __dirname;

//TODO: externalize db config
//mongoose.connect('mongodb://localhost/mealman_database');



app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));  
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


//DB Schema Creation
//TODO: consider relocating to another file
var Schema = mongoose.Schema;  

var UserSchema =  new Schema({
  id: {type: String, required:true},
  username: {type: String, required:true}       
});

var IngredientSchema = new Schema({
  id: {type: String, required:true},
  name: {type: String, required:true},  
  measureType: String    
});


var RecipeSchema = new Schema({  
    id: {type: String, required:true},
    title: { type: String, required: true },
    owner: String,  
    notes: String,
    ingredients: [{ingredientId:String,quantity:Number}]
});


var MealPlanSchema = new Schema({
    id: {type: String, required:true},
    owner: String,
    recipies: [RecipeSchema],
    ingredientsOnHand:[{ingredientId:String,quantity:Number}]
});

//API Routes
app.get('/api/status', function(req, res){
    res.send('Mealman API Is Running');
});


//TODO: make port config driven
app.listen(3000);
console.log('Server started on port 3000');
