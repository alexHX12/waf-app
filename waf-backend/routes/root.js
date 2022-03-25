var express = require('express');
var router = express.Router();
const logController=require("../controller/log");
const rulesController=require("../controller/rules");

router.get('/log', logController.getLog);
router.get('/rules', rulesController.getRules);

module.exports = router;