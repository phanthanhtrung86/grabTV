var sys = require("sys");
var express = require('express');
//var ws = require('../lib/ws');
/*var ws = require('../node_modules/ws');
var server = ws.createServer({
  debug: true
});*/
var app = require('express').createServer();
// in this circumstance , we don't need io here
//var io = require('socket.io').listen(app);

app.listen(8000);
// routing
app.use(express.logger('dev'));
app.use(express.static(__dirname ));
// in this circumstance , we don't need io here
app.use(express.static('socket.io/lib' ));


app.get('/video-controller.html', function (req, res) {
  res.sendfile((__dirname + '/video-controller.html'));
});

app.get('/video-client.html', function (req, res) {
  res.sendfile((__dirname + '/video-client.html'));
});

var userCount = [];

/*
server.addListener("connection", function(conn){
  server.broadcast("userCount " + ++userCount);
  conn.addListener("message", function(message){
    server.broadcast(message);
  });
});*/

/*

server.addListener("close", function(conn){
  server.broadcast("userCount " + --userCount);
});

server.listen(8000, "localhost");

};*/


// in this circumstance , we don't need io here
/*io.sockets.on('connection', function (socket) {

        io.sockets.emit('message',"userCount " + ++userCount);
		// when the client emits 'message', this listens and executes
        socket.on('message', function (message) {
                
                io.sockets.emit('message',message);
        });
        // when the user disconnects.. perform this
        socket.on('close', function(socket){
                 io.sockets.emit('message',"userCount " + --userCount);
        });

               
      
});*/
function log(msg) {
  sys.puts(+new Date + ' - ' + msg.toString());
}


 