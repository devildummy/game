import Checker from './checker';

describe('Checker', () => {
  beforeAll(() => {
    document.body.innerHTML = '<main id="main"></main>';
    Checker.render(true, 'Ответ');
  });
  it('render checker in #main', () => {
    expect(document.body.querySelectorAll('#main>.checker').length).toBe(1);
  });
  it('with right text', () => {
    expect(document.body.querySelector('.correct').innerHTML).toBe('Верно!');
  });
});
