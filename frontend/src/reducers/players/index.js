import {
  MOVE_PLAYER,
  PLACE_PLAYER,
  REMOVE_PLAYER,
  HYDRATE_PLAYERS,
} from '../../actions/players';

const playersReducer = (players = {}, action) => {
  switch (action.type) {
    case MOVE_PLAYER:
      return {
        ...players,
        [action.next.id]: action.next,
      };
    case PLACE_PLAYER:
      return {
        ...players,
        [action.user.id]: action.user,
      };
    case REMOVE_PLAYER: {
      const nextState = { ...players };
      delete nextState[action.user.id];
      return nextState;
    }
    case HYDRATE_PLAYERS:
      return { ...action.players };
    default:
      return players;
  }
};

export default playersReducer;
