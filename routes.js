var path = require('path');
var passport = require('passport');
var authenticateLogin = require('./config/auth-login/authenticate_login.js');
var loginResponse = require('./controllers/login_controllers');
var authContoller = require('./controllers/authContoller');

module.exports = function(app, router) {
    app.route('/').get(function(req, res) {
        res.sendFile(path.resolve('public/server.html'));
    });

    app.use('/api/', router);
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

    app.post('/signup', authContoller.simpleSignup);

    app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (!user) {
                return res.send(401, { authentication: false, message: 'authentication failed', data: user});
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.send({ authentication: true, message: 'Successfully! Login' });
            });
        })(req, res, next);
    });

    app.get('/auth/facebook',
        passport.authenticate('facebook'),
        loginResponse.successResponse, loginResponse.failedResponse);

    app.get('/auth/linkedin',
        passport.authenticate('linkedin'),
        loginResponse.successResponse, loginResponse.failedResponse);
    

    app.get('/logout', authContoller.logout);

}
