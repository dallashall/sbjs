import {
  PLACE_PLAYER,
  REMOVE_PLAYER,
  MOVE_PLAYER,
} from '../../actions/players';

const worldReducer = (world = {}, action) => {
  switch (action.type) {
    case PLACE_PLAYER: {
      const player = action.user;
      const y = world[player.y] || {};
      return {
        ...world,
        [player.y]: {
          ...y,
          [player.x]: player.id,
        }
      };
    }
    case MOVE_PLAYER: {
      const { prev, next } = action;
      const prevY = { ...world[prev.y] };
      delete prevY[prev.x];
      const playerRemoved = {
        ...world,
        [prev.y]: prevY,
      };
      if (Object.keys(prevY).length === 0) {
        delete playerRemoved[prev.y];
      }
      const y = playerRemoved[next.y] || {};
      return {
        ...playerRemoved,
        [next.y]: {
          ...y,
          [next.x]: next.id,
        },
      };
    }
    case REMOVE_PLAYER: {
      const { x, y } = action.user;
      const nextY = { ...world[y] };
      delete nextY[x];
      if (Object.keys(nextY).length) {
        return {
          ...world,
          [y]: nextY,
        };
      }
      const nextWorld = { ...world };
      delete nextWorld[y];
      return nextWorld;
    }
    default:
      return world;
  }
};

export default worldReducer;
