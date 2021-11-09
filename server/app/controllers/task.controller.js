const Task = require("../models/task.model.js");

exports.create = (req, res) => {
    if (Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Request cannot be empty"
        });
    }

    const task = new Task({
        name : req.body.name,
        description : req.body.description,
        priority : req.body.priority,
        deadline : req.body.deadline,
        complete : req.body.complete,
        user : req.body.user
    });
    
    console.log("task controller here, new task details:", task);
    Task.create(task, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Error occured while creating task"
            });
        } else {
            res.send(data);
        }
    });
};

exports.find = (req, res) => {
    Task.find(req.params.user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : "No task associated with user: " + req.params.username
                });
            } else {
                res.status(500).send({
                    message : "Error finding task " + req.params.username
                });
            }
        } else {
            res.send(data);
        }
    });
};