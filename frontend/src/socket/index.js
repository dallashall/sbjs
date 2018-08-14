import io from 'socket.io-client';

class Connection {
  constructor() {
    this.io = io;
    this.socket = null;
  }

  connect(query) {
    this.socket = io('http://192.168.0.3:3001/', {
      query: {
        jsonString: JSON.stringify(query),
      }
    });
  }
}

export default Connection;
