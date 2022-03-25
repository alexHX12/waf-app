const path = require('path');
const fs = require('fs');

module.exports = {
  getRules: function (req, res, next) {
    fs.readdir("/etc/modsecurity.d/owasp-crs/rules/", function (err, files) {
      const confFiles = files.filter(el => path.extname(el) === '.conf');
      res.contentType('application/json');
      res.send(JSON.stringify(confFiles));
    })
  }
}