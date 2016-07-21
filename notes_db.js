var mongoose = require('mongoose');
var db = null;

var noteSchema = mongoose.Schema({
    user: String,
    values: [ String ]
});

var Note = mongoose.model('Note', noteSchema);

function getNote(user, callback) {
  Note.findOne({ user: user }, callback);
}

function postNote(user, values, callback) {
  var note = null;

  getNote(user, function(err, object) {
    if (!err) {
      if (object) {
        note = object;

        note.values = values;
      }
      else {
        note = new Note({ user: user, values: values });
      }
      note.save(callback);
    }
    else {
      callback('failed');
    }
  });
}

function connect(MONGOLAB_URI) {
  mongoose.connect(MONGOLAB_URI);

  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    console.log('-- mongoLab:  connected');
  });
}

function process(req, res, next) {
  var url    = req.url;
  var method = req.method;
  var user   = url.substr(7);

  if (method == 'GET') {
    // console.log('-- user:  ' + user);
    getNote(user, function(err, object){
      if (!err) {
        if (object) {
          res.json(object);
        }
        else {
          res.json({ values: [] });
        }
      }
      else {
        res.status(500).send('Something broke!');
      }
    })
  }
  else {
    if (method == 'POST') {
      // console.log(req.body);
      var user   = req.body.id;
      var values = req.body.values;
      postNote(user, values, function(err, object) {
        if (!err) {
          if (object) {
            res.json(object);
          }
          else {
            res.json({ values: [] });
          }
        }
        else {
          res.status(500).send('Something broke!');
        }
      })
    }
    else {
      res.status(404).send('Invalid Request');
    }
  }
}

var api = {
  connect: connect,
  process: process
}

module.exports = api;
