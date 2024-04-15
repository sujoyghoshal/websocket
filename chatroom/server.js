const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('.'));

const server = require('http').createServer(app);
const io = require('socket.io')(server);

let roomno = 1;
let users = 0;

io.on('connection', (socket) => {
    socket.join('room' + roomno);
    socket.emit('message', `You are in room no ${roomno}`);
    users++;
    if (users == 2) {
        roomno++;
        users = 0;
    }
});

app.get('/sendM', (req, res) => {
    io.sockets.in(req.query.room).emit('message', req.query.mes);
    res.end();
    //URL :
    //=> http://localhost:3000/sendM?room=room&mes=Hello-room1-no-user
});

server.listen(port, () => {
    console.log(`Running on port ${port}`);
});
