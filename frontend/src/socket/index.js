import io from 'socket.io-client';

class Connection {
  constructor() {
    this.io = io;
    this.socket = null;
  }

  connect(query) {
    this.socket = io(':3000/', {
      query: {
        jsonString: JSON.stringify(query),
      }
    });
  }
}

export default Connection;
