import nameChoose from './nameChoose';


describe('Name Choose', () => {
  beforeAll(() => {
    document.body.innerHTML = '<main id="main"></main>';
  });
  it('render name choose screen', () => {
    nameChoose.render();
    expect(document.body.querySelector('#main>.name-choose>.form-inline').children.length).toBe(2);
  });
});
