const connection = require("./db.js");

const Task = function(task) {
    this.name = task.name;
    this.description = task.description;
    this.priority = task.priority;
    this.deadline = task.deadline;
    this.complete = task.complete;
    this.user = task.user;
};

Task.create = (newTask, result) => {
    connection.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
        if (err) {
            console.log("errror: ", err);
            result(err, null);
            return;
        }
        console.log("created task: ", {id: res.insertId, ...newTask});
        result(null, { id: res.insertId, ...newTask });
    });
};

Task.find = (username, result) => {
    connection.query("SELECT * FROM tasks WHERE user = '" + username  + "'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return; 
        }

        if (res.length) {
            console.log("found task: ", res);
            result(null, res);
            return;
        }

        result({kind : "not_found"}, null);
    });
};
module.exports = Task;