var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-fmeenf3n.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://api.localhost',
  issuer: 'https://dev-fmeenf3n.us.auth0.com/',
  algorithms: ['RS256']
});

var rootRouter = require('./routes/root');

var app = express();

const axios = require("axios");

const options = {
  method: 'POST',
  url: 'https://dev-fmeenf3n.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  data: {
    client_id:"2BPjToNJXwRYL6NPMxz3nYiTeuZEWZ4y",
    client_secret:"mjRDkqncXBJxKJ58gUOc0MdO7QXBMJusQJOK4Tf3ZegEKQHyWcyz_psMih4jsN5X",
    audience:"https://dev-fmeenf3n.us.auth0.com/api/v2/",
    grant_type:"client_credentials"
  }
};


var api_mngmnt_promise=axios(options);

app.use(jwtCheck);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', rootRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

module.exports = {app,api_mngmnt_promise};
