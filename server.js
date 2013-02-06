var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var application_root = __dirname;

//TODO: externalize db config
mongoose.connect('mongodb://localhost/mealman_database');


app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));  
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

var ObjectId = mongoose.Schema.Types.ObjectId;

//DB Schema Creation
//TODO: consider relocating to another file

var Schema = mongoose.Schema;  

var UserSchema =  new Schema({  
  username: {type: String, required:true}       
});

var IngredientSchema = new Schema({  
  name: {type: String, required:true},  
  measureType: String    
});

var RecipeSchema = new Schema({      
    title: { type: String, required: true },
    owner: String,  
    notes: String,
    ingredients: [{ingredientId:ObjectId,quantity:Number}]
});

var MealPlanSchema = new Schema({    
    owner: String,
    recipies: [RecipeSchema],
    ingredientsOnHand:[{ingredientId:ObjectId,quantity:Number}]
});

//Mongoose Model Initialization
var UserModel = mongoose.model('User',UserSchema);
var IngredientModel = mongoose.model('Ingredient',IngredientSchema);
var RecipeModel = mongoose.model('Recipe',RecipeSchema);
var MealPlanModel = mongoose.model('MealPlan',MealPlanSchema)


//API Routes
app.get('/api/status', function(req, res){
    res.send('Mealman API Is Running');
});


//Ingredients
app.get('/api/ingredients', function (req, res){
  return IngredientModel.find(function (err, ingredients) {
    if (!err) {
      return res.send(ingredients);
    } else {
      return console.log(err);
    }
  });
});

app.post('/api/ingredients', function (req, res){  
  console.log("POST: ");
  console.log(req.body);
  var ingredient = new IngredientModel({
    name: req.body.name,
    measureType: req.body.measureType        
  });
  ingredient.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(ingredient);
});

app.get('/api/ingredients/:id', function (req, res){
  return IngredientModel.findById(req.params.id, function (err, ingredient) {
    if (!err) {
      return res.send(ingredient);
    } else {
      return console.log(err);
    }
  });
});

app.put('/api/ingredients/:id', function (req, res){
  return IngredientModel.findById(req.params.id, function (err, ingredient) {
    name: req.body.name;
    measureType: req.body.measureType;
    return ingredient.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(ingredient);
    });
  });
});

app.delete('/api/ingredients/:id', function (req, res){
  return IngredientModel.findById(req.params.id, function (err, ingredient) {
    return ingredient.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

//TODO: make port config driven
app.listen(3000);
console.log('Server started on port 3000');
