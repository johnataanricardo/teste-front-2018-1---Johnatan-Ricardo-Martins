const express = require('express')
  , router = express.Router();
const async = require('async');
const db = require('../../db');
const auth = require('../../service/auth/')();
const jwt = require('jwt-simple');
const config = require("../../config");

router.get('/:userName', auth.authenticate(), function(req, res) {
  const userName = req.params.userName;
  const authorization = req.headers['authorization'];
  const token = authorization.split('Bearer ')[1];
  const decodeToken = jwt.decode(token, config.jwt.jwtSecret);
  async.parallel({
    query: async.apply(findUserByUserNameAndIdUserPlataform, userName, decodeToken.id)
  }, function(error, results){
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.send(results.query)
  });
});

router.post('/:annotation', auth.authenticate(), function(req, res) {
  const annotation = JSON.parse(req.params.annotation);
  const authorization = req.headers['authorization'];
  const token = authorization.split('Bearer ')[1];
  const decodeToken = jwt.decode(token, config.jwt.jwtSecret);
  annotation.idUserPlataform = decodeToken.id;
  async.parallel({
    query: async.apply(findUserByUserNameAndIdUserPlataform, annotation.userName, annotation.idUserPlataform)
  }, function(error, results){
    if (error) {
      res.status(500).send(error);
      return;
    }
    const collection = db.get().collection('annotation');    
    if (results.query) {
      const resultQuery = results.query
      const query = {userName: resultQuery.userName, idUserPlataform: resultQuery.idUserPlataform};
      const values = {
        $set: {
          annotation: annotation.annotation
        }
      }
      collection.updateOne(query, values, function(err, result) {
        if (err) throw err;
        res.send(result);
      })
    } else {
      collection.insertOne(annotation, function(err, result) {
        if (err) throw err;
        return res.send(result);
      });
    }
  });
});

function findUserByUserNameAndIdUserPlataform(userName, idUserPlataform, callback) {
  const collection = db.get().collection('annotation');
  collection.findOne({userName: userName, idUserPlataform: idUserPlataform}, {fields: {'user': 0}}, callback);
}

module.exports = router;