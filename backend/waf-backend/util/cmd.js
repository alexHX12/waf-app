const { exec } = require('child_process');

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

    restart_apache: function () {
        this.cmd_exec("apachectl restart");
    }
}