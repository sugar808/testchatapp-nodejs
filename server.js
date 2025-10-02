const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = process.env.PORT || 3000;

let userIndex = 0;

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    userIndex++;
    console.log('ユーザーが接続しました 現在の人数は', userIndex, '人です');

    socket.on('chat msg', (msg) => {
        console.log('受信したメッセージ:', msg);
        io.emit('chat msg', msg);
    });

    socket.on('disconnect', () => {
        userIndex--;
        console.log('ユーザーが切断しました 現在の人数は', userIndex, '人です');
    });
});

server.listen(PORT, () => console.log('サーバーが起動中'));