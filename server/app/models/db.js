const mysql = require("mysql2");
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

module.exports = connection;
