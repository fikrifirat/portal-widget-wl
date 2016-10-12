module.exports = {
  'Checks that all routes respond properly': function(browser) {
    var routes = ['/faq', '/known_issues', '/error'];

    routes.forEach(function(route) {
      var path = route;

      browser
        .url(browser.launchUrl + '/click2vox' +  path, function (response) {
          console.log('Checking url:', browser.launchUrl + '/click2vox' + path);

          this.assert.equal(typeof response, 'object', 'Response object correctly received');
          this.assert.equal(response.status, 0, 'Response status ok');

          // make sure is not the error page
          this.assert.elementNotPresent('.errorPageRaised', 'No error message present');
        });
    });

    browser.end();
  }
};
