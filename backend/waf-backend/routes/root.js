var express = require('express');
var router = express.Router();
const logController=require("../controller/logs");
const rulesController=require("../controller/rules");
const usersController=require("../controller/users");
const containersController=require("../controller/containers");
const jwtScope = require('express-jwt-scope');

let options = {
    scopeKey: 'permissions'
  };

/*
Log:
GET OK
POST NO
PATCH NO
DELETE NO 
*/
router.get('/logs',jwtScope('read:logs',options), logController.getLog);
/*
Rules:
GET OK
POST OK
PATCH OK
DELETE OK
*/
router.get('/rules',jwtScope('read:rules',options), rulesController.getRules);
router.post('/rules',jwtScope('create:rules',options), rulesController.addRule);
/*
Users:
GET OK
POST ...
PATCH ...
DELETE ...
*/
router.get('/users',jwtScope('read:accounts',options),usersController.getUsers);
/*
Containers:
GET OK
POST OK
PATCH ...
DELETE ...
*/
router.post('/containers',jwtScope('create:containers',options),containersController.addContainer)

module.exports = router;