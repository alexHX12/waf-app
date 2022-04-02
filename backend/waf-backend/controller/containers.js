const { exec } = require('child_process');
const fs = require('fs');
const Container = require('../schemas/container');

module.exports = {
  getContainers: function (req, res, next) {
    exec("sed -n -e 's/^.*Use VHost //p' /usr/local/apache2/conf/extra/httpd-vhosts.conf",(error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      output=stdout.split(/\r?\n/).slice(0, -1);
      outputFormatted=[];
      output.forEach(el => {
        tokens=el.split(" ");
        token_obj={};
        token_obj['domain']=tokens[0];
        token_obj['url']=tokens[1];
        outputFormatted.push(token_obj);
      });
      res.status(200).send(outputFormatted);
  });
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
        res.status(200).send(result);
    });
  },

  deleteContainer:function(req,res,next){
    exec("echo \"$(sed '/Use VHost test2.localhost http:\\/\\/fattiunpanino.altervista.org/d' /usr/local/apache2/conf/extra/httpd-vhosts.conf)\" > /usr/local/apache2/conf/extra/httpd-vhosts.conf",(error, stdout, stderr) => {
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
    });
  }
}