module.exports = {
  'Cookies Test' : function (browser) {
    browser
      //first delete cookie
      .deleteCookie("widget")
      .url(browser.launchUrl+"/click2vox/?e164=1234567890&login=login&password=password&basic_auth=1")
      .waitForElementVisible('body', 5000)

      // let's fill all the inputs to see if it works
      .setValue('input[name="button_label"]', 'My_Test_Button')

      // let's set some advanced configurations
      .click('a[href="#collapseAdvancedCallConfiguration"]')
      .setValue('input[name="caller_id"]', 'This_is_the_test_bot')
      .setValue('input[name="context"]', '12context34')
      .setValue('input[name="send_digits"]', '1,2,3,1200ms,4,5,900ms,6,#')

      // now for incompatible browsers
      .click('a[href="#collapseIncompatileBrowserConfiguration"]')
      .click('label.show_text_html')
      .click('.options-wrap.active.incompatible .form-group:nth-child(3) label')

      .setValue('input[name="incompatible_browser_configuration"]', 'show_text_html')
      .clearValue('textarea[name="show_text_html_value"]')
      .setValue('textarea[name="show_text_html_value"]', 'Incompatible_browser')
      .click('label.show_text_html')

      //refresh the page and test cookies
      .url(browser.launchUrl+"/click2vox/?e164=1234567890&login=login&password=password&basic_auth=1")

      .assert.valueContains ('input[name="button_label"]', 'My_Test_Button')
      .assert.valueContains ('input[name="caller_id"]', 'This_is_the_test_bot')
      .assert.valueContains ('input[name="send_digits"]', '1,2,3,1200ms,4,5,900ms,6,#')
      .assert.valueContains ('input[name="context"]', '12context34')
      .assert.valueContains ('textarea[name="show_text_html_value"]', 'Incompatible_browser')

      //make sure we delete the cookie for future tests
      .deleteCookie("widget")
      .end();
  }
};
