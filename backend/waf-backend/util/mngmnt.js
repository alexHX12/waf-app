const axios=require('axios');

module.exports = {
    getMngmntToken: async function () {
        const options = {
            method: 'POST',
            url: process.env.domain + 'oauth/token',
            headers: { 'content-type': 'application/json' },
            data: {
                client_id: process.env.client_id,
                client_secret: process.env.client_secret,
                audience: process.env.domain + "api/v2/",
                grant_type: "client_credentials"
            }
        };
        global.mngmnt_token = (await axios(options)).data.access_token;
    }
}