define([
    'controllers/widget.mixin',
    'jquery',
    'clipboard',
    'bootstrap'
  ], function (WidgetMixin, $, Clipboard) {

  var WidgetEditController = function ($scope, $http, $window, $controller, $cookies, $analytics) {
    // let's extend from the mixin first of all
    angular.extend(this, $controller(WidgetMixin, {$scope: $scope}));

    $scope.preview_webrtc_compatible = true;
    $scope.previewButton = true;
    $scope.previewDialpad = true;
    $scope.previewFullScreen = true;
    $scope.previewMute = false;
    $scope.widgetCode = 'Generating widget code...';
    $scope.tempButtonColor = "";
    $scope.tempFrameColor = "";

    $scope.master = {
      showWidgetCode: true,
      dial_pad: true,
      button_style: 'style-a',
      frame_color: '',
      background_style: 'dark',
      show_text_html_value: '<h3>This is a placeholder for your message</h3>',
      incompatible_browser_configuration: 'hide_widget',
      shouldProvision: false
    };

    $scope.prepareHtmlForCodepen = function (data) {
      return data.replace(/"/g, "'");
    };

    $scope.reset = function (form) {
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }

      $scope.widget = angular.copy($scope.master);
    };

    $scope.init = function () {
      $scope.wirePluginAndEvents();
    };

    $scope.loadWidgetData = function () {
      var data = $scope.initData;
      var savedWidget = $cookies.getObject('widget');

      $scope.widget = angular.extend({}, $scope.widget, $scope.master, data.widget, savedWidget);
      $scope.widgetCode = data.widgetCode;
      $scope.widget.did = $scope.did = data.did;
      $scope.widget.link_button_to_a_page_value = $scope.widget.link_button_to_a_page;
      $scope.widget.show_text_html_value = $scope.widget.show_text_html;

      var ibc = $scope.widget.incompatible_browser_configuration;

      if (ibc === 'hide_widget')
        $scope.widget.hide_widget = true;
      else if (ibc === 'link_button_to_a_page')
        $scope.widget.link_button_to_a_page = true;
      else if (ibc === 'show_text_html')
        $scope.widget.show_text_html = true;

      var current_date = new Date().toISOString();
      var tracked_label = 'date: ' + current_date + ' user: ' + data.username + ' did: ' + data.did;
      $analytics.eventTrack('Landed User', { category: 'Landed User', label: tracked_label });
    };

    // watch for initial widget data
    $scope.$watch('initData', $scope.loadWidgetData);

    $scope.isWebRTCSupported = function () {
      return voxbone.WebRTC.isWebRTCSupported();
    };

    $scope.showCallButton = function () {
      var ibc_value = $scope.widget.incompatible_browser_configuration;
      return $scope.preview_webrtc_compatible || (ibc_value === 'link_button_to_a_page');
    };

    $scope.getHiddenButtonText = function () {
      switch ($scope.widget.incompatible_browser_configuration) {
      case 'hide_widget':
        return "";
      case 'show_text_html':
        return $scope.widget.show_text_html_value;
      }
    };

    $scope.reset();
    $scope.init();

    $scope.setTheme = function (theme) {
      if($scope.widget.frame_color)
        $scope.tempFrameColor = $scope.widget.frame_color;
      if($scope.widget.button_color)
        $scope.tempButtonColor = $scope.widget.button_color;

      $scope.widget.frame_color = "";
      $scope.widget.button_color = "";
      if ($scope.widget.button_style != theme)
        $scope.widget.button_style = theme;
    };

    $scope.setCustomTheme = function() {
      $scope.widget.frame_color = "black";
      if($scope.tempFrameColor)
        $scope.widget.frame_color = $scope.tempFrameColor;
      $scope.widget.button_color = $scope.tempButtonColor;
    };

    $scope.generateWidgetCode = function () {
      console.log("--> Generating Output Code...");

      if ($scope.widget.basic_auth !== '1' && !($scope.validAuthUri || false)) {
        $scope.widgetCode = 'Please specify a valid Auth URL before generating code';
        return;
      }

      var callerId = $scope.widget.caller_id;
      if (callerId)
        callerId = callerId.replace(/[^a-zA-Z0-9-_]/g, '');

      var data = $scope.widget;
      data.callerId = callerId;

      var ibc = $scope.widget.incompatible_browser_configuration;
      if (ibc === 'hide_widget')
        data.hide_widget = true;
      else if (ibc === 'link_button_to_a_page')
        data.link_button_to_a_page = $scope.widget.link_button_to_a_page_value;
      else if (ibc === 'show_text_html')
        data.show_text_html = $scope.widget.show_text_html_value;

      var req = {
        method: 'POST',
        url: './portal-widget/get-code',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: data
      };

      $http(req)
        .then(function successCallback(response) {
            $scope.widgetCode = response.data.widget_code;
            $scope.widget_form.$setPristine();
          },
          function errorCallback(response) {
            var data = response.data;
            console.log("Error: ", data);

            $scope.widgetCode = 'Error generating widget code snippet. Please check it.';
          });
    };

    $scope.$watch('widget', function (newValue, oldValue) {
      //Don't generate widget when we are using the colorpicker
      if(newValue.button_color !== oldValue.button_color || newValue.frame_color !== oldValue.frame_color)
        return;
      $scope.generateWidgetCode();
      $cookies.putObject('widget', $scope.widget);
    }, true);

    $scope.validateAuthUri = function (form) {
      voxrtc_config = undefined;
      var authUrl = form.server_auth_url.$viewValue;
      $scope.resetUriFlags();

      $.ajax({
        url: authUrl,
        jsonp: "callback",
        dataType: "jsonp"
      }).always(function () {
        if (typeof voxrtc_config !== "undefined") {
          console.log("Valid Auth Service Detected");
          $scope.validAuthUri = true;
          voxbone.WebRTC.init(voxrtc_config);
          $scope.generateWidgetCode();
        } else {
          console.log("Invalid Auth Service");
          $scope.invalidAuthUri = true;
        }
      });
    };

    $scope.resetUriFlags = function () {
      $scope.validAuthUri = false;
      $scope.invalidAuthUri = false;
    };
  };

  WidgetEditController.$inject = ['$scope', '$http', '$window', '$controller', '$cookies', '$analytics'];

  return WidgetEditController;
});
