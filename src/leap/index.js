var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', function(req, res){
//    res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.broadcast.emit('Welcome');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

var leapSocket = require('ws');
var leap = new leapSocket('ws://127.0.0.1:6437');

leap.on('message', function(data, flags) {
//    console.log(data);
    io.emit('leap message', data);
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
