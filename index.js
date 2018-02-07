/**
 * Dependencies
 */


var express = require("express");
var serveStatic = require('serve-static');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 5000;
var users = [];
var connections = [];
var io = require('socket.io').listen(app.listen(PORT));


/**
 * Configuration
 */
app.set('views', path.join(__dirname + '/public/views'));
app.set('view engine', "pug");
app.engine('pug', require('pug').__express);
/**
 * Routes
 */
app.get("/", function(req, res){
	res.render("page");
});

app.use(express.static(path.join(__dirname + '/public')));
console.log("Listening on port " + PORT);


/**
* Chatroom
*/

io.sockets.on('connection', function (socket) {
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);
	updateUsernames();
    socket.emit('message', { message: 'Welcome! Enter a username and get started!' });

//Add Users
    socket.on('add', function (data) {
    	
    	socket.username = data;
        io.sockets.emit('message', {message: socket.username + ' has joined the chat.'});
    	users.push(socket.username);
    	updateUsernames(data);
        
    	console.log('add', data);
    	io.sockets.emit('username', data);

    });


//Remove Users
	socket.on('remove', function (data) {

		socket.username = data;
        io.sockets.emit('message', {message: socket.username + ' has left the chat.'});
		users.splice(users.indexOf(socket.username), 1);
		updateUsernames(data);
		console.log('remove', data);
		io.sockets.emit('username', data);
	})
//Send Messages
    socket.on('send', function (data) {
    	console.log('send', data);
        io.sockets.emit('message', data);

    });   



//Disconnect
    socket.on('disconnect', function(data) {

    	users.splice(users.indexOf(socket.username), 1);
    	console.log('disconnect', data);
    	updateUsernames(data);
    	connections.splice(connections.indexOf(socket), 1);
    	console.log('Disonnected: %s sockets connected', connections.length);
    })

//Username Update
    function updateUsernames(data) {
    	io.sockets.emit('get users', users);
    }
    console.log('made socket connection', socket.id);

	});



	





