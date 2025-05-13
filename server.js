const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('🔌 Користувач підключився');

    socket.on('viewedMovie', (data) => {
        console.log('📨 Переглянуто фільм:', data.title);
        socket.broadcast.emit('userViewed', data);
    });

    socket.on('disconnect', () => {
        console.log('❌ Користувач відключився');
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`🚀 WebSocket сервер працює на http://localhost:${PORT}`);
});
