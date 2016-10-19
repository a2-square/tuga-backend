var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LinkedinStrategy = require('passport-linkedin').Strategy;
var LocalStrategy = require('passport-local').Strategy;
require('../db/models/userModel.js');
var User = mongoose.model("userModel");
var config = require('./auth_config.js');

module.exports = passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ "facebook.oauthID": profile.id }, function(err, user) {
      if(err) {
        done(err, null); // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        var userObj = {
          name: profile.displayName,
          facebook: {
              oauthID: profile.id,
              name: profile.displayName,
              linkedAt: Date.now()
          }
        }
        user = new User(userObj);
        user.save(function(err) {
          if(err) {
            done(err, null);
          } else {
            done(null, user);
          }
        });
      }
    });
  }
));

passport.use(new LinkedinStrategy({
  consumerKey: config.linkedin.consumerKey,
  consumerSecret: config.linkedin.consumerSecret,
  callbackURL: config.linkedin.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ "linkedin.oauthID": profile.id }, function(err, user) {
      if(err) {
        done(err, null); // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        var userObj = {
          name: profile.displayName,
          linkedin: {
              oauthID: profile.id,
              name: profile.displayName,
              linkedAt: Date.now()
          }
        }
        user = new User(userObj);
        user.save(function(err) {
          if(err) {
            done(err, null);
          } else {
            done(null, user);
          }
        });
      }
    });
  }
));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    console.log(username);
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

