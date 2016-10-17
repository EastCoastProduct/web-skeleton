require('babel-register')();

var jsdom = require('jsdom').jsdom;
var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = { userAgent: 'node.js' };
global.__APP_URL__ = JSON.stringify('http://192.168.50.4:7000');
global.__API_URL__ = JSON.stringify('http://192.168.50.4:3000');

documentRef = document;
