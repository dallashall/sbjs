import { SET_CURRENT_PLAYER } from '../../actions/currentPlayer';

const currentPlayerReducer = (user = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_PLAYER:
      return { ...action.user };
    default:
      return user;
  }
};

export default currentPlayerReducer;
