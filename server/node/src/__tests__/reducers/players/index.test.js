import playersReducer from '../../../reducers/players';
import {
  PLACE_PLAYER, REMOVE_PLAYER, HYDRATE_PLAYERS,
} from '../../../actions/players';

describe('playersReducer', () => {
  let players;
  beforeEach(() => {
    players = playersReducer(undefined, { type: '@@INIT' });
  });

  describe('place', () => {
    it('places a player', () => {
      expect(players).toEqual({});
      const action = {
        type: PLACE_PLAYER,
        user: {
          direction: '',
          id: '01',
          location: {},
          name: ''
        },
      };
      const nextState = playersReducer(players, action);
      expect(nextState).toHaveProperty(action.user.id);
    });
  });

  describe('remove', () => {
    it('removes a player', () => {
      const action1 = {
        type: PLACE_PLAYER,
        user: {
          direction: '',
          id: '01',
          location: {},
          name: ''
        },
      };
      const nextState1 = playersReducer(players, action1);
      expect(nextState1).toHaveProperty(action1.user.id);

      const action2 = {
        type: REMOVE_PLAYER,
        user: action1.user,
      };
      const nextState2 = playersReducer(nextState1, action2);
      expect(nextState2).not.toHaveProperty(action2.user.id);
    });
  });

  describe('hydrate', () => {
    it('hydrates all players', () => {
      expect(players).toEqual({});
      const allPlayers = {
        '01': {},
        '02': {},
      };
      const nextState = playersReducer(players, {
        type: HYDRATE_PLAYERS,
        players: allPlayers
      });
      expect(nextState).toEqual(allPlayers);
    });
  });
});
