const operatorVariants = ['+', '-', '*', '/'];

const math = () => {
  const example = {};
  example.operator = operatorVariants[Math.floor(Math.random() * 4)];
  do {
    example.left = Math.floor(Math.random() * 25);
    example.right = Math.floor(Math.random() * 25);
    example.answer = eval(`${example.left}${example.operator}${example.right}`); // eslint-disable-line no-eval
  } while (example.answer !== Math.floor(example.answer) || !Number.isFinite(example.answer));
  return example;
};

export { math as default };
