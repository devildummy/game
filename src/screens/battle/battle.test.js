import $ from 'jquery';
import Battle from './battle';


describe('Battle', () => {
  const playerName = 'Brin';
  const monsterName = 'Cook';
  beforeAll(() => {
    document.body.innerHTML = '<main id="main"></main>';
    Battle.render(playerName, monsterName);
  });
  it('render battle screen width player and enemy', () => {
    expect($('.card-group').children().length).toBe(2);
  });
  it('width right name', () => {
    const names = [$('.js-player-name').text(), $('.js-monster-name').text()];
    expect(names).toEqual([playerName, monsterName]);
  });
});
