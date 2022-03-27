const path = require('path');
const fs = require('fs');

module.exports = {
  getRules: function (req, res, next) {
    fs.readdir("/etc/modsecurity.d/owasp-crs/rules/", function (err, files) {
      var ruleSetRes={};
      ruleSetRes.ruleSetName="OWASP Core Rule Set (CRS)"
      ruleSetRes.confFiles = files.filter(el => path.extname(el) === '.conf');
      res.contentType('application/json');
      res.send(JSON.stringify(ruleSetRes));
    })
  }
}