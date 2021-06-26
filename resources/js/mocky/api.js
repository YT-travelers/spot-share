var mocky = require('mocky');
var fs = require('fs');

var api = '/api';

var tourisms = require('./tourism.json');
var routes = require('./route.json');
var routedetails = require('./route-detail.json');

mocky.createServer([
  // 作成API
  {
    url: api+'/tourisms',
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
    url: api+'/tourisms',
    method: 'get',
    res: function(req, res, callback) {
      setTimeout(function() {
        callback(null, {
          status: 200,
          body: JSON.stringify(tourisms)
        });
      }, 1000);
    }
  },
  {
    url: api+'/routes',
    method: 'get',
    res: function(req, res, callback) {
      setTimeout(function() {
        callback(null, {
          status: 200,
          body: JSON.stringify(routes)
        });
      }, 1000);
    }
  },
  {
    url: api+'/routes/1',
    method: 'get',
    res: function(req, res, callback) {
      setTimeout(function() {
        callback(null, {
          status: 200,
          body: JSON.stringify(routedetails)
        });
      }, 1000);
    }
  },
]).listen(4321);