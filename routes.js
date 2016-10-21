var path = require('path');
var passport = require('passport');
var authenticateLogin = require('./config/passport/passport_login.js');
var authContoller = require('./controllers/authContoller');
require('./config/db/models/userModel.js');
var User = mongoose.model("userModel");
var jwt = require('jsonwebtoken');
var secretKey = 'tugaPassportApplicationTest';
var tokenTime = 60 * 60;

module.exports = function(app, router) {
    app.route('/').get(function(req, res) {
        res.sendFile(path.resolve('public/server.html'));
    });

    app.use('/api/', router);

/////////////////////Route to check loggedIn and to verify JWT///////////////////////////////////////

    router.use(function(req, res, next) {
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
                    return next();
                }
            });
        } else {
            // if there is no token
            return res.send({
                authentication: false,
                message: 'Please login to see this'
            });

        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////Serialized and Deserialized logged In user/////////////////////////////////////////

    passport.serializeUser(function(user, done) {
        console.log('serializeUser: ' + user._id);
        done(null, user._id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            if (!err) {
                done(null, user);
            } else {
                done(err, null);
            }
        });
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////Route for simple Sigup and Passport-local-jwt LogIn//////////////////////////////////

    app.post('/signup', authContoller.simpleSignup);

    app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (!user) {
                return res.send(401, { authentication: false, message: 'authentication failed'});
            }
            req.token = jwt.sign({
                id: user.id,
            }, secretKey, {
                expiresIn: tokenTime
            });
            res.send(200, { data: user, access_token: req.token, authentication: true, message: 'Successfully Login!'});
            return;
        })(req, res, next);
    });

///////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////Under Development Routes/////////////////////////////////////////////////
    app.get('/auth/facebook',
        passport.authenticate('facebook', {scope: ['email']}),
        loginResponse.successResponse, loginResponse.failedResponse);

    app.get('/auth/linkedin',
        passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }),
        loginResponse.successResponse, loginResponse.failedResponse);

///////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////Routes Which will only be called after login/////////////////////////////
    router.post('/authenticateClientRoute', authContoller.verifyLogin);    
    router.get('/logout', authContoller.logout)

////////////////////////////////////////////////////////////////////////////////////////////////////////

}
