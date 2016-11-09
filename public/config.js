require.config({
  baseUrl: '/click2vox/javascripts/',
  shim: {
    bootstrap: {
      deps: [
        'jquery'
      ]
    },
    angular: {
      exports: 'angular'
    },
    'angular-cookies': {
      deps: ['angular'], init: function () {
        return 'ngCookies';
      }
    },
    'angular-recaptcha': {
      deps: ['angular'], init: function () {
        return 'vcRecaptcha';
      }
    },
    'angular-sanitize': {
      deps: ['angular'], init: function () {
        return 'ngSanitize';
      }
    },
    'angular-toast': {
      deps: ['angular'], init: function () {
        return 'ngToast';
      }
    },
    'angular-bootstrap-colorpicker': {
      deps: ['angular'], init: function () {
        return 'colorpicker.module';
      }
    },
    'angulartics': {
      deps: ['angular'], init: function () {
        return 'angulartics';
      }
    },
    'angulartics-google-analytics': {
      deps: ['angulartics'], init: function () {
        return 'angulartics.google.analytics';
      }
    },
  },
  paths: {
    angular: [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min',
      '/lib/angular/angular.min'
    ],
    'angular-cookies': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-cookies.min',
      '/lib/angular-cookies/angular-cookies.min'
    ],
    'angular-recaptcha': [
      '//cdnjs.cloudflare.com/ajax/libs/angular-recaptcha/3.0.3/angular-recaptcha.min',
      '/lib/angular-recaptcha/release/angular-recaptcha.min'
    ],
    'angular-sanitize': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-sanitize.min',
      '/lib/angular-sanitize/angular-sanitize.min'
    ],
    'angular-toast': [
      '//cdn.voxbone.com/lib/ngToast/ngToast.min',
      '/lib/ngtoast/dist/ngToast.min'
    ],
    'angular-bootstrap-colorpicker': [
      '//cdnjs.cloudflare.com/ajax/libs/angular-bootstrap-colorpicker/3.0.25/js/bootstrap-colorpicker-module.min',
      '/lib/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min'
    ],
    'angulartics': [
      '//cdnjs.cloudflare.com/ajax/libs/angulartics/1.2.1/angulartics.min',
      '/lib/angulartics/dist/angulartics.min'
    ],
    'angulartics-google-analytics': [
      '//cdnjs.cloudflare.com/ajax/libs/angulartics-google-analytics/0.2.1/angulartics-ga.min',
      '/lib/angulartics-google-analytics/dist/angulartics-ga.min'
    ],
    bootstrap: [
      '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min',
      '/lib/bootstrap/dist/js/bootstrap.min'
    ],
    clipboard: [
      '//cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.15/clipboard.min',
      '/lib/clipboard/dist/clipboard.min'
    ],
    jquery: [
      '//code.jquery.com/jquery-2.2.4.min',
      '/lib/jquery/dist/jquery.min'
    ],
    'jquery.qtip': [
      '//cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min',
      '/lib/qtip2/basic/jquery.qtip.min'
    ],
    raty: [
      '//cdnjs.cloudflare.com/ajax/libs/raty/2.7.0/jquery.raty.min',
      '/lib/raty/lib/jquery.raty'
    ],
    widget: '/javascripts/widget',
    domReady: [
      '//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.min',
      '/lib/domReady/domReady'
    ],
    requirejs: [
      '//cdnjs.cloudflare.com/ajax/libs/require.js/2.3.2/require.min',
      '/lib/requirejs/require'
    ]
  },
  packages: [
    "controllers",
    "directives"
  ]
});

// this is just to "preload" stuff
require(['angular', 'jquery']);
