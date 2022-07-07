var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const autoIncrement = require('mongoose-auto-increment');
const axios=require('axios');
require('dotenv').config();
const { dbConnection } = require("./dbConnection");

dbConnection.connectToDB();
autoIncrement.initialize(dbConnection.db);

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.domain+'/.well-known/jwks.json'
  }),
  audience: process.env.backendURL,
  issuer: process.env.domain,
  algorithms: ['RS256']
});

var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');
const { copyFile } = require('fs');

var app = express();

const options = {
  method: 'POST',
  url: process.env.domain+'/oauth/token',
  headers: { 'content-type': 'application/json' },
  data: {
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        audience: process.env.domain+"/api/v2/",
        grant_type: "client_credentials"
    }
};

global.mngmnt_token=axios(options);//Promise

app.use(jwtCheck);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/admin', adminRouter);
app.use('/', userRouter);


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

module.exports = app;
