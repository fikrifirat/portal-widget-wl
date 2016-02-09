# click2vox WebRTC Widget generator

## Usage

When trying to host this widget generator for your self, please modify the variable `docroot` in `routes/index.js` to correspond to the URL where you are hosting the widget generator or you can set an environment variable called `DOCROOT` with the corresponding value.

Also for saving properly the ratings submitted by the caller, we need to set
`CLIENT_ID`, `CLIENT_SECRET` & `REFRESH_TOKEN` (in order to get a new pair of these, refer to file `get_google_drive_token.js`).
`SPREADSHEET_NAME` & `WORKSHEET_NAME` are also needed to determine to which document the ratings should be sent

Envionment Variable | Meaning
----------|--------
CLIENT_ID       | Google API's Client ID
CLIENT_SECRET     | Google API's Client Secret Token
REFRESH_TOKEN  | Google API's Refresh Token
SPREADSHEET_NAME| Google Spreadsheet Name for your rating target document
WORKSHEET_NAME| Google Worksheet Name in your SPREADSHEET_NAME document (Defaults to `Sheet1`)

## Accessing the generator

The generator requires several pieces of information to be passed either HTTP POST  (urlencoded form sumbission or json) or passed url encoded via HTTP GET

Parameter | Meaning
----------|--------
e164      | your voxbone did w/o the +
login     | your provisioned webrtc login
password  | your shared secret used for webrtc
basic_auth| 1 if you've enabled basic auth 0 if you host your own credential service

Example form can be found at `docRoot`/html/widget_form.html


## Launching the application
First install the required dependencies:
`npm install`


Then you can launch the node application:
`npm start`

By default the application will listen to port 3000
