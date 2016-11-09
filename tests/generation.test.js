module.exports = {
  'Generation via GET': function(browser) {
    browser
      .url(browser.launchUrl + "/click2vox/?e164=1234567890&login=login&password=password&basic_auth=1")
      .waitForElementVisible('body', 5000)
      .assert.title('Voxbone Widget Generator v1.5.0')
      .assert.containsText('div.portal-title', 'Create a WebRTC Call Button for +1234567890')
      .assert.containsText('#widget_code', 'data-did="1234567890"')
      .assert.containsText('#widget_code', 'data-voxbone_webrtc_password="password"')
      .assert.containsText('#widget_code', 'data-voxbone_webrtc_username="login"')
      .assert.containsText('#widget_code', 'data-basic_auth="true"')
      .end();
  },
  'Generation via POST': function(browser) {
    browser
      .url(browser.launchUrl + "/html/widget_form.html")
      .waitForElementVisible('body', 5000)
      .clearValue('input[name=e164]')
      .clearValue('input[name=login]')
      .clearValue('input[name=password]')
      .clearValue('input[name=basic_auth]')
      .setValue('input[name=e164]', '1234567890')
      .setValue('input[name=login]', 'login')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=basic_auth]', '1')
      .click('input[value="Submit"]')
      .waitForElementVisible('body', 5000)
      .assert.containsText('div.portal-title', 'Create a WebRTC Call Button for +1234567890')
      .assert.containsText('#widget_code', 'data-did="1234567890"')
      .assert.containsText('#widget_code', 'data-voxbone_webrtc_password="password"')
      .assert.containsText('#widget_code', 'data-voxbone_webrtc_username="login"')
      .assert.containsText('#widget_code', 'data-basic_auth="true"')
      .end();
  },
};
