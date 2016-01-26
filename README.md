# voxbone-generator


## Usage

When trying to host this widget generator for your self, please modify the variable `docroot` in `routes/index.js` to correspond to the URL where you are hosting the widget generator

## Accessing the generator

The generator requires several pieces of information to be passed either in json via HTTP POST or passed url encoded

Parameter | Meaning
----------|--------
e164      | your voxbone did w/o the +
login     | your provisioned webrtc login
password  | your shared secret used for webrtc
basic_auth| 1 if you've enabled basic auth 0 if you host your own credential service
