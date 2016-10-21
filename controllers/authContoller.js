var passport = require('passport');
var authenticateLogin = require('../config/passport/passport_login.js');
require('../config/db/models/userModel.js');
var User = mongoose.model("userModel");
var jwt = require('jsonwebtoken');
var secretKey = 'tugaPassportApplicationTest';
var tokenTime = 60 * 60;




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



exports.verifyLogin = function(req, res, next){
        console.log("verifyLogin", req.headers['access_token']);
                // check header or url parameters or post parameters for token
        var token = req.body.access_token || req.query.access_token || req.headers['access_token'];

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, secretKey, function(err, decoded) {
                if (err) {
                    return res.json({ authentication: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    return res.json({ authentication: true, message: 'user persist' });
                }
            });
        } else {
            // if there is no token
            return res.send({
                authentication: false,
                message: 'Please login to see this'
            });

        }
    }

exports.logout = function(req, res) {
	req.logOut();
	res.json({
	    authentication: true
	})
}
