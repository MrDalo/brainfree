const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "welcome to brainfree" });
});

require("./app/routes/routes.js")(app);

app.listen(8080, () => {
    console.log("Server is running on port 8080.");
});