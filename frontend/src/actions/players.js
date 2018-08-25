export const PLACE_PLAYER = 'PLACE_PLAYER';
export const MOVE_PLAYER = 'MOVE_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const HYDRATE_PLAYERS = 'HYDRATE_PLAYERS';

export const movePlayer = (user, coordinates) => {
  return coordinates.dir ? {
    type: PLACE_PLAYER,
    user: { ...user, ...coordinates },
  } : {
    type: MOVE_PLAYER,
    prev: user,
    next: {
      ...user,
      ...coordinates
    },
  };
};

export const turnPlayer = user => ({
  type: PLACE_PLAYER,
  user,
});

export const removePlayer = user => ({
  type: REMOVE_PLAYER,
  user,
});
