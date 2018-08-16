import React, { Component } from 'react';
import Player from '../player';
import { movePlayer } from '../actions/players';

const distance = 1;
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
    const { currentPlayer, players } = this.props;
    const me = players[currentPlayer.id] || {};
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'absolute',
      }}
      >
        <div style={{
          width,
          height,
          backgroundColor: '#22AA88',
          transform: `translate(calc(50vw - ${me.x * 50}px), calc(30vh - ${me.y * 50}px))`,
          position: 'absolute',
          transition: 'transform 0.2s ease-in-out',
        }}
        >
          {
            Object.keys(players).map(id => <Player player={players[id]} key={id} />)
          }

        </div>
        <div style={{
          position: 'absolute',
          bottom: '100px',
          left: '20px',
          width: '200px',
          height: '200px',
        }}>
          <button
            type="button"
            onClick={this.move('L')}
            style={{ width: '60px', height: '60px', top: 'calc(50% - 30px)', left: '0px', position: 'absolute' }}
          />

          <button
            type="button"
            onClick={this.move('R')}
            style={{ width: '60px', height: '60px', top: 'calc(50% - 30px)', right: '0px', position: 'absolute' }}
          />

          <button
            type="button"
            onClick={this.move('U')}
            style={{ width: '60px', height: '60px', left: 'calc(50% - 30px)', top: '0px', position: 'absolute' }}
          />

          <button
            type="button"
            onClick={this.move('D')}
            style={{ width: '60px', height: '60px', left: 'calc(50% - 30px)', bottom: '0px', position: 'absolute' }}
          />
        </div>
      </div>
    );
  }
}

export default Board;
