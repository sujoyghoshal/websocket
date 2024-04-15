const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const http = require('http');
const server = http.createServer(app);
app.use(express.static('.'));

//* Socket
const socketio = require("socket.io");
const io = socketio(server);
let user=0;

io.on("connection", (socket) => {
    user++; 
    socket.emit('message','welcome to chat pograme');
    //io.sockets.emit('message',`${user} user connected`);
    socket.broadcast.emit('message',`${user} user connected`);
    console.log(`${user} user are connected`);
    
    setTimeout(() => {
        socket.emit("message", "Hello from server ....");
    }, 3000);
    
    socket.on('disconnect', () => {
        user--;
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Running on port ${port}`);
});
