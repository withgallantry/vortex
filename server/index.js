'use strict'
var ld = require ('../');

var tp = new ld.ToyPadEmu ();

var restify = require ('restify');

tp.registerDefaults ();
console.log(tp);
var bruteForce = require('./libs/bruteForce');
var apiActions = require('./libs/server')(tp);
apiActions.include(bruteForce);

var server = restify.createServer ();
server.use (restify.bodyParser ({ mapParams: true }));

server.post ('/api/tag/create', apiActions.processCreateTagData);
server.post ('/api/tag/place', apiActions.processPlaceTagData);
server.post ('/api/tag/brute', apiActions.bruteForce);

server.listen (9090, function () {
  console.log ('%s listening at %s', server.name, server.url);
});


