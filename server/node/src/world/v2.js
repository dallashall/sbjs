class World {
  constructor(store) {
    this.height = 20;
    this.width = 20;
    this.store = store;
  }

  world() {
    return this.store.getState().world;
  }

  randomCoordinates() {
    return {
      x: Math.floor(Math.random() * this.width),
      y: Math.floor(Math.random() * this.height),
    };
  }

  inBounds({ x, y }) {
    if (
      x >= this.width
      || x < 0
      || y >= this.height
      || y < 0
    ) return false;
    return true;
  }

  find({ x, y }) {
    const row = this.world()[y];
    return row && row[x];
  }

  isEmpty(coordinates) {
    return this.inBounds(coordinates) && !this.find(coordinates);
  }

  initialCoordinates() {
    let coordinates = this.randomCoordinates();
    while (!this.isEmpty(coordinates)) {
      coordinates = this.randomCoordinates();
    }
    return coordinates;
  }
}

export default World;
