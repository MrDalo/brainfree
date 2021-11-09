const User = require("../models/user.model.js");

exports.create = (req, res) => {
    if (Object.keys(req.body).length === 0){
        req.status(400).send({
            message: "Request cannot be empty"
        });
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
                res.status(404).send({
                    message : "No user with username: " + req.params.username
                });
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
                res.status(404).send({
                    message : "No user with username: " + req.params.username
                });
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