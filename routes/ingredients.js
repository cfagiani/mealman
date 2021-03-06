var models = require('../models');
var mongoose = require('mongoose');


//Ingredients
app.get('/api/ingredients', function (req, res) {
    if (req.query["term"] == undefined) {
        return models.IngredientModel.find(function (err, ingredients) {
            if (!err) {
                return res.send(ingredients);
            } else {
                return console.log(err);
            }
        });
    }else {
        return models.IngredientModel.find({'name':{$regex:req.query['term']+".*",$options:'i'}},function (err, ingredients) {
            if (!err) {
                var results = [];
                ingredients.forEach(function(item){
                    results.push({'label':item.name,'value':item._id,'name':item.name,'_id':item._id, 'measureType':item.measureType});
                });
                return res.send(results);
            } else {
                return console.log(err);
            }
        });
    }
})
;

app.post('/api/ingredients', function (req, res) {
    var ingredient = new models.IngredientModel({
        name: req.body.name,
        measureType: req.body.measureType,
        preferredSourceId: mongoose.Types.ObjectId(req.body.preferredSourceId)

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

app.get('/api/ingredients/:id', function (req, res) {
    return models.IngredientModel.findById(req.params.id, function (err, ingredient) {
        if (!err) {
            return res.send(ingredient);
        } else {
            return console.log(err);
        }
    });
});

app.put('/api/ingredients/:id', function (req, res) {
    return models.IngredientModel.findById(req.params.id, function (err, ingredient) {
        ingredient.name = req.body.name;
        ingredient.measureType = req.body.measureType;
        ingredient.preferredSourceId = mongoose.Types.ObjectId(req.body.preferredSourceId);

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

app.delete('/api/ingredients/:id', function (req, res) {
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
