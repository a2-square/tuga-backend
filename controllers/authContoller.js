var passport = require('passport');
var authenticateLogin = require('../config/auth-login/authenticate_login.js');
require('../config/db/models/userModel.js');
var User = mongoose.model("userModel");

exports.simpleSignup = function(req, res) {
    var userData = {
        name: req.body.firstName + " " + req.body.lastName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    var user = new User(userData);
    user.save(function(err, data) {
        if (!err) {
            res.json({
                authentication: true,
                message: "You've successfully registered"
            });
        } else {
            res.json({
                authentication: false,
                message: "Sorry! This user name is already registered"
            });
        }
    });
};

exports.simplelogin = function(req, res, next) {
    console.log(req.body);
    if (req.body.email) {
        User.findOne({ email: req.body.email }, function(err, user) {
            if (err) {
                res.json({
                    authentication: false,
                    message: "Sorry! Something went wrong, please try to login again"
                });
            }
            if (!user) {
                res.json({
                    authentication: false,
                    message: "Sorry! Incorrect email address"
                });
            }
            if (!user.validPassword(req.body.password)) {
                res.json({
                    authentication: false,
                    message: "Sorry! Incorrect password"
                });
            }
            res.json({
                authentication: true,
                message: 'successfully login',
                user: user
            });
        });
    } else {
        res.json({
            authentication: false,
            message: "Invalid Request"
        });
    }
}

exports.logout = function(req, res) {
	req.logOut();
	res.json({
	    authentication: true
	})
}
