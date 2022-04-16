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

setAdminPermission= function(isAdminRoute){
  return function(req,res,next){
    req.isAdmin=req.user['http://api.localhost/roles'].includes("admin");
    req.adminMode=isAdminRoute;
    req.authorized=true;//Errore di permessi per controlli futuri
    next();
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
router.get('/admin/logs',jwtScope('read:logs_admin',options), setAdminPermission(true),logController.getLog);
/*
Rules:

  /rules
    - GET OK
    - POST OK
  
  /rules/:ruleId
    - PATCH ...
    - DELETE OK
*/
router.get('/admin/rules',jwtScope('read:rules_admin',options), setAdminPermission(true),rulesController.getRules);
router.post('/admin/rules',jwtScope('create:rules_admin',options),setAdminPermission(true), rulesController.addRule);
router.delete('/admin/rules/:ruleId',jwtScope('delete:rules_admin',options),setAdminPermission(true),rulesController.deleteRule);
/*
Users:
GET OK
POST ...
PATCH ...
DELETE ...
*/
router.get('/admin/users',jwtScope('read:accounts_admin',options),setAdminPermission(true),usersController.getUsers);
/*
Containers:

  /containers
    - GET OK
    - POST OK

  /containers/:containerId
    - PATCH ...
    - DELETE OK
*/
router.get('/admin/containers',jwtScope('read:containers_admin',options),setAdminPermission(true),containersController.getContainers);
router.post('/admin/containers',jwtScope('create:containers_admin',options),setAdminPermission(true),containersController.addContainer);
router.delete('/admin/containers/:containerId',jwtScope('delete:containers_admin',options),setAdminPermission(true),containersController.deleteContainer);

//User API endpoint

/*
Log:
GET OK
POST NO
PATCH NO
DELETE NO 
*/
router.get('/containers/:containerId/logs',jwtScope('read:logs_user',options), setAdminPermission(false),logController.getLog);
/*
Rules:

  /rules
    - GET OK
    - POST OK
  
  /rules/:ruleId
    - PATCH ...
    - DELETE OK
*/
router.get('/containers/:containerId/rules',jwtScope('read:rules_user',options), setAdminPermission(false), rulesController.getRules);
router.post('/containers/:containerId/rules',jwtScope('create:rules_user',options), setAdminPermission(false), rulesController.addRule);
router.delete('/containers/:containerId/rules/:ruleId',jwtScope('delete:rules_user',options), setAdminPermission(false),rulesController.deleteRule);
/*
Containers:

  /containers
    -GET OK
*/

router.get('/containers',jwtScope('read:containers_user',options), setAdminPermission(false), containersController.getContainers);

module.exports = router;