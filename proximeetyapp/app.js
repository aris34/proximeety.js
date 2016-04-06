var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./models/db'),
    profile = require('./models/profiles'),
    clue = require('./models/clues'),
    connection = require('./models/connections'),
    message = require('./models/messages'),
    like = require('./models/likes'),
    achievement = require('./models/achievements');

var routes = require('./routes/index'),
    profiles = require('./routes/profiles'),
    clues = require('./routes/clues'),
    connections = require('./routes/connections'),
    messages = require('./routes/messages'),
    likes = require('./routes/likes'),
    achievements = require('./routes/achievements');

// Authentication module. 
var auth = require('http-auth');
var basic = auth.basic({
  realm: "Restricted to Tampere University of Technology researchers.",
  file: __dirname + "/htpasswd" // gevorg:gpass, Sarah:testpass ... 
});

var app = express();

console.log('app.js started.');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(auth.connect(basic));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/profiles', profiles);
app.use('/clues', clues);
app.use('/connections', connections);
app.use('/messages', messages);
app.use('/likes', likes);
app.use('/achievements', achievements);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
