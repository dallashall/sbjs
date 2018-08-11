/* eslint no-console: 0 */
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

import makeStore from './store';
import { PLACE_PLAYER } from './actions/players';

const app = express();
const server = http.Server(app);
const io = SocketIO(server);

// app.post('/', (req, res) => {
//   res.send('<script src="/socket.io/socket.io.js"></script><script>var socket = io()</script>');
// });

const store = makeStore();

io.on('connection', (socket) => {
  const { room, user } = JSON.parse(socket.handshake.query.jsonString);
  console.log(`New connection to: ${room}: ${user.username}`);
  socket.join(room);
  store.dispatch({ type: PLACE_PLAYER, user });
  socket.emit('action', JSON.stringify(store.getState()));
  socket.to(room).emit('action', { type: PLACE_PLAYER, user });
});

server.listen(5000, () => {
  console.log('Node server is running');
});
