import World from '../../world';

describe('World', () => {
  let world;

  beforeEach(() => {
    world = World.build({ width: 75, height: 100 });
  });
  describe('build/new', () => {
    it('creates a 2D array', () => {
      expect(world.board).toBeInstanceOf(Array);
      expect(world.board[0]).toBeInstanceOf(Array);
    });
    it('creates unique rows', () => {
      world.board[0][1] = '1';
      expect(world.board[0][1]).toBe('1');
      expect(world.board[1][1]).not.toBe('1');
    });
    it('creates an board of the right dimensions', () => {
      expect(world.board).toHaveLength(100);
      expect(world.board[0]).toHaveLength(75);
    });
    it('allows creation with pre-defined board', () => {
      const board = [[1, null], [null, 1]];
      world = new World(board);
      expect(world.board).toBe(board);
      expect(world.find({ x: 0, y: 0 })).toBe(board[0][0]);
    });
  });

  describe('methods', () => {
    it('returns objects, given coordinates', () => {
      expect(world.find({ x: 2, y: 3 })).toBe(null);
      world.board[3][2] = '1';
      expect(world.find({ x: 2, y: 3 })).toBe('1');
    });

    it('places an object', () => {
      const coordinates = { x: 5, y: 7 };
      expect(world.find(coordinates)).toBe(null);
      world.place(coordinates, '1');
      expect(world.find(coordinates)).toBe('1');
    });

    it('checks if a space is empty', () => {
      const coordinates = { x: 8, y: 9 };
      expect(world.isEmpty(coordinates)).toBe(true);
      world.place(coordinates, '1');
      expect(world.isEmpty(coordinates)).toBe(false);
    });

    it('considers a space outside the world as non-empty', () => {
      const coord1 = { x: -1, y: 9 };
      const coord2 = { x: 1, y: -1 };
      const coord3 = { x: 75, y: 9 };
      const coord4 = { x: 1, y: 100 };
      expect(world.isEmpty(coord1)).toBe(false);
      expect(world.isEmpty(coord2)).toBe(false);
      expect(world.isEmpty(coord3)).toBe(false);
      expect(world.isEmpty(coord4)).toBe(false);
    });

    it('moves object from one space to another', () => {
      const coord1 = { x: 0, y: 0 };
      const coord2 = { x: 10, y: 3 };
      world.place(coord1, '1');
      expect(world.find(coord1)).toBe('1');
      world.move(coord1, coord2);
      expect(world.find(coord1)).toBe(null);
      expect(world.find(coord2)).toBe('1');
    });

    it('removes an object from the given coordinates', () => {
      const coordinates = { x: 50, y: 35 };
      world.place(coordinates, '1');
      expect(world.find(coordinates)).toBe('1');
      world.remove(coordinates);
      expect(world.find(coordinates)).toBe(null);
    });
  });
});
