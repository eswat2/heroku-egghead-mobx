var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();

function isAuthorized(req) {
  return true;
}

var port = process.env.PORT ? JSON.parse(process.env.PORT) : 8080;
var glob = process.env.PORT ? port + 100 : 3000;

console.log('-- port:  ' + port);
console.log('-- glob:  ' + glob);

server.use(middlewares)
server.use(function (req, res, next) {
 if (isAuthorized(req)) { // add your authorization logic here
   next() // continue to JSON Server router
 } else {
   res.sendStatus(401)
 }
})
server.use(router)
server.listen(glob, function () {
  console.log('JSON Server is running on port ' + glob + '!');
});

var fallback = require('express-history-api-fallback');
var express  = require('express');
var enforce  = require('express-sslify');
var htproxy  = require('http-proxy');

var prox = htproxy.createProxyServer();
var app  = express();
var root = __dirname + '/public'

// Use enforce.HTTPS({ trustProtoHeader: true }) in case you are behind
// a load balancer (e.g. Heroku). See further comments below
if (process.env.PORT) {
  console.log('-- enforce SSL');
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// passes all api requests through the proxy
app.all('/notes*', function (req, res, next) {
  prox.web(req, res, {
    target: 'http://localhost:' + glob
  });
});

app.use(express.static(root));
app.use(fallback('index.html', { root: root }));

app.listen(port, function () {
  console.log(' App Server is running on port ' + port + '!');
});
