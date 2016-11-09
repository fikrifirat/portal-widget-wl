module.exports = {
  'Notification-success' : function (browser) {
    browser
      .url(browser.launchUrl+"/click2vox/?e164=1234567890&login=login&password=password&basic_auth=1")
      .waitForElementVisible('body', 5000)
      .assert.containsText('div.alert.alert-success', '')
      .setValue('input[name="button_label"]', 'My_Test_Button')
      .assert.containsText('div.alert.alert-success', '')
      .click('a[href="#collapseIncompatileBrowserConfiguration"]')
      .click('label.show_text_html')
      .click('.options-wrap.active.incompatible .form-group:nth-child(3) label')
      .setValue('input[name="incompatible_browser_configuration"]', 'show_text_html')
      .clearValue('textarea[name="show_text_html_value"]')
      .setValue('textarea[name="show_text_html_value"]', 'Incompatible_browser')
      .assert.containsText('div.alert.alert-success', '')
      .end();
  },
  'Notification-Error' : function (browser) {
    browser
      .url(browser.launchUrl+"/click2vox/?e164=1234567890&login=login&password=password&basic_auth=0")
      .waitForElementVisible('body', 5000)
      .assert.containsText('div.alert.alert-error', '')
      .end();
  },
};
