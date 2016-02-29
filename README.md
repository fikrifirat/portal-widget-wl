# click2vox WebRTC Widget generator

## Usage

When trying to host this widget generator for your self, please modify the variable `docroot` in `routes/index.js` to correspond to the URL where you are hosting the widget generator or you can set an environment variable called `DOCROOT` with the corresponding value.

Envionment Variable | Meaning
----------|--------
DOCROOT | Url where the as is being hosted (i.e. http://0.0.0.0:3000, http://127.0.0.1:3000, https://voxbone.com/clickvox) no trailing slash

Also the ratings will be posted to Kibana through `voxbone.WebRTC.postCallRating(did, rating, comment, url)`

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

## Landing Page for [TestRTC](http://testrtc.com/)

* `docRoot`/html/testrtc.html
