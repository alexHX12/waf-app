const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const Rule = require('../schemas/rule');
const Container = require('../schemas/container');

module.exports = {

  //OK
  getRules: function (req, res, next) {
    fs.readdir("/etc/modsecurity.d/owasp-crs/rules/", async function (err, files) {
      var ruleSetRes = {};
      ruleSetRes.ruleSetName = "OWASP Core Rule Set (CRS)"
      ruleSetRes.confFiles = files.filter(el => path.extname(el) === '.conf').map(el=>path.parse(el).name);
      var allRules={};
      allRules['set']=ruleSetRes;
      if(req.isAdmin&&req.adminMode){
        allRules['custom']=await Rule.find({isGlobal:true});
      }else if((req.isAdmin&&!req.adminMode)||((await Container.findOne({user_id:req.user.sub}))._id==req.params.containerId)){//Verifico proprieta' del container
        allRules['custom']=await Rule.find({container_id:req.params.containerId});
      }else{
        req.authorized=false;
        res.status(403);//Non autorizzato
      }
      if(!req.authorized){
        res.send();
      }else{
        res.contentType('application/json');
        res.send(JSON.stringify(allRules));
      }
    })
  },

  //OK
  addRule: async function (req, res, next) {
    req.body['user_id']=req.user.sub;
    req.body['isGlobal']=(req.isAdmin&&req.adminMode)?true:false;
    const newRule = new Rule(req.body);
    const result = await newRule.save();
    id=newRule._id;
    phase=newRule.phase;
    action=newRule.action;
    msg=newRule.desc;
    var rule=req.body.text+" \"id:"+id+",phase:"+phase+",t:none,t:lowercase,"+action+",status:403,log,"+"msg:'"+msg+"'\"\n";
    if(req.isAdmin&&req.adminMode){
      fs.appendFileSync("/usr/local/apache2/conf/extra/waf-custom.conf",rule);
    }else if((req.isAdmin&&!req.adminMode)||((await Container.findOne({user_id:req.user.sub}))._id==req.params.containerId)){//Verifico proprieta' del container
      containerDomain=(await Container.findById(req.params.containerId)).domain;
      console.log(containerDomain);
      fs.appendFileSync("/vol/vhosts-custom-rules/"+containerDomain+".conf",rule);
    }else{
      req.authorized=false;
      res.status(403);//Non autorizzato
    }
    if(!req.authorized){
      res.send();
    }else{
      res.contentType('application/json');
      res.status(200).send(result);
    }
    exec("apachectl restart",(error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
    });
  },

  //OK
  deleteRule: async function(req, res, next){
    const result=await Rule.findByIdAndDelete(req.params.ruleId);
    rule=result.text.replace(/\./g, "\\.").replace(/\"/g,"\\\"")+" \\\"id:"+result._id+",phase:"+result.phase+",t:none,t:lowercase,"+result.action+",status:403,log,"+"msg:'"+result.desc+"'\\\"";
    if((req.isAdmin&&!req.adminMode)||(!req.isAdmin&&(await Container.findOne({user_id:req.user.sub}))._id==req.params.containerId)){//Verifico proprieta' del container
      containerDomain=(await Container.findById(req.params.containerId)).domain;
    }else if(!req.isAdmin){
      req.authorized=false;
      res.status(403);//Non autorizzato
    }
    if(!req.authorized){
      res.send();
    }else{
      cmd=(req.isAdmin&&req.adminMode)?
      "echo \"$(sed \"/"+rule+"/d\" /usr/local/apache2/conf/extra/waf-custom.conf)\" > /usr/local/apache2/conf/extra/waf-custom.conf":
      "echo \"$(sed \"/"+rule+"/d\" /vol/vhosts-custom-rules/"+containerDomain+".conf)\" > /vol/vhosts-custom-rules/"+containerDomain+".conf"
      exec(cmd,(error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.status(200).send(result);
        exec("apachectl restart",(error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          console.log(`stdout: ${stdout}`);
        });
      });
    }
  }
}