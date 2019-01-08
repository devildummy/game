import Monster from './monster';

describe('Monster', () => {
  const monster = new Monster(12);
  it('has name with 3-4 word', () => {
    expect(monster.name.split(' ').length).toBeGreaterThan(2);
  });
  it('has expected attack chance ', () => {
    expect(monster.chance).toBe(70);
  });
  it('has animation engine', () => {
    expect(typeof monster.engine).toBe('object');
  });
});
