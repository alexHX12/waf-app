const Container = require('../../schemas/container');

module.exports = {
  getContainers: async function (req, res, next) {
    allContainers=await Container.find({user_id:req.user.sub});
    res.contentType('application/json');
    res.send(JSON.stringify(allContainers));
  }
}