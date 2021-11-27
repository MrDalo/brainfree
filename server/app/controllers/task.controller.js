const Task = require("../models/task.model.js");

exports.create = (req, res) => {
    if (Object.keys(req.body).length === 0){
        res.status(200).send(
           "RequestEmpty"
        );
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
                res.status(200).send(
                "NotFound"
                );
            } else {
                res.status(500).send({
                    message : "Error finding task " + req.params.user
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.removeById = (req, res) => {
    Task.removeById(req.params.taskId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(200).send(
                  "NotFound"
                );
            } else {
                res.status(500).send({
                    message : "Error deleting task " + req.params.taskId
                });
            }
        } else {
            res.send({message : "Task deleted successfully"});
        }
    });
};

exports.removeByUser = (req, res) => {
    Task.removeByUser(req.params.user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(200).send(
                "NotFound"
                );
            } else {
                res.status(500).send({
                    message : "Error deleting tasks from: " + req.params.user
                });
            }
        } else {
            res.send({message : "Tasks deleted successfully"});
        }
    });
};

exports.update = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(200).send(
        "RequestEmpty"
        );
    }
    console.log(req.body);
    Task.update(req.params.taskId, new Task(req.body), (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(200).send(
              "NotFound"
              );
            } else {
              res.status(500).send({
                message: "Error updating task with id " + req.params.taskId
              });
            }
          } else res.send(data);
    });
};
