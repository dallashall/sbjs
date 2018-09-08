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
  constructor(props) {
    super(props);
    this.state = {
      width: 1000,
      height: 1000,
      x: 0,
      y: 0,
      dir: 'D',
      fullScreen: false,
      player: this.props.currentPlayer,
    };
  }

  play = (e) => {
    e.preventDefault();
    this.props.setCurrentPlayer(this.state.player);
    this.requestFullScreen();
    this.connectToSocket();
  }

  connectToSocket() {
    const { connection, act } = this.props;
    const currentPlayer = this.state.player;
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

  requestFullScreen() {
    const elem = document.getElementById('game');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
    this.setState({ fullScreen: true });
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
      <div
        id="game"
      >
        <div className="game-screen">
          <div style={{
            width,
            height,
            backgroundImage: 'url("./images/background.png")',
            transform: `translate(calc(50vw - ${me.x * 50}px - 25px), calc(30vh - ${me.y * 50}px))`,
            position: 'absolute',
            transition: 'transform 0.2s ease-in-out',
          }}
          >
            {
              Object.keys(players).map(id => <Player player={players[id]} key={id} />)
            }

          </div>
          <div className="game-screen__shadow" />
          {
            !this.state.fullScreen
            && (
              <div className="btn-play">
                <input type="text" placeholder="username" onChange={e => this.setState({ player: { ...this.state.player, username: e.target.value } })} />
                <button
                  type="button"
                  onClick={this.play}
                >

                Play!
                </button>
              </div>
            )
          }
        </div>
        <div className="game__bottom" />

        <div className="square-btn__container">
          <button
            type="button"
            onClick={this.move('L')}
            className="btn-square btn-square__left"
            style={{
              width: '40px', height: '40px', top: '40px', left: '0px', position: 'absolute', borderRadius: '2px 0px 0px 2px', boxShadow: '2px 2px 5px black'
            }}
          />

          <button
            type="button"
            onClick={this.move('R')}
            className="btn-square btn-square__right"
          />

          <button
            type="button"
            onClick={this.move('U')}
            className="btn-square btn-square__up"
          />

          <button
            type="button"
            onClick={this.move('D')}
            className="btn-square btn-square__down"
          />
          <div className="btn-square__center" />
        </div>
        <div className="round-btn__container">
          <button type="button" className="btn-round btn-a">
          A
          </button>
          <button type="button" className="btn-round btn-b">
          B
          </button>
        </div>
      </div>
    );
  }
}

export default Board;
