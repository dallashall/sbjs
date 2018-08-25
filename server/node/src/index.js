/* eslint no-console: 0 */
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import Redis from 'ioredis';

import makeStore from './store';
import { PLACE_PLAYER, HYDRATE_PLAYERS, REMOVE_PLAYER, MOVE_PLAYER } from './actions/players';
import World from './world/v2';

const redis = new Redis({
  host: 'redis',
  port: 6379,
  password: 'yourPasswordHere', // Don't check passwords into SCM
});

const app = express();
const server = http.Server(app);
const io = SocketIO(server);

const getWorld = async (room) => {
  const gameState = await redis.get(room);
  const store = gameState ? makeStore(JSON.parse(gameState)) : makeStore();
  return new World(store);
};

const dispatchSave = async (room, world, action) => {
  world.store.dispatch(action);
  const state = world.store.getState();
  redis.set(room, JSON.stringify(state));
  console.log(state.world);
  return state;
};

io.on('connection', async (socket) => {
  const { room, user } = JSON.parse(socket.handshake.query.jsonString);
  socket.join(room);
  console.log(`New connection to: ${room}: ${user.username}`);

  const initialWorld = await getWorld(room);

  const { x, y } = initialWorld.initialCoordinates();
  const placePlayer = {
    type: PLACE_PLAYER,
    user: {
      ...user,
      x,
      y,
    },
  };

  const { players } = await dispatchSave(room, initialWorld, placePlayer);
  const hydratePlayers = { type: HYDRATE_PLAYERS, players };

  socket.emit('action', hydratePlayers);
  console.log('emitted:', hydratePlayers);
  socket.to(room).emit('action', placePlayer);

  socket.on('disconnect', async () => {
    console.log('disconnect', user);
    const world = await getWorld(room);
    const userToRemove = world.store.getState().players[user.id];
    const removePlayer = { type: REMOVE_PLAYER, user: userToRemove };
    await dispatchSave(room, world, removePlayer);
    socket.to(room).emit('action', removePlayer);
  });

  // Listen for individual actions
  socket.on('action', async (action) => {
    console.log('action', action);
    const world = await getWorld(room);
    let valid = true;
    if (action.type === MOVE_PLAYER) {
      valid = world.isEmpty(action.next);
    }
    if (valid) {
      console.log('valid action:', action);
      await dispatchSave(room, world, action);
      io.to(room).emit('action', action);
    }
  });
});

server.listen(5000, () => {
  console.log('Node server is running');
});
