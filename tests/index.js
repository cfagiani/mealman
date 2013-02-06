var models = require('../models');


app.get('/test/ingredients/:name', function (req, res){  
  
  var ingredient = new models.IngredientModel({
    name: req.params.name,
    measureType: 'testtype'        
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