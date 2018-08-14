import { PLACE_PLAYER, REMOVE_PLAYER, HYDRATE_PLAYERS } from '../actions/players';

const buildBoard = function buildBoard({ width, height }) {
  const outerArray = [];
  for (let i = 0; i < height; i += 1) {
    outerArray.push(new Array(width).fill(null));
  }
  return outerArray;
};

class World {
  constructor(board, store) {
    this.board = board;
    this.height = board.length;
    this.width = board[0].length;
    this.store = store;
  }

  randomCoordinates() {
    return {
      x: Math.floor(Math.random() * this.width),
      y: Math.floor(Math.random() * this.height),
    };
  }

  find({ x, y }) {
    if (
      x >= this.width
      || x < 0
      || y >= this.height
      || y < 0
    ) return false;
    return this.board[y][x];
  }

  place({ x, y }, user) {
    this.board[y][x] = user.id;
    const action = { type: PLACE_PLAYER, user: { ...user, x, y } };
    this.store.dispatch(action);
    return action;
  }

  isEmpty(coordinates) {
    return this.find(coordinates) === null;
  }

  placeInitial(user) {
    let coordinates = this.randomCoordinates();
    while (!this.isEmpty(coordinates)) {
      coordinates = this.randomCoordinates();
    }
    this.place(coordinates, user);
    return ({ type: HYDRATE_PLAYERS, players: this.store.getState().players });
  }

  move({ x: x1, y: y1 }, { x: x2, y: y2 }) {
    this.board[y2][x2] = this.board[y1][x1];
    this.board[y1][x1] = null;
  }

  remove(user) {
    const { x, y } = user;
    this.board[y][x] = null;
    const action = { type: REMOVE_PLAYER, user };
    this.state.dispatch(action);
    return action;
  }

  act({ type, user }) {
    switch (type) {
      case PLACE_PLAYER: {
        const oldUser = this.store.getState().players[user.id];
        if (!oldUser) return this.placeInitial(user);
        if (!user.x || !user.y) {
          const action = { type, user };
          this.store.dispatch(action);
          return action;
        }
        if (this.isEmpty(user)) {
          this.move(oldUser, user);
          return { type, user };
        }
        if (this.find(user) === user.id) {
          this.move(oldUser, user);
          return { type, user };
        }
        return false;
      }
      case REMOVE_PLAYER:
        return this.remove(user);
      default:
        return false;
    }
  }
}

World.build = function build(size, store) {
  const board = buildBoard(size);
  return new World(board, store);
};

export default World;
