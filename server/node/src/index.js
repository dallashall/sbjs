/* eslint no-console: 0 */
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import Redis from 'ioredis';

import makeStore from './store';
import { PLACE_PLAYER, HYDRATE_PLAYERS } from './actions/players';

const redis = new Redis({
  host: 'redis',
  port: 6379,
  password: 'yourPasswordHere', // Don't check passwords into SCM
});

const app = express();
const server = http.Server(app);
const io = SocketIO(server);

const getDispatchSave = async (room, action) => {
  const preloadedState = await redis.get(room);
  console.log(preloadedState);
  const store = preloadedState ? makeStore(JSON.parse(preloadedState)) : makeStore();
  console.log(store.getState());
  store.dispatch(action);
  console.log(store.getState());
  const nextState = store.getState();
  await redis.set(room, JSON.stringify(nextState));
  return nextState;
};

io.on('connection', async (socket) => {
  const { room, user } = JSON.parse(socket.handshake.query.jsonString);
  socket.join(room);
  console.log(`New connection to: ${room}: ${user.username}`);

  const placePlayer = { type: PLACE_PLAYER, user };
  const players = await getDispatchSave(room, placePlayer);
  console.log('players', players);

  socket.emit('action', { type: HYDRATE_PLAYERS, players });
  socket.to(room).emit('action', placePlayer);
});

server.listen(5000, () => {
  console.log('Node server is running');
});
