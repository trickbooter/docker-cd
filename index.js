'use strict';

//var http = require('http');
//var server = http.createServer(function (req, res) {
//  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.end('Hello World\n');
//}).listen(3001, '0.0.0.0');
app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = require('./server');

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

console.log('server started');


var signals = {
  'SIGHUP': 1,
  'SIGINT': 2,
  'SIGTERM': 15
};
function shutdown(signal, value) {
  server.close(function () {
    console.log('server stopped by ' + signal);
    process.exit(128 + value);
  });
}
Object.keys(signals).forEach(function (signal) {
  process.on(signal, function () {
    shutdown(signal, signals[signal]);
  });
});