var express = require('express');
var router = express.Router();
var pjson = require('../package.json');

var title = 'Voxbone Widget Generator v' + pjson.version;

// FAQ & Known issues documents
router.get('/faq', function (req, res, next) {
  res.render('faq');
});

router.get('/known-issues', function (req, res, next) {
  res.render('known_issues');
});

router.get('/ping', function(req, res, next){
  res.json({ 'ping': Date.now(), 'version': pjson.version });
});

module.exports = router;
