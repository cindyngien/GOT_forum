var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'secret', userProperty: 'payload'});

module.exports = {

  registerUser: function(req, res, next) {

    if(!req.body.username || !req.body.password) {
      return res.status(400).json({message: 'please fill out both fields'});
    }
    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.save(function(err) {
      if(err) {
        return next(err);
      }
      return res.json({token: user.generateJWT()})
    });
  },

  loginUser: function(req, res, next) {

    if(!req.body.username || !req.body.password) {
      return res.status(400).json({message: 'please fill out both fields'});
    }
    passport.authenticate('local', function(err, user, info) {
      if(err) {
        return next(err);
      }
      if(user) {
        return res.json({token: user.generateJWT()});
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  }

}
