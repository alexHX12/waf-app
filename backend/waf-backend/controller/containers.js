const { exec } = require('child_process');
const fs = require('fs');
const Container = require('../schemas/container');
const axios = require("axios");

module.exports = {
  //OK
  getContainers: async function (req, res, next) {
    if(req.isAdmin&&req.adminMode){
      var allContainers=await Container.find().lean();//Oggetto JS di base
      const api_mngmnt_token=(await require("../app").api_mngmnt_promise).data.access_token;
      for(var i=0;i<allContainers.length;i++){
        var options2 = {
          method: "GET",
          url: "https://dev-fmeenf3n.us.auth0.com/api/v2/users/"+allContainers[i].user_id,
          headers: { "authorization": "Bearer " + api_mngmnt_token },
        };
        var res2=await axios(options2);
        allContainers[i]['user_id']=res2.data;
      }
    }else{
      allContainers=await Container.find({user_id:req.user.sub});
    }
    res.contentType('application/json');
    res.send(JSON.stringify(allContainers));
  },

  //OK
  addContainer: async function (req, res, next) {
    const newContainer = new Container(req.body);
    const result = await newContainer.save();
    domain=newContainer.domain;
    url=newContainer.url;
    var container="Use VHost "+domain+" http://"+url+"\n";
    fs.appendFileSync("/usr/local/apache2/conf/extra/httpd-vhosts.conf",container);
    res.contentType('application/json');
    res.status(200).send(result);
    exec("touch /vol/vhosts-custom-rules/"+domain+".conf && apachectl restart",(error, stdout, stderr) => {
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
  deleteContainer: async function(req, res, next){
    const result=await Container.findByIdAndDelete(req.params.containerId);
    result.url="http://"+result.url;
    result.url=result.url.replace(/\//g, "\\/");
    exec("echo \"$(sed \"/Use VHost "+result.domain+" "+result.url+"/d\" /usr/local/apache2/conf/extra/httpd-vhosts.conf)\" > /usr/local/apache2/conf/extra/httpd-vhosts.conf",(error, stdout, stderr) => {
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