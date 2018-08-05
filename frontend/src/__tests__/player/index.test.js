import Player from '../../player';
describe('Player', () => {
  let player;
  beforeEach(() => {
    player = new Player();
  })
  it('initializes', () => {
    expect(player).toBeDefined();
  });
});
