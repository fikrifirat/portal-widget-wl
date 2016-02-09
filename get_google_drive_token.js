var readline = require('readline');

var googleAuth = require('google-auth-library');
var OAuth2Client = new googleAuth().OAuth2;

// Client ID and client secret are available at
// https://code.google.com/apis/console
// 1. Create or pick a project
// 2. Choose "API & Auth" and then "Credentials"
// 3. Click "Create new Client ID"
// 4. Select "Installed application" and "Other"
// 5. Copy your ClientID and Client Secret into the fields beneath

var CLIENT_ID = '';
var CLIENT_SECRET = '';

// 6. This scope 'https://spreadsheets.google.com/feeds' provides full access to all Spreadsheets in
// your Google Drive. Find more scopes here: https://developers.google.com/drive/web/scopes
// and https://developers.google.com/google-apps/spreadsheets/authorize
var PERMISSION_SCOPE = 'https://spreadsheets.google.com/feeds'; //space-delimited string or an array of scopes

// 6. Run this script: `node get_oauth2_permissions.js'
// 7. Visit the URL printed, authenticate the google user, grant the permission
// 8. Copy the authorization code and paste it at the prompt of this program.
// 9. The refresh_token you get is needed with the client_id and client_secret when using edit-google-spreadsheet

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, 'urn:ietf:wg:oauth:2.0:oob');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// generate consent page url
var url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: PERMISSION_SCOPE
});

console.log('Visit this url:\n%s\n', url); // provides a refresh token

rl.question('Enter the code here: ', function(code) {
  console.log('\nGetting token...');
  oauth2Client.getToken(code, function(err, tokens) {
    if(err)
      return console.log("Error getting token: " + err);
    var creds = { client_id: CLIENT_ID, client_secret: CLIENT_SECRET, refresh_token: tokens.refresh_token };
    console.log('Use this in your Spreadsheet.load():\n"oauth2": %s', JSON.stringify(creds, true, 2));
    process.exit(0);
  });
});
