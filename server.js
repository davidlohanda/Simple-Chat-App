//Create socket.io server in certain port
const io = require('socket.io')(3000);

//Function that loads every time your web page is open
const users = {

}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    })

    socket.on('send-message', message => {
        socket.broadcast.emit('chat-message', { message, name: users[socket.id] });
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    })
})