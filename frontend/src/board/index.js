import { connect } from 'react-redux';
import Board from './board';

const mstp = ({ players, currentPlayer }) => ({
  players,
  currentPlayer,
});

const mdtp = dispatch => ({
  act: action => dispatch(action),
});

export default connect(mstp, mdtp)(Board);
