<img src="public/images/navbar-brand.png" align="right" />
# Click2Vox WebRTC Widget generator

Click2Vox creates a button that allows anyone with a WebRTC enabled browser to call a SIP address you define. The widget generator makes is possible to cut and paste code that can be inserted into your own website and place the button there. 
This portal is intended to host your own widget generator, so your customers/employees can create their own click-to-call buttons that connect to your service.

## Usage

Envionment Variable | Meaning
----------|--------
APP_URL | Url where the app is being hosted (i.e. http://0.0.0.0:3000, http://127.0.0.1:3000, https://voxbone.com/clickvox) no trailing slash

Also the ratings will be posted to Kibana through `voxbone.WebRTC.postCallRating(did, rating, comment, url)`

## Accessing the generator

The generator requires several pieces of information to be passed either HTTP POST  (urlencoded form sumbission or json) or passed url encoded via HTTP GET

Parameter | Meaning
----------|--------
e164      | your voxbone did w/o the +
login     | your provisioned webrtc login
password  | your shared secret used for webrtc
basic_auth| 1 if you've enabled basic auth 0 if you host your own credential service

POST Example, form can be found at:
```
APP_URL/html/widget_form.html
```

GET Example, URL query string:
```
APP_URL/click2vox/?e164=your_e164&login=your_login&password=your_password&basic_auth=1
```

## Installing the application

Install the required dependencies with:
`npm install`

## Launching the application
Load the APP_URL environment variable with the corresponding URL where the APP is being hosted, then
launch the node application:
`npm start`

By default the application will listen to port 3000

## Running Tests 

* NightWatch (http://nightwatchjs.org/)

- To run the tests first serve the app with `grunt` and in another window run:
```bash
grunt nightwatch
```

#Note:

The following files are being kept for retro-compatibily with widgets that where generated with older versions of the generator and soon will be deleted:
* javascripts/jssip-0.7.9-vox.js
* javascripts/widget-0.1.js
* javascripts/widget-0.2.js
* javascripts/widget-0.3.js
* javascripts/widget-0.4.js
* stylesheets/widget-0.4.css


