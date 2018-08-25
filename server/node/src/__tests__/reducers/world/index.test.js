import worldReducer from '../../../reducers/world';

describe('worldReducer', () => {
  test('Place player', () => {
    const action = {
      type: 'PLACE_PLAYER',
      user: {
        x: 1,
        y: 1,
        id: 'player_1'
      },
    };
    const testState = {};
    const world = worldReducer(testState, action);
    expect(world[1][1]).toBeDefined();
  });
  test('Move player', () => {
    const placePlayer = {
      type: 'PLACE_PLAYER',
      user: {
        x: 1,
        y: 1,
        id: 'player_1'
      },
    };
    const movePlayer = {
      type: 'MOVE_PLAYER',
      prev: {
        x: 1,
        y: 1,
        id: 'player_1'
      },
      next: {
        x: 1,
        y: 2,
        id: 'player_1'
      },
    };
    const testState = {};
    const world = worldReducer(testState, placePlayer);
    expect(world[1][1]).toBeDefined();
    const worldMoved = worldReducer(testState, movePlayer);
    expect(worldMoved[1]).not.toBeDefined();
    expect(worldMoved[2][1]).toBeDefined();
  });
  test('Remove player', () => {
    const placePlayer = {
      type: 'PLACE_PLAYER',
      user: {
        x: 1,
        y: 1,
        id: 'player_1'
      },
    };
    const removePlayer = {
      type: 'REMOVE_PLAYER',
      user: {
        x: 1,
        y: 1,
        id: 'player_1'
      },
    };
    const testState = {};
    const world = worldReducer(testState, placePlayer);
    expect(world[1][1]).toBeDefined();
    const worldMoved = worldReducer(testState, removePlayer);
    expect(worldMoved[1]).not.toBeDefined();
  });
});
