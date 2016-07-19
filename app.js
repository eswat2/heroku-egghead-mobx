var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();

function isAuthorized(req) {
  return true;
}

server.use(middlewares)
server.use(function (req, res, next) {
 if (isAuthorized(req)) { // add your authorization logic here
   next() // continue to JSON Server router
 } else {
   res.sendStatus(401)
 }
})
server.use(router)
server.listen(3000, function () {
  console.log('JSON Server is running on port 3000!');
});

var express = require('express');
var enforce = require('express-sslify');

var app  = express();
var port = (process.env.PORT || 8080);

// Use enforce.HTTPS({ trustProtoHeader: true }) in case you are behind
// a load balancer (e.g. Heroku). See further comments below
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.static('public'));

app.listen(port, function () {
  console.log(' App Server is running on port ' + port + '!');
});
