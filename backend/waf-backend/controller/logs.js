const fs = require('fs');

module.exports = {
    getLog:function(req, res) {
        var formattedLog="[";
        var notEmptyLines=[];
        fs.readFileSync("/vol/audit.log","ascii").split(/\r?\n/).forEach((line)=>{
            if(line!=""){
                notEmptyLines.push(line);
            }
        })
        for(var i=0;i<notEmptyLines.length;i++){
            if(i!=notEmptyLines.length-1){
                formattedLog+=notEmptyLines[i]+",";
            }else{
                formattedLog+=notEmptyLines[i];
            }
        }
        formattedLog+="]";
        res.contentType('application/json');
        res.send(formattedLog);
    }
}
