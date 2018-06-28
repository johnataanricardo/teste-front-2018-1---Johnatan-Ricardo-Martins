const express = require('express')
  , router = express.Router();
const async = require('async');
const jwt = require('jwt-simple');
const db = require('../../db/');
const config = require("../../config");

router.post('/', function(req, res) {   
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;
    async.parallel({
      query: async.apply(findUserByEmailAndPassword, email, password)
    }, function(error, results){
      if (error) {
        res.status(500).send(error);
        return;
      }
      const user = results.query;
      if (user) {
        const payload = {id: user._id};
        const token = jwt.encode(payload, config.jwt.jwtSecret);
        res.json({token: token});
      } else {
        res.sendStatus(401);
      }
    });
  } else {    
    res.sendStatus(401);
  }
});

router.get('/:token', function(req, res){
  const token = req.params.token
  if (token) {
    try {
      const decodeToken = jwt.decode(token, config.jwt.jwtSecret);
      if (decodeToken.id) {
        res.send(true);
      }
    } catch(e) {
      res.send(false);
    }
  } else {
    res.send(false);
  }
});

function findUserByEmailAndPassword(email, password, callback) {
  const collection = db.get().collection('user');
  collection.findOne({'email': email, 'password': password}, callback);
}

module.exports = router;