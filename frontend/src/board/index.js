import React, { Component } from 'react';
import Player from '../player';

const distance = 50;
const movements = {
  L: ({x, y, dir}) => {
    return dir === 'L' ? ({ x: x - distance, y }) : ({ dir: 'L' });
  },
  R: ({x, y, dir}) => {
    return dir === 'R' ? ({ x: x + distance, y }) : ({ dir: 'R' });
  },
  U: ({x, y, dir}) => {
    return dir === 'U' ? ({ x, y: y  - distance }) : ({ dir: 'U' });
  },
  D: ({x, y, dir}) => {
    return dir === 'D' ? ({ x, y: y + distance }) : ({ dir: 'D' });
  },
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

  move(dir) {
    return (e) => {
      e.preventDefault();
      const nextCoords = movements[dir](this.state)
      this.setState(nextCoords);
    }
  }

  render() {
    return (
      <div style={{
        width: this.state.width,
        height: this.state.height,
        backgroundColor: '#22AA88',
      }}
      >
      <button onClick={this.move('L')}>
        Left
      </button>
      <button onClick={this.move('R')}>
        Right
      </button>
      <button onClick={this.move('U')}>
        Up
      </button>
      <button onClick={this.move('D')}>
        Down
      </button>
        <Player x={this.state.x} y={this.state.y} dir={this.state.dir} />
      </div>
    );
  }
}

export default Board;
