var fallback = require('express-history-api-fallback');
var express  = require('express');
var enforce  = require('express-sslify');
var htproxy  = require('http-proxy');

var bodyParser = require('body-parser');

var notes = require('./notes_db');
var port  = process.env.PORT ? JSON.parse(process.env.PORT) : 8080;

console.log('-- port:  ' + port);

notes.connect(process.env.MONGODB_URI);

var prox = htproxy.createProxyServer();
var app  = express();
var root = __dirname + '/public';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use enforce.HTTPS({ trustProtoHeader: true }) in case you are behind
// a load balancer (e.g. Heroku). See further comments below
if (process.env.PORT) {
  console.log('-- enforce SSL');
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// passes all api requests through the proxy
app.all('/notes*', function (req, res, next) {
  notes.process(req, res, next);
});

app.use(express.static(root));
app.use(fallback('index.html', { root: root }));

app.listen(port, function () {
  console.log(' App Server is running on port ' + port + '!');
});
