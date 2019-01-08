import math from './math/math';
import translate from './translate/translate';

const tasks = {
  math,
  translate,
  dragNdrop: translate,
  aud: translate,
  speech: translate,
  balloons: () => 'Не дай шарам взлететь вверх, но не нажимай на бомбы!',
  matches: () => 'Найди соответствия! Учти, число попыток ограничено!',
};

export { tasks as default };
