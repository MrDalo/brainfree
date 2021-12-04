/**
 * @file server.js
 * @author Adam Kulla
 * @bief Subor, ktory sluzi ako server, ktory sa spusta vzdialene na VPS
 */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');





app.use((req, res, next)=>{
//	res.header('Access-Control-Allow-Origin',"*");
//	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//	res.header('Access-Control-Allow-Headers', 'Content-Type, application/x-www-form-urlencodedi');
	res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Max-Age", "3600");
        res.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept, X-Auth-Token, X-CSRF-TOKEN");

	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,observe");


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
