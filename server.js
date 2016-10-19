var express = require("express");
var app = express();                     //instantiates Express
var http = require("http");
var server = require("http").createServer(app);
var session = require("express-session");
var bodyParser = require("body-parser");   //bodyParser is in fact the composition of three middlewares like json, urlencoded and multipart
var chalk = require('chalk');
var morgan = require('morgan');
var errorhandler = require('errorhandler');
var notifier = require('node-notifier');
var passport = require('passport');
// var cors = require('cors');

global.mongoose = require("mongoose");
var connectDB = require('./config/db/config_connect.js');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};

//configure middleware components.
app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.use(cors());
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(allowCrossDomain);
 
 //For Handling error in development mode
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler({log: errorNotification}))
}
function errorNotification(err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title: title,
    message: str
  })
}

//create app routes
var router = express.Router();
require("./routes")(app, router);

//listening server 
server.listen(7000, function() {
    console.log(chalk.bgBlue("Tuga server is running  at http://" + server.address().address + ":" + server.address().port + ' in ') + chalk.bgGreen(process.env.NODE_ENV + ' Mode.'));
});



