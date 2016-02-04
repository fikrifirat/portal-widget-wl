var express = require('express');
var router = express.Router();
var title = 'Voxbone Widget Generator 1.0';
var docroot = process.env.DOCROOT || "http://0.0.0.0:3000/click2vox/";
var pjson = require('../package.json');

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
