export const PLACE_PLAYER = 'PLACE_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const HYDRATE_PLAYERS = 'HYDRATE_PLAYERS';

export const movePlayer = (user, coordinates) => ({
  type: PLACE_PLAYER,
  user: { ...user, ...coordinates },
});

export const removePlayer = user => ({
  type: REMOVE_PLAYER,
  user,
});
