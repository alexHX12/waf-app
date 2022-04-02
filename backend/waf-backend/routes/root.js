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
PATCH ...
DELETE ...
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
DELETE OK
*/
router.get('/containers',jwtScope('read:containers',options),containersController.getContainers);
router.post('/containers',jwtScope('create:containers',options),containersController.addContainer);
router.delete('/containers',jwtScope('delete:containers',options),containersController.deleteContainer);

module.exports = router;