var sys = require("sys");


var WebSocketServer = require('websocket').server;
var http = require('http');
var webSocketsServerPort = 8000;



var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
	console.log((new Date()) + " Server is created");
 
});

server.listen(webSocketsServerPort, function() {
console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
 });

// create the server
var wsServer = new WebSocketServer({
    httpServer: server
});

var userCount = [];

// list of currently connected clients (users)
var clients = [ ];
if (wsServer == null)
console.log((new Date()) + " wsServer + " + wsServer);
wsServer.on('request', function (request) {
		 console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    // accept connection - you should check 'request.origin' to make sure that
    // client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
   var connection = request.accept(null, request.origin); 
   
   
   //var connection = request.accept('echo-protocol', request.origin);
    // we need to know client index to remove them on 'close' event
   var index = clients.push(connection) - 1;
    console.log((new Date()) + ' Connection accepted.');
	var controlVideo="";
	var userCount=[];
    connection.on('message', function(message) {
                // broadcast message to all connected clients
				var matches;
				matches = message.utf8Data.split(/\s/g);
				if(matches[0]=="control")
				{
					controlVideo=matches[1];
				}
				if(userCount!=clients.length)
				{
					clients[clients.length-1].send("control "+controlVideo);
					++userCount;
				}
				
                for (var i=0; i < clients.length; i++) {  
					//message ="timestamp " + 5;
					clients[i].send(message.utf8Data); 
					console.log("Client "+ i + "is transfering "+ message.utf8Data);
					
					}
				//connection.send(json);
    });

    // user disconnected
    connection.on('close', function(connection) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            // remove user from the list of connected clients
            clients.splice(index, 1);
			
});
});

function log(msg) {
  sys.puts(+new Date + ' - ' + msg.toString());
}


 