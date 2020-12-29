var mocky = require('mocky');
var fs = require('fs');

var api = '/api';

var spots = require('./spots.json');

mocky.createServer([
  // 作成API
  {
    url: api+'/spots',
    method: 'post',
    res: function(req, res, callback) {
      setTimeout(function() {
        callback(null, {
          status: 200,
          body: req.body
        });
      }, 1000);
    }
  },
  // 検索API
  {
    url: api+'/spots',
    method: 'get',
    res: function(req, res, callback) {
      setTimeout(function() {
        callback(null, {
          status: 200,
          body: JSON.stringify(spots)
        });
      }, 1000);
    }
  },
]).listen(4321);