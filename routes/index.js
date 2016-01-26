var express = require('express');
var router = express.Router();
var title = 'Voxbone Widget Generator 1.0';
var docroot = "http://127.0.0.1:3000/click2vox";

router.get('/', function(req, res, next) {
  res.render('generator', { title: title, request: req, docRoot: docroot });
});

router.get('/widget', function(req, res, next) {
  res.render('widgetwrap', { title: title, request: req, docRoot: docroot, pretty: true });
});

module.exports = router;
