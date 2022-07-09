const fs = require('fs');

module.exports = {
    getLog: async function (req, res, next) {
        var formattedLog = "[";
        var lines = fs.readFileSync("/vol/audit.log", "ascii").split(/\r?\n/).slice(0, -1);
        for (var i = 0; i < lines.length; i++) {
            if (i != lines.length - 1) {
                formattedLog += lines[i] + ",";
            } else {
                formattedLog += lines[i];
            }
        }
        formattedLog += "]";
        result = JSON.parse(formattedLog);
        res_data=[];
        var j=0;
        for(var i=0;i<result.length;i++){
            res_tmp_data={};
            res_tmp_data["datetime"]=result[i].transaction.time;
            res_tmp_data["client_socket"]=result[i].request.headers.Host+":"+result[i].transaction.local_port;
            res_tmp_data["container_socket"]=result[i].transaction.remote_address+":"+result[i].transaction.remote_port;
            res_tmp_data["matched_data"] = result[i].request.request_line;
            messages = result[i].audit_data.messages;
            if (messages != undefined) {
                res_tmp_data['type'] = messages[0].split(".")[0];
                res_tmp_data['matched_pattern'] = messages[0].split(".")[1];
                msg_tmp = messages[0].split("[");
                msg_string = "";
                sev_string = "";
                msg_tmp.forEach(el2 => {
                    if (el2.includes("msg")) {
                        msg_string = el2.substring(el2.indexOf("\"") + 1, el2.lastIndexOf("\""));
                    } else if (el2.includes("data")) {
                        m_data_string = el2.substring(el2.indexOf("\"") + 1, el2.lastIndexOf("\"")).replace('Matched Data: ', '');
                    } else if (el2.includes("severity")) {
                        sev_string = el2.substring(el2.indexOf("\"") + 1, el2.lastIndexOf("\""));
                    }
                });
                res_tmp_data['threat'] = msg_string;
                res_tmp_data['severity'] = sev_string;
                if(res_tmp_data['severity']!=""){
                    res_data[j]={};
                    res_data[j]=res_tmp_data;
                    j++;
                }
            }
        }
        res.contentType('application/json');
        res.send(res_data);

    }
}
