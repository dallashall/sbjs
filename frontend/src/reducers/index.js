import { combineReducers } from 'redux';
import players from './players';
import currentPlayer from './currentPlayer';

export default combineReducers({
  currentPlayer,
  players,
});
