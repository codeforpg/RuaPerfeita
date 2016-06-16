var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis();
redis.subscribe('event-channel', function(err, count) {
});
redis.on('message', function(channel, message) {
    console.log('Message Recieved: ' + message);
    message = JSON.parse(message);
    console.log(channel)
    io.emit(channel + ':' + message.event, message.data);
});
http.listen(3000, function(){
    console.log('Listening on Port 3000');
});