module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const tasks = require("../controllers/task.controller.js");

    app.post("/users", users.create);
    app.get("/users/:username", users.find);
    app.delete("/users/:username", users.remove);
    app.post("/login", users.loginCheck);

    app.post("/tasks", tasks.create);
    //TODO: GET 1 task
    app.get("/tasks/:user", tasks.find);
    app.put("/tasks/:taskId", tasks.update);
    app.delete("/taskById/:taskId", tasks.removeById);
    app.delete("/taskByUser/:user", tasks.removeByUser);
}