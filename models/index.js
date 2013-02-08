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

var SourceSchema = new Schema({  
    name: {type: String, required:true},
    addr1: String,
    addr2: String,
    city: String,
    state: String,
    postalCode: String,
    phone: String       
});

var RecipeSchema = new Schema({      
    title: { type: String, required: true },
    owner: ObjectId,  
    notes: String,
    ingredients: {type:[{ingredientId:ObjectId,quantity:Number}], required: false}
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
module.exports.MealPlanModel = mongoose.model('MealPlan',MealPlanSchema);
module.exports.SourceModel = mongoose.model('Source',SourceSchema);

