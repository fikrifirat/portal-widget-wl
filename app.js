var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var minifier = require('minifier');
var params = require('strong-params');

var app = express();

// Use the session middleware
app.use(session({
  secret: process.env.SECRET || 'super_secret_key',
  resave: false,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// keeping this as legacy support
app.use('/click2vox', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(params.expressMiddleware());

var routes = require('./routes/index');
var utils = require('./routes/utils');
var widgetRoutes = require('./routes/widget').router;

app.use('/click2vox/', routes);
app.use('/click2vox/', widgetRoutes);
app.use('/widget/', widgetRoutes);

// This is indented to get the latest version always
app.use(utils.click2voxJsFileName, function(req, res) {
  res.redirect('/javascripts/click2vox-1.5.0.js');
});

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

app.locals.docroot = process.env.APP_URL;

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
  "//webrtc.voxbone.com/js/jssip-0.7.9.min-vox.js",
  "//webrtc.voxbone.com/js/voxbone-0.0.5.js"
  // "//webrtc.voxbone.com/js/voxbone-latest.js"
];

app.locals.click2voxScripts = [
  app.locals.docroot+"/javascripts/widget-0.4.js"
];

app.locals.globalCss = [
  '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
  app.locals.docroot+"/stylesheets/root.css",
  app.locals.docroot+"/stylesheets/widget-0.4.css"
];

module.exports = app;

// minifier.minify(app.locals.click2voxScripts, {template: 'widget.min.js'});
