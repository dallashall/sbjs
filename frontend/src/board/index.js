import { connect } from 'react-redux';

import { setCurrentPlayer } from '../actions/currentPlayer';
import Board from './board';

const mstp = ({ players, currentPlayer }) => ({
  players,
  currentPlayer,
});

const mdtp = dispatch => ({
  act: action => dispatch(action),
  setCurrentPlayer: user => dispatch(setCurrentPlayer(user)),
});

export default connect(mstp, mdtp)(Board);
