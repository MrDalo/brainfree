const connection = require("./db.js");

const User = function(user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
};

User.create = (newUser, result) => {
    connection.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("errror: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", {id: res.insertId, ...newUser});
        result(null, { id: res.insertId, ...newUser });
    });
};

User.find = (username, result) => {
    connection.query("SELECT * FROM users WHERE username = '" + username  + "'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return; 
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({kind : "not_found"}, null);
    });
};
module.exports = User;