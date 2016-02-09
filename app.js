var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var minifier = require('minifier');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var routes = require('./routes/index');

app.use('/click2vox', express.static(path.join(__dirname, 'public')));

app.use('/click2vox/', routes);

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

app.locals.docroot = process.env.DOCROOT || "http://0.0.0.0:3000/click2vox";

app.locals.globalScripts = [
  '//ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js',
  '//cdnjs.cloudflare.com/ajax/libs/raty/2.7.0/jquery.raty.min.js',
  '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
  '//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js',
  '//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-cookies.min.js',
  '//cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js',
  '//cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.5/clipboard.min.js'
];

app.locals.voxboneScripts = [
  "public/javascripts/jssip-0.7.9-vox.js",
  "public/javascripts/voxbone-0.0.4.js",
  "public/javascripts/widget-0.3.js"
];

app.locals.globalCss = [
  '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
  app.locals.docroot+"/stylesheets/root.css",
  app.locals.docroot+"/stylesheets/widget.css"
];

module.exports = app;

minifier.minify(app.locals.voxboneScripts, {template: 'widget.min.js'});
