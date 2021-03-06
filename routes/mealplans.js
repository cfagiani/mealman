var models = require('../models');

//MealPlans
app.get('/api/mealplans/:userId', function (req, res) {
    return models.MealPlanModel.find({'owner': req.params.userId}, '_id title owner', function (err, recipes) {
        if (!err) {
            return res.send(recipes);
        } else {
            return console.log(err);
        }
    });
});

app.post('/api/mealplans/:userId', function (req, res) {
    var recipe = new models.MealPlanModel({
        title: req.body.title,
        owner: req.params.userId
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

app.get('/api/mealplans/:userId/:id', function (req, res) {
    return models.MealPlanModel.findById(req.params.id, function (err, recipe) {
        if (!err) {
            return res.send(recipe);
        } else {
            return console.log(err);
        }
    });
});

app.put('/api/mealplans/:userId/:id', function (req, res) {
    return models.MealPlanModel.findById(req.params.id, function (err, recipe) {
        recipe.title = req.body.title;
        recipe.owner = req.params.userId;

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

app.delete('/api/mealplans/:userId/:id', function (req, res) {
    return models.MealPlanModel.findById(req.params.id, function (err, recipe) {
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
