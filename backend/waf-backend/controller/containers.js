const { exec } = require('child_process');
const fs = require('fs');
const Container = require('../schemas/container');

module.exports = {
  getContainers: function (req, res, next) {

  },

  addContainer: async function (req, res, next) {
    const newContainer = new Container(req.body);
    const result = await newContainer.save();
    domain=newContainer.domain;
    url=newContainer.url;
    var container="Use VHost "+domain+" "+url+"\n"
    fs.appendFileSync("/usr/local/apache2/conf/extra/httpd-vhosts.conf",container);
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
    })
    res.status(200).send(result);
  }
}