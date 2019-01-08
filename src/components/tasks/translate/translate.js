import * as library from '../library.json';

const translate = () => {
  const position = Math.floor(Math.random() * library.default.length);
  return {
    eng: library.default[position][0],
    ru: library.default[position][1],
  };
};

export { translate as default };
