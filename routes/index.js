var express = require('express');
var router = express.Router();
var pjson = require('../package.json');

var title = 'Voxbone Widget Generator v' + pjson.version;
var docroot = process.env.DOCROOT || "http://0.0.0.0:3000/click2vox";

var Spreadsheet = require('edit-google-spreadsheet');

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

router.post('/rate', function(req, res, next){
  var formData = req.body;
  var result = { message: "", errors: null }

  Spreadsheet.load({
    // debug: true,
    spreadsheetName: process.env.SPREADSHEET_NAME,
    worksheetName: process.env.WORKSHEET_NAME || 'Sheet1',
    oauth2: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      refresh_token: process.env.REFRESH_TOKEN
    },
  }, function sheetReady(err, spreadsheet) {
      if(err) throw err;

      spreadsheet.receive(function(err, rows, info) {
        if(err) throw err;

        var addData = {}, nextLastRow = info.lastRow + 1;
        addData[nextLastRow] = [
          [
            new Date().toISOString(),
            req.body.rate,
            req.body.comment,
            req.body.url,
            req.body.did,
            req.body.callid,
          ]
        ];
        spreadsheet.add(addData);

        spreadsheet.send(function(err) {
          if(err) throw err;
        });
      });
  });

  res.json({ 'rated': Date.now(), 'version': pjson.version });
});


router

module.exports = router;
