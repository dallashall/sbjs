import RootReducer from '../../reducers';

const defaultState = {
  players: {},
  world: {},
};

describe('RootReducer', () => {
  let state;
  beforeEach(() => {
    state = RootReducer(undefined, { type: '@@INIT' });
  });

  it('returns a default state', () => {
    expect(state).toEqual(defaultState);
  });

  it('accepts a pre-filled state', () => {
    const players = {
      foo: 'bar',
    };
    state = RootReducer({ players }, { type: '@@INIT' });
    expect(state.players).toEqual(players);
  });
});
