import React, { Component } from 'react';
import Player from '../player';
import { movePlayer } from '../actions/players';

const distance = 50;
const movements = {
  L: ({ x, y, dir }) => (dir === 'L' ? ({ x: x - distance, y }) : ({ dir: 'L' })),
  R: ({ x, y, dir }) => (dir === 'R' ? ({ x: x + distance, y }) : ({ dir: 'R' })),
  U: ({ x, y, dir }) => (dir === 'U' ? ({ x, y: y - distance }) : ({ dir: 'U' })),
  D: ({ x, y, dir }) => (dir === 'D' ? ({ x, y: y + distance }) : ({ dir: 'D' })),
};

class Board extends Component {
  constructor() {
    super();
    this.state = {
      width: 1000,
      height: 1000,
      x: 0,
      y: 0,
      dir: 'D',
    };
  }

  componentDidMount() {
    const { connection, currentPlayer, act } = this.props;
    connection.connect({
      user: {
        id: currentPlayer.id,
        username: currentPlayer.username,
      },
      room: 'testRoom'
    });
    this.socket = connection.socket;
    this.socket.on('action', (action) => {
      act(action);
    });
  }

  move(dir) {
    const { currentPlayer, players } = this.props;
    const me = players[currentPlayer.id];
    return (e) => {
      e.preventDefault();
      const nextCoords = movements[dir](me);
      const actionToSend = movePlayer(me, nextCoords);
      this.socket.emit('action', actionToSend);
    };
  }

  render() {
    const {
      width, height
    } = this.state;
    const { players } = this.props;
    return (
      <div style={{
        width,
        height,
        backgroundColor: '#22AA88',
      }}
      >
        {
          Object.keys(players).map(id => <Player player={players[id]} key={id} />)
        }

        <button type="button" onClick={this.move('L')}>
          Left
        </button>

        <button type="button" onClick={this.move('R')}>
          Right
        </button>

        <button type="button" onClick={this.move('U')}>
          Up
        </button>

        <button type="button" onClick={this.move('D')}>
          Down
        </button>
      </div>
    );
  }
}

export default Board;
