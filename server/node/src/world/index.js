const buildBoard = function buildBoard({ width, height }) {
  const outerArray = [];
  for (let i = 0; i < height; i += 1) {
    outerArray.push(new Array(width).fill(null));
  }
  return outerArray;
};

class World {
  constructor(board) {
    this.board = board;
    this.height = board.length;
    this.width = board[0].length;
  }

  find({ x, y }) {
    if (
      x >= this.width
      || x < 0
      || y >= this.height
      || y < 0
    ) return false;
    return this.board[y][x];
  }

  place({ x, y }, obj) {
    this.board[y][x] = obj;
  }

  isEmpty(coordinates) {
    return this.find(coordinates) === null;
  }

  move({ x: x1, y: y1 }, { x: x2, y: y2 }) {
    this.board[y2][x2] = this.board[y1][x1];
    this.board[y1][x1] = null;
  }

  remove({ x, y }) {
    this.board[y][x] = null;
  }
}

World.build = function build(size) {
  const board = buildBoard(size);
  return new World(board);
};

export default World;
