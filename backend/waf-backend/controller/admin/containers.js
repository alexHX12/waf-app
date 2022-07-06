const fs = require('fs');
const Container = require('../../schemas/container');
const axios = require("axios");
const util = require('../../util/cmd');

module.exports = {
  getContainers: async function (req, res, next) {
    var allContainers = await Container.find().lean();//Oggetto JS di base
    const api_mngmnt_token = (await mngmnt_token).data.access_token;
    for (var i = 0; i < allContainers.length; i++) {
      var options2 = {
        method: "GET",
        url: process.env.domain+"/api/v2/users/" + allContainers[i].user_id,
        headers: { "authorization": "Bearer " + api_mngmnt_token },
      };
      var res2 = await axios(options2);
      allContainers[i]['user_id'] = res2.data;
    }
    res.contentType('application/json');
    res.send(JSON.stringify(allContainers));
  },

  addContainer: async function (req, res, next) {
    const newContainer = new Container(req.body);
    const result = await newContainer.save();
    domain = newContainer.domain;
    url = newContainer.url;
    var container = "Use VHost " + domain + " http://" + url + "\n";
    fs.appendFileSync("/vol/waf-vhosts.conf", container);
    res.contentType('application/json');
    var cmd="touch /vol/vhosts-custom-rules/" + domain + ".conf";
    util.cmd_exec(cmd);
    res.status(200).send(result);
    util.restart_apache();
  },

  deleteContainer: async function (req, res, next) {
    const result = await Container.findByIdAndDelete(req.params.containerId);
    result.url = "http://" + result.url;
    result.url = result.url.replace(/\//g, "\\/");
    var cmd="echo \"$(sed \"/Use VHost " + result.domain + " " + result.url + "/d\" /vol/waf-vhosts.conf)\" > /vol/waf-vhosts.conf";
    util.cmd_exec(cmd);
    res.status(200).send(result);
    util.restart_apache();
  }
}