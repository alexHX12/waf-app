const fs = require('fs');

module.exports = {
    getLog:function(req, res) {
        var formattedLog="[";
        var lines=fs.readFileSync("/vol/audit.log","ascii").split(/\r?\n/).slice(0, -1);
        for(var i=0;i<lines.length;i++){
            if(i!=lines.length-1){
                formattedLog+=lines[i]+",";
            }else{
                formattedLog+=lines[i];
            }
        }
        formattedLog+="]";
        res.contentType('application/json');
        res.send(formattedLog);
    }
}
