const { exec } = require('child_process');
const fs = require('fs');
const Container = require('../schemas/container');

module.exports = {
  getContainers: async function (req, res, next) {
    allContainers=await Container.find();
    res.contentType('application/json');
    res.send(JSON.stringify(allContainers));
  },

  addContainer: async function (req, res, next) {
    const newContainer = new Container(req.body);
    const result = await newContainer.save();
    domain=newContainer.domain;
    url=newContainer.url;
    var container="Use VHost "+domain+" "+url+"\n"
    fs.appendFileSync("/usr/local/apache2/conf/extra/httpd-vhosts.conf",container);
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

  deleteContainer: async function(req,res,next){
    const result=await Container.findByIdAndDelete(req.params.containerId);
    result.url=result.url.replace(/\//g, "\\/");
    exec("echo \"$(sed '/Use VHost "+result.domain+" "+result.url+"/d' /usr/local/apache2/conf/extra/httpd-vhosts.conf)\" > /usr/local/apache2/conf/extra/httpd-vhosts.conf",(error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
      res.status(200).send();
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