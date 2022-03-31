var express = require('express');
var router = express.Router();
const logController=require("../controller/logs");
const rulesController=require("../controller/rules");
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
Log:
GET OK
POST OK
PATCH OK
DELETE OK
*/
router.get('/rules',jwtScope('read:rules',options), rulesController.getRules);
router.post('/rules',jwtScope('create:rules',options), rulesController.addRule);

module.exports = router;