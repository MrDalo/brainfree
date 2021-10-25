var mysql = require('mysql2');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'DBp5wR0',
    database : 'brainfree'
});

var app = express();
app.use(session({
	secret: 'Th15.IS.53cRet',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/doLogin', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('https://www.wedevs.sk/brainfree/user/index.html');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
app.post('/register', function(request, response) {
	var username = request.body.username;
    var email = request.body.email;
	var password = request.body.password;
    console.log("adding user " + username);
	if (username && password && email) {
		connection.query('INSERT INTO users (username, password, email) VALUES ("' + username + '", "' + password + '", "' + email + '")');
        response.end;
        response.redirect('/');
    }
});
app.listen(3000);
