var express = require('express');
var router = express.Router();
var pjson = require('../package.json');
var utils = require('./utils');

var title = 'Voxbone Widget Generator v' + pjson.version;

// This is indented to get the latest version always
router.get(utils.click2voxJsFileName, function(req, res) {
  res.redirect(process.env.APP_URL + '/javascripts/click2vox-1.5.0.js');
});

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
