/**
 * @file task.model.js
 * @author Adam Kulla
 * @bief Subor, ktory sluzi ako model pre uzivatelske tasky v DB - pracu s nimi
 */

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
    connection.query("SELECT * FROM tasks WHERE user = ?", username , (err, res) => {
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

Task.removeById = (id, result) => {
    connection.query("DELETE FROM tasks WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
          }
      
          console.log("deleted task: ", id);
          result(null, res);
    });
};

Task.removeByUser = (user, result) => {
    connection.query("DELETE FROM tasks WHERE user = ?", user, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
          }
      
          console.log("deleted tasks by: ", user);
          result(null, res);
    });
};

Task.update = (id, task, result) => {
    connection.query(
        "UPDATE tasks SET name = ?, description = ?, priority = ?, deadline = ?, complete = ? WHERE id = ?",
        [task.name, task.description, task.priority, task.deadline, task.complete, id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }
        
              if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
              }
        
              console.log("updated task: ", { id: id, ...task });
              result(null, { id: id, ...task });
        }
    );
};
module.exports = Task;