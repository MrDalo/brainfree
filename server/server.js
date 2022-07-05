/**
 * @file server.js
 * @author Adam Kulla
 * @bief Subor, ktory sluzi ako server, ktory sa spusta vzdialene na VPS
 */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const https = require("https");
const http = require("http");
const fs = require("fs");





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



https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(8443, () => {
    console.log("server is running at port 8443 HTTPS");
  });

  http.createServer(app).listen(8080, () =>{
    console.log("server is running at port 8080 HTTP");
  });
