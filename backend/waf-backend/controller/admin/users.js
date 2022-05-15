const axios = require("axios");

module.exports = {
    getUsers: async function (req, res, next) {
        const api_mngmnt_token=(await require("../../app").api_mngmnt_promise).data.access_token;
        const options2 = {
            method: "GET",
            url: "https://dev-fmeenf3n.us.auth0.com/api/v2/users",
            headers: { "authorization": "Bearer " + api_mngmnt_token },
        };
        axios(options2)
            .then(res2 => {
                res.contentType('application/json');
                res.send(res2.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
}