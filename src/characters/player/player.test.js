import Player from './player';

describe('Player', () => {
  const player = new Player();
  it('has name with no name = anon', () => {
    expect(player.name).toBe('Аноним');
  });
  it('has 100 hp', () => {
    expect(player.hp).toBe(100);
  });
  it('has crit chance', () => {
    expect(player.crit).toBe(10);
  });
  it('has animation engine', () => {
    expect(typeof player.engine).toBe('object');
  });
});
