/* eslint import/prefer-default-export:0 */
export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';

export const setCurrentPlayer = user => ({
  type: SET_CURRENT_PLAYER,
  user,
});
