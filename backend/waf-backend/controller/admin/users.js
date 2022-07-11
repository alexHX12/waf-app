module.exports = {
    getUsers: async function (req, res, next) {
        const options2 = {
            method: "GET",
            url: process.env.domain+"api/v2/users",
            headers: { "authorization": "Bearer " + mngmnt_token },
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