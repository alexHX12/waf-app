var express = require('express');
var router = express.Router();
const logControllerAdmin=require("../controller/admin/logs");
const rulesControllerAdmin=require("../controller/admin/rules");
const usersControllerAdmin=require("../controller/admin/users");
const containersControllerAdmin=require("../controller/admin/containers");

const logControllerUser=require("../controller/user/logs");
const rulesControllerUser=require("../controller/user/rules");
const containersControllerUser=require("../controller/user/containers");
const jwtScope = require('express-jwt-scope');

let options = {
    scopeKey: 'permissions'
  };

setAdminPermission= function(isAdminRoute){
  return function(req,res,next){
    req.isAdmin=req.user['http://api.localhost/roles'].includes("admin");
    req.adminMode=isAdminRoute;
    req.authorized=true;//Errore di permessi per controlli futuri
    next();
  }
}

function checkAdmin(req,res,next){
  if(req.isAdmin&&req.adminMode){
    next();
  }else{
    res.status(403).send({'error:':'Invalid permission'});
  }
}

//Admin API endpoint

/*
Log:
GET OK
POST NO
PATCH NO
DELETE NO 
*/
router.get('/admin/logs',jwtScope('read:logs_admin',options), setAdminPermission(true),checkAdmin,logControllerAdmin.getLog);
/*
Rules:

  /rules
    - GET OK
    - POST OK
  
  /rules/:ruleId
    - PATCH ...
    - DELETE OK
*/
router.get('/admin/rules',jwtScope('read:rules_admin',options), setAdminPermission(true),checkAdmin,rulesControllerAdmin.getRules);
router.post('/admin/rules',jwtScope('create:rules_admin',options),setAdminPermission(true),checkAdmin, rulesControllerAdmin.addRule);
router.delete('/admin/rules/:ruleId',jwtScope('delete:rules_admin',options),setAdminPermission(true),checkAdmin,rulesControllerAdmin.deleteRule);
/*
Users:
GET OK
POST ...
PATCH ...
DELETE ...
*/
router.get('/admin/users',jwtScope('read:accounts_admin',options),setAdminPermission(true),checkAdmin,usersControllerAdmin.getUsers);
/*
Containers:

  /containers
    - GET OK
    - POST OK

  /containers/:containerId
    - PATCH ...
    - DELETE OK
*/
router.get('/admin/containers',jwtScope('read:containers_admin',options),setAdminPermission(true),checkAdmin,containersControllerAdmin.getContainers);
router.post('/admin/containers',jwtScope('create:containers_admin',options),setAdminPermission(true),checkAdmin,containersControllerAdmin.addContainer);
router.delete('/admin/containers/:containerId',jwtScope('delete:containers_admin',options),setAdminPermission(true),checkAdmin,containersControllerAdmin.deleteContainer);

//User API endpoint

/*
Log:
GET OK
POST NO
PATCH NO
DELETE NO 
*/
router.get('/containers/:containerId/logs',jwtScope('read:logs_user',options), setAdminPermission(false),logControllerUser.getLog);
/*
Rules:

  /rules
    - GET OK
    - POST OK
  
  /rules/:ruleId
    - PATCH ...
    - DELETE OK
*/
router.get('/containers/:containerId/rules',jwtScope('read:rules_user',options), setAdminPermission(false), rulesControllerUser.getRules);
router.post('/containers/:containerId/rules',jwtScope('create:rules_user',options), setAdminPermission(false), rulesControllerUser.addRule);
router.delete('/containers/:containerId/rules/:ruleId',jwtScope('delete:rules_user',options), setAdminPermission(false),rulesControllerUser.deleteRule);
/*
Containers:

  /containers
    -GET OK
*/

router.get('/containers',jwtScope('read:containers_user',options), setAdminPermission(false), containersControllerUser.getContainers);

module.exports = router;