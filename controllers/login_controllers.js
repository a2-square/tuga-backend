var passport = require('passport');
var authenticateLogin = require('../config/auth-login/authenticate_login.js');
require('../config/db/models/userModel.js');
var User = mongoose.model("userModel");

exports.successResponse = function(req, res, next) {
		//res.redirect("http://localhost:3000");
        res.json({
            authentication: true,
            token: req.user._id,
            message: 'successfully login',
            abstract: req.user
        });
}

exports.failedResponse  = function(err , req, res){
	console.log("failedResponse");
	//res.redirect('/');
		res.json({
            authentication: false,
            message: 'Failed! to login',
        });
}