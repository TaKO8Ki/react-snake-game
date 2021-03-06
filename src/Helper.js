export const erase = (index, array) => replace('dots', index, array);
export const snakenize = (index, array) => replace('snake', index, array);
export const foodnize = (index, array) => replace('food', index, array);
export const eat = (index, size, array) => {
  if (isFood(index, array)) {
    let foodIndex = Math.floor(Math.random() * size * size);
    while (index !== foodIndex && !isDots(foodIndex, array)) {
      foodIndex = Math.floor(Math.random() * size * size);
    }

    return foodnize(foodIndex, array);
  }
  return array;
};

export const isFood = (index, dots) => dots[index - 1] === 'food';
export const isDots = (index, dots) => dots[index - 1] === 'dots';
export const isSelf = (index, dots) => dots[index - 1] === 'snake';

export const eraceFootprint = (size, length, dots, history) => {
  const aIndex = history.length - length;
  if (aIndex < 0) {
    return dots;
  }
  const cursor = history[aIndex];
  const index = getIndex(size, cursor.x, cursor.y);
  return erase(index, dots);
};

export const initDots = (initDots, initSnakeIndex, initFoodIndex) =>
  reducer(initDots, [
    dots => snakenize(initSnakeIndex, dots),
    dots => foodnize(initFoodIndex, dots)
  ]);

export const newDots = (index, size, length, history, prevDots) =>
  reducer(prevDots, [
    dots => eat(index, size, dots),
    dots => snakenize(index, dots),
    dots => eraceFootprint(size, length, dots, history)
  ]);

/*
 * @param str 任意の文字列
 * @param index 0から始まる配列のindex
 * @param array 配列
 */
const replace = (str, index, array) => [
  ...array.slice(0, index - 1),
  str,
  ...array.slice(index, array.length)
];

export const reducer = (init, actions) => {
  return actions.reduce((acc, action) => {
    return action(acc);
  }, init);
};

export const getIndex = (size, x, y) => {
  return x - 1 + (y - 1) * size + 1;
};