const fs = require('fs');

module.exports = {
    getLog:function(req, res) {
        fs.readFile("/vol/audit.log",(err,data)=>{
            res.contentType('application/json');
            res.send(data);
        })
    }
}
