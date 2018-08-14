import React, { Component } from 'react';

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      roomCode: '',
    };
  }

  onChange(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value,
      });
    };
  }

  onSubmit = () => {
  }

  render() {
    const { username, roomCode } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input id="username" type="text" placeholder="Username" value={username} onChange={this.onChange('username')} />
          <input id="room-code" type="text" placeholder="Room code" value={roomCode} onChange={this.onChange('roomCode')} />
          <input type="submit" value="PLAY" />
        </form>
      </div>
    );
  }
}

export default Menu;
