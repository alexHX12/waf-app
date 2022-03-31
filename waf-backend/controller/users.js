var api_mngmnt_token=require("../app").api_mngmnt_token;

module.exports = {
    getUsers: function (req, res) {
        const options2 = {
            method: "GET",
            url: "https://dev-fmeenf3n.us.auth0.com/api/v2/users",
            headers: { "authorization": "Bearer " + api_mngmnt_token },
        };
        axios(options2)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
}