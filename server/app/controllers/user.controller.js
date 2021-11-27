const User = require("../models/user.model.js");

exports.create = (req, res) => {
    if (Object.keys(req.body).length === 0){
        req.status(200).send(
          "RequestEmpty"
        );
    }

    const user = new User({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email
    });
    
    console.log("user controller here, new user details:", user);
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Error occured while creating user"
            });
        } else {
            res.send(data);
        }
    });
};

exports.find = (req, res) => {
    User.find(req.params.username, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(200).send(
                 "NonexistUser"
                );
            } else {
                res.status(500).send({
                    message : "Error finding user " + req.params.username
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.remove = (req, res) => {
    User.remove(req.params.username, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(
                "NotFound"
                );
            } else {
                res.status(500).send({
                    message : "Error deleting user " + req.params.username
                });
            }
        } else {
            res.send({message : "User deleted successfully"});
        }
    });
};

exports.loginCheck = (req, res) => {
    if (Object.keys(req.body).length === 0){
        req.status(200).send(
          "RequestEmpty"
        );
    }

    User.find(req.body.username, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(200).send(
		"notFound"
                );
            } else {
                res.status(500).send({
                    message : "Error finding user " + req.params.username
                });
            }
        } else {
            if (data.password == req.body.password){
                res.status(200).send({
                    token : data.username
                });
            }else{
		res.status(200).send(
			"incorrectPassword"	
		);

	    }
        }
    });

}
