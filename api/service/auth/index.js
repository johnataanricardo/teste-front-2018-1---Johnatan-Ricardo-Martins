const ObjectId = require('mongodb').ObjectId;
const async = require('async');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require("../../config");
const db = require('../../db/');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: config.jwt.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function() {
  let strategy = new Strategy(params, function(payload, done) {
    let idUser = payload.id;
    async.parallel({
      query: async.apply(findUserById, idUser)
    }, function (error, results) {
      if (error) {
        res.status(500).send(error);
        return;
      }
      let user = results.query;
      if (user) {
        return done(null, {id: user._id});
      } else {
        return done(new Error("User not found"), null);
      }
    });
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", config.jwt.jwtSession);
    }
  };
}

function findUserById(idUser, callback) {
  let collection = db.get().collection('user');
  collection.findOne({_id: new ObjectId(idUser)}, callback);
}