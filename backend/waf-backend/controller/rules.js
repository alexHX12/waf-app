const path = require('path');
const fs = require('fs');
const Rule = require('../schemas/rule');

module.exports = {
  getRules: function (req, res, next) {
    fs.readdir("/etc/modsecurity.d/owasp-crs/rules/", async function (err, files) {
      var ruleSetRes = {};
      ruleSetRes.ruleSetName = "OWASP Core Rule Set (CRS)"
      ruleSetRes.confFiles = files.filter(el => path.extname(el) === '.conf');
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
    var rule=req.body.text+"\\\n"+"\"id:"+id+",phase:"+phase+",t:none,t:lowercase,"+action+",status:403,log,"+"msg:'"+msg+"'\"\n";
    fs.appendFileSync("/usr/local/apache2/conf/extra/waf-custom.conf",rule);
    res.status(200).send(result);
  }
}