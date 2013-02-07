var models = require('../models');

//Sources (Stores) for Ingredients
app.get('/api/sources', function (req, res){
  return models.SourceModel.find(function (err, sources) {
    if (!err) {
      return res.send(sources);
    } else {
      return console.log(err);
    }
  });
});

app.post('/api/sources', function (req, res){  
  var source = new models.SourceModel({
    name: req.body.name,
    addr1: req.body.addr1,
    addr2: req.body.addr2,
    city: req.body.city,
    state: req.body.state,
    phone: req.body.phone        
  });
  source.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(source);
});

app.get('/api/sources/:id', function (req, res){
  return models.SourceModel.findById(req.params.id, function (err, source) {
    if (!err) {
      return res.send(source);
    } else {
      return console.log(err);
    }
  });
});

app.put('/api/sources/:id', function (req, res){  
  return models.SourceModel.findById(req.params.id, function (err, source) {        
    source.name= req.body.name;
    source.addr1= req.body.addr1;
    source.addr2= req.body.addr2;
    source.city= req.body.city;
    source.state= req.body.state;
    source.phone= req.body.phone;
         
    return source.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(source);
    });
  });
});

app.delete('/api/sources/:id', function (req, res){
  return models.SourceModel.findById(req.params.id, function (err, source) {
    return source.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});
