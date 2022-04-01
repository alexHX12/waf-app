const path = require('path');
const fs = require('fs');
const Rule = require('../schemas/rule');

module.exports = {
  getRules: function (req, res, next) {
    fs.readdir("/etc/modsecurity.d/owasp-crs/rules/", function (err, files) {
      var ruleSetRes = {};
      ruleSetRes.ruleSetName = "OWASP Core Rule Set (CRS)"
      ruleSetRes.confFiles = files.filter(el => path.extname(el) === '.conf');
      res.contentType('application/json');
      res.send(JSON.stringify(ruleSetRes));
    })
  },

  addRule: async function (req, res, next) {
    console.log("Nome:" + req.body.name + "\nDesc:" + req.body.desc + "\nText:" + req.body.text);
    const newRule = new Rule(req.body);
    console.log(newRule);
    const result = await newRule.save();
    res.status(200).send(result);
  }
}