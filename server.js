const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));

const rooms ={ "Localhost": {}};

app.get('/', (req, res) => {
    res.render('index', { rooms: rooms });
});

app.get('/:room', (req, res) => {
    res.render('room', { roomName: req.params['room'] });
});

server.listen(3000);

const users = {};

io.on('connection', socket => {
    console.log('new User');
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });
    
    socket.on('send-chat-message', message => {
        console.log(message);
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]});
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
})

