/* eslint no-console: 0 */
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import Redis from 'ioredis';

import makeStore from './store';
import { PLACE_PLAYER, HYDRATE_PLAYERS, REMOVE_PLAYER } from './actions/players';
import World from './world';

const redis = new Redis({
  host: 'redis',
  port: 6379,
  password: 'yourPasswordHere', // Don't check passwords into SCM
});

const app = express();
const server = http.Server(app);
const io = SocketIO(server);

const getDispatchSave = async (room, action) => {
  const gameState = await redis.get(room);

  let store;
  let world;

  if (gameState) {
    const data = JSON.parse(gameState);
    store = makeStore(data.preloadedState);
    world = new World(data.board, store);
  } else {
    store = makeStore();
    world = World.build({ width: 1000, height: 1000 }, store);
  }

  const act = world.act(action);

  const nextState = store.getState();
  await redis.set(room, JSON.stringify({ preloadedState: nextState, board: world.board }));
  return act;
};

io.on('connection', async (socket) => {
  const { room, user } = JSON.parse(socket.handshake.query.jsonString);
  socket.join(room);
  console.log(`New connection to: ${room}: ${user.username}`);

  const placePlayer = { type: PLACE_PLAYER, user };
  const act = await getDispatchSave(room, placePlayer);

  socket.emit('action', act);
  socket.to(room).emit('action', placePlayer);

  socket.on('disconnect', async () => {
    const removePlayer = { type: REMOVE_PLAYER, user };
    const action = await getDispatchSave(room, removePlayer);
    if (action) socket.emit('action', action);
  });

  // Listen for individual actions
  socket.on('action', async (actionString) => {
    const validAction = await getDispatchSave(room, actionString);
    if (validAction) io.to(room).emit('action', validAction);
  });
});

server.listen(5000, () => {
  console.log('Node server is running');
});
