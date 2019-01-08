import Landing from './leaderboard';


describe('Landing', () => {
  let button;
  beforeAll(() => {
    document.body.innerHTML = '<main id="main"></main>';
    button = Landing.render();
  });
  it('render landing screen correctly', () => {
    expect(document.body.querySelectorAll('#main>.landing>.btn').length).toBe(1);
  });
  it('with right text', () => {
    expect(button.innerHTML).toBe('Пожалуй');
  });
});
