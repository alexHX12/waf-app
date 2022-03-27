var express = require('express');
var router = express.Router();
const logController=require("../controller/log");
const rulesController=require("../controller/rules");

/*
Log:
GET OK
POST NO
PATCH NO
DELETE NO 
*/
router.get('/logs', logController.getLog);
/*
Log:
GET OK
POST OK
PATCH OK
DELETE OK
*/
router.get('/rules', rulesController.getRules);

module.exports = router;