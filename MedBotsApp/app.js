var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util     = require("util");

var routes = require('./routes/index');
var users = require('./routes/users');
var drugs = require('./routes/drugs');
var fhir = require('./routes/fhir');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/views/login.html'));
});

//app.get('/', function(req,res){
	//res.sendFile(path.join(__dirname+'/views/index.html'));
//});


app.get('/tables.html', function(req,res){
	res.sendFile(path.join(__dirname+'/views/tables.html'));
});
app.get('/forms.html', function(req,res){
	res.sendFile(path.join(__dirname+'/views/forms.html'));
});
app.get('/bootstrap-elements.html', function(req,res){
	res.sendFile(path.join(__dirname+'/views/bootstrap-elements.html'));
});
app.get('/bootstrap-grid.html', function(req,res){
	res.sendFile(path.join(__dirname+'/views/bootstrap-grid.html'));
});
app.get('/blank-page.html', function(req,res){
	res.sendFile(path.join(__dirname+'/views/blank-page.html'));
});
app.get('/charts.html', function(req,res){
	res.sendFile(path.join(__dirname+'/views/charts.html'));
});
app.get('/index.html', function(req,res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.get('/login.html', function(req,res){
    res.sendFile(path.join(__dirname+'/views/login.html'));
});

app.get('/recommendation.html', function(req,res){
    res.sendFile(path.join(__dirname+'/views/recommendation.html'));
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/drugs', drugs);
app.use('/fhir', fhir);


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.message);
  /**
  res.render('error', {
    message: err.message,
    error: {}
  });
   **/

});

var httpServer = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
httpServer.listen(app.get('port'));

module.exports = app;
