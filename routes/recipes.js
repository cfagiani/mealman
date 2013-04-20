var models = require('../models');

//Recipes
app.get('/api/recipes/:userId', function (req, res) {
    if (req.query["term"] == undefined) {
        return models.RecipeModel.find({'owner': req.params.userId}, '_id title owner', function (err, recipes) {
            if (!err) {
                return res.send(recipes);
            } else {
                return console.log(err);
            }
        });
    }else {
        return models.RecipeModel.find({'title':{$regex:req.query['term']+".*",$options:'i'}, 'owner': req.params.userId},function (err, ingredients) {
            if (!err) {
                var results = [];
                ingredients.forEach(function(item){
                    results.push({'label':item.title,'value':item._id,'name':item.title,'_id':item._id});
                });
                return res.send(results);
            } else {
                return console.log(err);
            }
        });
    }
})
;

app.post('/api/recipes/:userId', function (req, res) {
    var recipe = new models.RecipeModel({
        title: req.body.title,
        owner: req.params.userId,
        notes: req.body.notes,
        ingredients: req.body.ingredients
    });
    recipe.save(function (err) {
        if (!err) {
            return console.log("created");
        } else {
            return console.log(err);
        }
    });
    return res.send(recipe);
});

app.get('/api/recipes/:userId/:id', function (req, res) {
    return models.RecipeModel.findById(req.params.id, function (err, recipe) {
        if (!err) {
            return res.send(recipe);
        } else {
            return console.log(err);
        }
    });
});

app.put('/api/recipes/:userId/:id', function (req, res) {
    return models.RecipeModel.findById(req.params.id, function (err, recipe) {
        recipe.title = req.body.title;
        recipe.owner = req.params.userId;
        recipe.notes = req.body.notes;
        recipe.ingredients = req.body.ingredients;

        return recipe.save(function (err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            return res.send(recipe);
        });

    });
});

app.delete('/api/recipes/:userId/:id', function (req, res) {
    return models.RecipeModel.findById(req.params.id, function (err, recipe) {
        return recipe.remove(function (err) {
            if (!err) {
                console.log("removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
});
