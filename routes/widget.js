// This module is to put all the functionality related to
// Widgets management

var express = require('express');
var router = express.Router();

var pjson = require('../package.json');
var title = 'Voxbone Widget Generator v' + pjson.version;

var async = require('async');
var _ = require('lodash');

var utils = require('./utils');

var PERMITTED_FIELDS = [
  'configuration_name', 'button_color', 'frame_color', 'button_label', 'button_style',
  'background_style', 'sip_uri', 'caller_id', 'context',
  'dial_pad', 'send_digits', 'hide_widget', 'updated_at',
  'link_button_to_a_page', 'show_text_html',
  'incompatible_browser_configuration', 'new_sip_uri',
  'show_frame', 'test_setup', 'rating', 'server_auth_url'
];

var portalHandler = function(req, res, next) {
  var params = req.parameters.all();
  var required = ['e164', 'login', 'password', 'basic_auth'];

  if (Object.keys(params).length === 0 && req.session.params)
    params = req.session.params;
  else
    req.session.params = params;

  // check if required params are present
  var reqCheck = _.filter(required, function(n) {
    return params[n] !== undefined;
  });

  if (reqCheck.length < 4)
    return utils.objectNotFound(res, req, next);

  var fakeWidget = {
    id: utils.uuid4(),
    did: params.e164,
    sip_uri: 'echo@ivrs', // this is just a placeholder. we should remove it
    rating: true,
    dial_pad: true,
    show_frame: true,
    show_branding: true,
    test_setup: true,
    webrtc_username: params.login,
    webrtc_password: params.password,
    basic_auth: params.basic_auth
  };
  var result = {
    widget: fakeWidget,
    params: params,
    hideIframeTab: true
  };

  result.defaultBtnLabel = utils.defaultBtnLabel;
  result.widget_code = utils.widgetDivHtmlCode(fakeWidget, params.e164);
  result.title = title;
  res.render('widget/portal-widget', result);
};

router.get('/', portalHandler);
router.post('/', portalHandler);

router.post('/portal-widget/get-code', function(req, res, next) {
  var result = {};
  var params = req.parameters;

  _.each(['did', 'show_branding', 'webrtc_username', 'webrtc_password', 'basic_auth'], function (n) {
    PERMITTED_FIELDS.push(n);
  });

  var widgetData = params
    .merge({updated_at: new Date()})
    .permit(PERMITTED_FIELDS);

  try {
    result.widget_code = utils.widgetDivHtmlCode(widgetData, widgetData.did);
    return res.json(result);
  } catch (e) {
    return res.status(500).json({
      msg: 'Something went wrong while generating code!', err: e
    });
  }
});

router.post('/portal-widget/get-html', function(req, res, next){
  var result = {};
  var widget = JSON.parse(req.parameters.widget);
  console.log(widget);
  var params = req.parameters;

  _.each(['did', 'show_branding', 'webrtc_username', 'webrtc_password', 'basic_auth'], function (n) {
    PERMITTED_FIELDS.push(n);
  });

  var widgetData = params
    .merge({updated_at: new Date()})
    .permit(PERMITTED_FIELDS);

  try {
    result.widget_code = utils.widgetDivHtmlCode(widget, widget.did);
    console.log(result);
    res.render('widget/widget_html', result);

  } catch (e) {
    return res.status(500).json({
      msg: 'Something went wrong while generating code!', err: e
    });
  }

});

module.exports = {
  router: router,
  portalHandler: portalHandler
};
