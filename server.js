var express = require('express');
//purposely defined as global so "app"
app = express();

var path = require('path');
var application_root = __dirname;



app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  express.logger('dev');
  app.use(express.static(path.join(application_root, "public")));  
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


require('./routes');
require('./tests');
var models = require('./models');


//TODO: make port config driven
app.listen(3000);
console.log('Server started on port 3000');
