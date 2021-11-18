const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');





app.use((req, res, next)=>{
	res.header('Access-Control-Allow-Origin',"*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, application/x-www-form-urlencodedi');
	next();
});



app.use(express.json());

app.use(express.urlencoded({ extended: true }));




app.get("/", (req, res) => {
    res.json({ message: "welcome to brainfree" });
});

require("./app/routes/routes.js")(app);

app.listen(8080, () => {
    console.log("Server is running on port 8080.");
});
