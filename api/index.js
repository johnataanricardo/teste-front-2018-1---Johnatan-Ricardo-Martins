const express = require('express')
  , app = express();
const bodyParser = require("body-parser");
const db = require('./db');
const config = require('./config');
const token = require('./controllers/token/');
const user = require('./controllers/user/');
const auth = require('./service/auth/')();

app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(auth.initialize());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/user', user);
app.use('/token', token);

db.connect(config.mongo.base_url, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...');
    });
  }
});