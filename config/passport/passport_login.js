var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LinkedinStrategy = require('passport-linkedin').Strategy;
var LocalStrategy = require('passport-local').Strategy;
require('../db/models/userModel.js');
var User = mongoose.model("userModel");
var config = require('./passport_config.js');

module.exports = passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL,
  profileFields: ['email','id', 'first_name', 'gender', 'last_name', 'picture']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ "facebook.id": profile.id }, function(err, user) {
      if(err) {
        done(err, null); // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        var facebookData = profile._json;
        user = new User({
            'facebook.id': facebookData['id'],
            'facebook.email': facebookData['email'] || facebookData.emails[0].value,
            'facebook.firstName': facebookData['first_name'],
            'facebook.lastName': facebookData['last_name'], 
            'facebook.gender': facebookData['gender'],
            'facebook.profile_picture': facebookData['picture'].data.url,
            'facebook.accessToken': accessToken,
            'facebook.linkedAt': Date.now()
        });
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
  callbackURL: config.linkedin.callbackURL,
  profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ "linkedin.id": profile.id }, function(err, user) {
      if(err) {
        done(err, null); // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        var linkedinData = profile._json;
        user = new User({
            'linkedin.id': linkedinData['id'],
            'linkedin.email': linkedinData['emailAddress'],
            'linkedin.firstName': linkedinData['firstName'],
            'linkedin.lastName': linkedinData['lastName'], 
            'linkedin.gender': linkedinData['gender'],
            'linkedin.headline': linkedinData['headline'],
            'linkedin.accessToken': accessToken,
            'linkedin.linkedAt': Date.now()
        });
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
        passwordField: 'password',
        session: false,
        scope: []
    },
    function(email, pwd, done) {
        User.findOne({ 'local.email': email }, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (!user) {
                return done(null, false);

            }
            if (!user.validPassword(pwd)) {
                return done(null, false);

            }
            return done(null, user);
        });
    }
));


