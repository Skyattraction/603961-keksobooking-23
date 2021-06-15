/* Функция getRandomInt основана на примере по ссылке:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
Возвращает случайное целое число из заданного диапазона чисел больше или равных 0.
Можно задать большее и меньшее число в любом порядке.
*/

export function getRandomInt(min, max) {
  if(min >= 0 && max >= 0) {
    min = Math.floor(min);
    max = Math.floor(max);
    if(min > max) {
      const cacheMin = min;
      const cacheMax = max;
      min = cacheMax;
      max = cacheMin;
    }
    const delta = max - min;
    const seed = Math.floor(Math.random() * (delta + 1));
    return seed + min;
  }
}

/* Функция getRandomFloat основана на примере по ссылке:
https://learn.javascript.ru/task/random-min-max
Возвращает случайное число с плавающей точкой из заданного диапазона чисел больше или равных 0.
В параметре задается количство символов после запятой.
Можно задать большее и меньшее число в любом порядке.
*/
export function getRandomFloat(min, max, symbolsAfterComma) {
  if(min >= 0 && max >= 0 && symbolsAfterComma >= 0) {
    if(min > max) {
      const cacheMin = min;
      const cacheMax = max;
      min = cacheMax;
      max = cacheMin;
    }
    const delta = max - min;
    const seedInteger = Math.random() * delta;
    const seed = (seedInteger + min).toFixed(symbolsAfterComma);
    return Number(seed);
  }
}

export const getRandomArrayElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};

export const getUniqueRandomArrayElement = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInt(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${  min  } до ${  max}`);
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

export const getFewRandomArrayElements = function (array) {
  const quantity = getRandomInt(0, array.length);
  const elements = [];
  const uniqueArrayElement = getUniqueRandomArrayElement(0, quantity - 1);
  for (let index = 0; index < quantity; index++) {
    const arrayIndex = uniqueArrayElement();
    const element = array[arrayIndex];
    elements.push(element);
  }
  return elements;
};
