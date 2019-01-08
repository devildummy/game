import Character from './chracter';

describe('Character', () => {
  const character = new Character('player');
  it('has type = player', () => {
    expect(character.type).toBe('player');
  });
  it('has body', () => {
    expect(character.body).not.toBe(undefined);
  });
  it('has head', () => {
    expect(character.head).not.toBe(undefined);
  });
  it('has left arm, why not?', () => {
    expect(character.leftArm).not.toBe(undefined);
  });
  it('has render method', () => {
    expect(typeof character.render).toBe('function');
  });
});
