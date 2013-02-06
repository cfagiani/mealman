var mongoose = require('mongoose');

//TODO: externalize db config
mongoose.connect('mongodb://localhost/mealman_database');

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
module.exports.UserModel = mongoose.model('User',UserSchema);
module.exports.IngredientModel = mongoose.model('Ingredient',IngredientSchema);
module.exports.RecipeModel = mongoose.model('Recipe',RecipeSchema);
module.exports.MealPlanModel = mongoose.model('MealPlan',MealPlanSchema)

