const express = require('express')
  , router = express.Router();
const async = require('async');
const db = require('../../db');
const ObjectId = require('mongodb').ObjectId;
const auth = require('../../service/auth/')();
const jwt = require('jwt-simple');
const config = require("../../config");

router.get('/:fields', auth.authenticate(), function(req, res) {
  const authorization = req.headers['authorization'];
  const token = authorization.split('Bearer ')[1];
  const decodeToken = jwt.decode(token, config.jwt.jwtSecret);
  const fields = JSON.parse(req.params.fields);
  const collection = db.get().collection('user');
  collection.find({_id: new ObjectId(decodeToken.id)}, fields).toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/:user', auth.authenticate(), function(req, res) {
  const user = JSON.parse(req.params.user);
  const query = {email: user.email};
  const values = {
    $set: {
      firstName: user.firstName, 
      lastName: user.lastName, 
      zip: user.zip, 
      state: user.state, 
      city: user.city,
      address: user.address,
      number: user.number,
      password: user.password
    }
  };
  const collection = db.get().collection('user');
  collection.updateOne(query, values, function(err, result) {
    if (err) throw err;
    res.send(result);
  })
});

router.post('/new/:user', function(req, res) {
  const user = JSON.parse(req.params.user);
  async.parallel({
    query: async.apply(findUserByEmail, user.email)
  }, function(error, results){
    if (error) {
      res.status(500).send(error);
      return;
    }
    if (results.query == null) {
      const collection = db.get().collection('user');
      collection.insertOne(user, function(err, result) {
        if (err) throw err;
        const payload = {id: user._id};
        const token = jwt.encode(payload, config.jwt.jwtSecret);
        res.send({token: token});        
      });      
    }
  });
});

function findUserByEmail(email, callback) {
  const collection = db.get().collection('user');
  collection.findOne({'email': email}, callback);
}

module.exports = router;
