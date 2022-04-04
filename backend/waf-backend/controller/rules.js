const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const Rule = require('../schemas/rule');

module.exports = {
  getRules: function (req, res, next) {
    fs.readdir("/etc/modsecurity.d/owasp-crs/rules/", async function (err, files) {
      var ruleSetRes = {};
      ruleSetRes.ruleSetName = "OWASP Core Rule Set (CRS)"
      ruleSetRes.confFiles = files.filter(el => path.extname(el) === '.conf').map(el=>path.parse(el).name);
      var allRules={};
      allRules['set']=ruleSetRes;
      allRules['custom']=await Rule.find();
      res.contentType('application/json');
      res.send(JSON.stringify(allRules));
    })
  },

  addRule: async function (req, res, next) {
    const newRule = new Rule(req.body);
    const result = await newRule.save();
    id=newRule._id;
    phase=newRule.phase;
    action=newRule.action;
    msg=newRule.desc;
    var rule=req.body.text+" \"id:"+id+",phase:"+phase+",t:none,t:lowercase,"+action+",status:403,log,"+"msg:'"+msg+"'\"\n";
    fs.appendFileSync("/usr/local/apache2/conf/extra/waf-custom.conf",rule);
    res.contentType('application/json');
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
  },

  deleteRule: async function(req,res,next){
    const result=await Rule.findByIdAndDelete(req.params.ruleId);
    rule=result.text.replace(/\./g, "\\.").replace(/\"/g,"\\\"")+" \\\"id:"+result._id+",phase:"+result.phase+",t:none,t:lowercase,"+result.action+",status:403,log,"+"msg:'"+result.desc+"'\\\"";
    console.log("sed '/"+rule+"/d'");
    exec("echo \"$(sed \"/"+rule+"/d\" /usr/local/apache2/conf/extra/waf-custom.conf)\" > /usr/local/apache2/conf/extra/waf-custom.conf",(error, stdout, stderr) => {
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