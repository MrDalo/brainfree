module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const tasks = require("../controllers/task.controller.js");

    app.post("/users", users.create);

    app.post("/tasks", tasks.create);

    app.get("/users/:username", users.find);

    app.get("/tasks/:user", tasks.find);
}