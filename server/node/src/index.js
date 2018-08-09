import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

const app = express();
const server = http.Server(app);
const io = SocketIO(server);

app.get('/', (req, res) => {
  res.send('<script src="/socket.io/socket.io.js"></script><script>var socket = io()</script>');
});

io.on('connection', (socket) => {
  console.log('connection');
});

server.listen(5000, () => {
  console.log('Node server is running');
});
