var express    = require('express');
var enforce    = require('express-sslify');
var fallback   = require('express-history-api-fallback');
var bodyParser = require('body-parser');

var notes = require('./notes_db');
var port  = process.env.PORT ? JSON.parse(process.env.PORT) : 8080;

console.log('-- port:  ' + port);

notes.connect(process.env.MONGODB_URI);

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

app.get('/notes/:username', function (req, res, next) {
  notes.get(req, res, next);
});

app.get('/notes', function (req, res, next) {
  notes.keys(req, res, next);
});

app.post('/notes', function (req, res, next) {
  notes.post(req, res, next);
});

// NOTE:  this traps all of the bogus notes api calls...
app.all('/notes*', function (req, res, next) {
  res.status(404).send('Invalid Request!');
})

app.use(express.static(root));
app.use(fallback('index.html', { root: root }));

app.listen(port, function () {
  console.log(' App Server is running on port ' + port + '!');
});
