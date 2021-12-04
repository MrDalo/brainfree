/**
 * @file db.js
 * @author Adam Kulla
 */

const mysql = require("mysql2");
//const Pool = require("mysql2/typings/mysql/lib/Pool");
const db = require("../config/db.config.js");

const connection = mysql.createConnection({
    host : db.host,
    port : db.port,
    user : db.user,
    password : db.pass,
    database : db.db,
});


connection.connect(error => {
    if (error) {
        throw error;
    }
    console.log("Successfully connected to the database.");
});


setInterval(()=>{
    connection.query("SELECT * FROM tasks WHERE user = ?", "example", (err, res)=>{
        if (err) {
            console.log("Connection Closed");
        }

        if (res.length) {
            console.log("Connection active");
        }

    });
},500000);


module.exports = connection;
