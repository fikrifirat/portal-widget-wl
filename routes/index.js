var express = require('express');
var router = express.Router();
var pjson = require('../package.json');

var title = 'Voxbone Widget Generator v' + pjson.version;
var docroot = process.env.DOCROOT;

router.get('/', function(req, res, next) {
  res.render('generator', { title: title, request: req, docRoot: docroot });
});

router.post('/', function(req, res, next) {
  req.query = req.body;
  res.render('generator', { title: title, request: req, docRoot: docroot });
});

router.get('/widget', function(req, res, next) {
  res.render('widgetwrap', { title: title, request: req, docRoot: docroot, pretty: true });
});

router.post('/widget', function(req, res, next) {
  req.query = req.body;
  res.render('widgetwrap', { title: title, request: req, docRoot: docroot, pretty: true });
});

router.get('/ping', function(req, res, next){
  res.json({ 'ping': Date.now(), 'version': pjson.version });
});

module.exports = router;
