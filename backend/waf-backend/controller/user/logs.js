const fs = require('fs');
const Container = require('../../schemas/container');

module.exports = {
    getLog: async function(req, res, next) {
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
        result=JSON.parse(formattedLog);
        if((req.isAdmin&&!req.adminMode)||(!req.isAdmin&&(await Container.findOne({user_id:req.user.sub}))._id==req.params.containerId)){//Verifico proprieta' del container
            containerDomain=(await Container.findById(req.params.containerId)).domain;
            result=result.filter(el=>el.request.headers.Host==containerDomain);
        }else if(!req.isAdmin){
            req.authorized=false;
            res.status(403);//Non autorizzato
        }
        if(!req.authorized){
            res.send();
        }else{
            result.map(el => {
                messages=el.audit_data.messages;
                if(messages!=undefined){
                    el.audit_data.messages={};
                    el.audit_data.messages['type']=messages[0].split(".")[0];
                    el.audit_data.messages['matched_pattern']=messages[1].split(".")[1];
                    el.audit_data.messages['matched_pattern']=el.audit_data.messages['matched_pattern'].substring(el.audit_data.messages['matched_pattern'].indexOf("\"") + 1, el.audit_data.messages['matched_pattern'].lastIndexOf("\""));
                    msg_tmp=messages[0].split("[");
                    msg_string="";
                    m_data_string="";
                    sev_string="";
                    msg_tmp.forEach(el2 => {
                        if(el2.includes("msg")){
                            msg_string=el2.substring(el2.indexOf("\"") + 1, el2.lastIndexOf("\""));
                        }else if(el2.includes("data")){
                            m_data_string=el2.substring(el2.indexOf("\"") + 1, el2.lastIndexOf("\"")).replace('Matched Data: ','');
                        }else if(el2.includes("severity")){
                            sev_string=el2.substring(el2.indexOf("\"") + 1, el2.lastIndexOf("\""));
                        }
                    });
                    el.audit_data.messages['msg']=msg_string;
                    el.audit_data.messages['matched_data']=m_data_string;
                    el.audit_data.messages['severity']=sev_string;
                }
                return el;
            });
            res.contentType('application/json');
            res.send(result);
        }
    }
}
