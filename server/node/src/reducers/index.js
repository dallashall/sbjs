import { combineReducers } from 'redux';
import players from './players';
import world from './world';

export default combineReducers({
  players,
  world,
});
