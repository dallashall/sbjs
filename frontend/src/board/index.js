import React, { Component } from 'react';
import Player from '../player';
import uuid from 'uuid/v1';

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
    const { connection } = this.props;
    connection.connect({
      user: {
        id: uuid(),
        username: 'testUser',
      },
      room: 'testRoom'
    });
    this.socket = connection.socket;
    this.socket.on('action', msg => console.log('msg', msg));
  }

  move(dir) {
    return (e) => {
      e.preventDefault();
      const nextCoords = movements[dir](this.state);
      this.setState(nextCoords);
    };
  }

  render() {
    const {
      width, height, x, y, dir
    } = this.state;
    return (
      <div style={{
        width,
        height,
        backgroundColor: '#22AA88',
      }}
      >
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
        <Player x={x} y={y} dir={dir} />
      </div>
    );
  }
}

export default Board;
