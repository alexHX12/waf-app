const { exec } = require('child_process');
const fs = require('fs');

module.exports = {
    cmd_exec: function (cmd) {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        });
    },

    cmd_exec_copyFile: function(cmd,fileSPath,fileDPath){
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            fs.copyFile(fileSPath,fileDPath,(err)=>{
                console.log(err);
            })
        });
    }
    ,

    restart_apache: function () {
        this.cmd_exec("apachectl restart");
    }
}