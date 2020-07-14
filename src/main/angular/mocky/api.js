var mocky = require('mocky');
var fs = require('fs');

var api = '/api';

var spots = require('./spots.json');

mocky.createServer([{
  // spots
  url: api+'/spots',
  method: 'get',
  res: JSON.stringify(spots)
}
]).listen(4321);