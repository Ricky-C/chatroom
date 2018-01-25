/**
 * Dependencies
 */


var express = require("express");
var serveStatic = require('serve-static');
var path = require('path');
var app = express();
var port = 3700;

var io = require('socket.io').listen(app.listen(port));


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

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome! Enter a username and get started!' });
    socket.on('send', function (data) {
    	console.log('send', data);
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port " + port);


