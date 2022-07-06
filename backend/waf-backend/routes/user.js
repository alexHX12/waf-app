var express = require('express');
var router = express.Router();
const logControllerUser = require("../controller/user/logs");
const rulesControllerUser = require("../controller/user/rules");
const containersControllerUser = require("../controller/user/containers");
const jwtScope = require('express-jwt-scope');

let options = {
    scopeKey: 'permissions'
};

setAdminPermission = function (isAdminRoute) {
    return function (req, res, next) {
        req.isAdmin = req.user[process.env.backendURL+'/roles'].includes("admin");
        req.adminMode = isAdminRoute;
        req.authorized = true;//Errore di permessi per controlli futuri
        next();
    }
}

//User API endpoint

/*
Log:
GET OK
POST NO
PATCH NO
DELETE NO 
*/
router.get('/containers/:containerId/logs', jwtScope('read:logs_user', options), setAdminPermission(false), logControllerUser.getLog);
/*
Rules:

  /rules
    - GET OK
    - POST OK
  
  /rules/:ruleId
    - PATCH ...
    - DELETE OK
*/
router.get('/containers/:containerId/rules', jwtScope('read:rules_user', options), setAdminPermission(false), rulesControllerUser.getRules);
router.post('/containers/:containerId/rules', jwtScope('create:rules_user', options), setAdminPermission(false), rulesControllerUser.addRule);
router.delete('/containers/:containerId/rules/:ruleId', jwtScope('delete:rules_user', options), setAdminPermission(false), rulesControllerUser.deleteRule);
/*
Containers:

  /containers
    -GET OK
*/

router.get('/containers', jwtScope('read:containers_user', options), setAdminPermission(false), containersControllerUser.getContainers);

module.exports = router;