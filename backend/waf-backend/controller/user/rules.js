const child_process = require('child_process');
const path = require('path');
const fs = require('fs');
const Rule = require('../../schemas/rule');
const Container = require('../../schemas/container');
const util = require('../../util/cmd');

module.exports = {
  getRules: function (req, res, next) {
    fs.readdir("/etc/modsecurity.d/owasp-crs/rules/", async function (err, files) {
      var ruleSetRes = {};
      ruleSetRes.ruleSetName = "OWASP Core Rule Set (CRS)"
      ruleSetRes.confFiles = files.filter(el => path.extname(el) === '.conf').map(el=>path.parse(el).name);
      var allRules={};
      allRules['set']=ruleSetRes;
      if((req.isAdmin&&!req.adminMode)||((await Container.findOne({user_id:req.user.sub}))._id==req.params.containerId)){//Verifico proprieta' del container
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

  addRule: async function (req, res, next) {
    req.body['user_id']=req.user.sub;
    req.body['isGlobal']=false;
    req.body.text=req.body.text.replace(/\s/g,' ');
    var preflightRule=req.body.text+" \"id:100,phase:"+req.body.phase+",t:none,t:lowercase,"+req.body.action+",status:403,log,"+"msg:'"+req.body.desc+"',severity:'"+req.body.severity+"'\"\n";
    fs.writeFileSync("/tmp/rule_tmp",preflightRule);
    var isValidRule=true;
    try {
      child_process.execSync("./modsec_lexer.py /tmp/rule_tmp");
    } catch (error) {
      isValidRule=false;
      console.log("Not valid rule!");
    }
    if(!isValidRule){
      res.contentType('application/json');
      res.status(400).send({'error:':'not valid rule!'});
    }else{
      const newRule = new Rule(req.body);
      const result = await newRule.save();
      id=newRule._id;
      severity=newRule.severity;
      phase=newRule.phase;
      action=newRule.action;
      msg=newRule.desc;
      text=newRule.text;
      var rule=text+" \"id:"+id+",phase:"+phase+",t:none,t:lowercase,"+action+",status:403,log,"+"msg:'"+msg+"',severity:'"+severity+"'\"\n";
      if((req.isAdmin&&!req.adminMode)||((await Container.findOne({user_id:req.user.sub}))._id==req.params.containerId)){//Verifico proprieta' del container
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
      util.restart_apache();
    }
  },

  deleteRule: async function(req, res, next){
    const result=await Rule.findByIdAndDelete(req.params.ruleId);
    rule=result.text.replace(/\./g, "\\.").replace("/","\\/").replace(/\"/g,"\\\"")+" \\\"id:"+result._id+",phase:"+result.phase+",t:none,t:lowercase,"+result.action+",status:403,log,"+"msg:'"+result.desc+"',severity:'"+result.severity+"'\\\"";
    if((req.isAdmin&&!req.adminMode)||(!req.isAdmin&&(await Container.findOne({user_id:req.user.sub}))._id==req.params.containerId)){//Verifico proprieta' del container
      containerDomain=(await Container.findById(req.params.containerId)).domain;
    }else if(!req.isAdmin){
      req.authorized=false;
      res.status(403);//Non autorizzato
    }
    if(!req.authorized){
      res.send();
    }else{
      cmd="echo \"$(sed \"/"+rule+"/d\" /vol/vhosts-custom-rules/"+containerDomain+".conf)\" > /vol/vhosts-custom-rules/"+containerDomain+".conf";
      util.cmd_exec(cmd);
      res.status(200).send(result);
      util.restart_apache();
    }
  }
}