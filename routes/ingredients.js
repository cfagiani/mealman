var models = require('../models');

//Ingredients
app.get('/api/ingredients', function (req, res){
  return models.IngredientModel.find(function (err, ingredients) {
    if (!err) {
      return res.send(ingredients);
    } else {
      return console.log(err);
    }
  });
});

app.post('/api/ingredients', function (req, res){  
  var ingredient = new models.IngredientModel({
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
  return models.IngredientModel.findById(req.params.id, function (err, ingredient) {
    if (!err) {
      return res.send(ingredient);
    } else {
      return console.log(err);
    }
  });
});

app.put('/api/ingredients/:id', function (req, res){
  return models.IngredientModel.findById(req.params.id, function (err, ingredient) {
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
  return models.IngredientModel.findById(req.params.id, function (err, ingredient) {
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
