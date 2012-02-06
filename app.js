/**
 * Module dependencies.
 */
var express = require('express'),
     routes = require('./routes/index.js'),
        api = require('./routes/api.js'),
       conf = require('./conf.json');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: conf.secret }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', routes.index);
app.post('/add', routes.add);
app.get('/bin/:id', routes.bin);
app.get('/api/add', api.add);

app.listen(conf.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
