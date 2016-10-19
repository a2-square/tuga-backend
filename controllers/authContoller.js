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
                message: "Sorry! This email address is already registered"
            });
        }
    });
};

exports.logout = function(req, res) {
	req.logOut();
	res.json({
	    authentication: true
	})
}
