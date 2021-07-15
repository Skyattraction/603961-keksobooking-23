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

export const showErrorAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '50%';
  alertContainer.style.top = '50%';
  alertContainer.style.transform = 'translate(-50%, -50%)';
  alertContainer.style.padding = '30px';
  alertContainer.style.fontSize = '14px';
  alertContainer.style.fontWeight = 'bold';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.width = '500px';
  alertContainer.style.borderRadius = '30px';
  alertContainer.style.color = '#FF4B4B';
  alertContainer.style.boxShadow = '0 0 20px 0 rgba(0,0,0,.5)';

  alertContainer.textContent = message;
  const alertClose = document.createElement('span');
  alertClose.textContent = 'x';
  alertClose.style.position = 'absolute';
  alertClose.style.right = '15px';
  alertClose.style.top = '15px';
  alertClose.style.fontSize = '20px';
  alertClose.style.fontFamily = 'monospace';
  alertClose.style.color = 'grey';
  alertClose.style.cursor = 'pointer';

  alertContainer.append(alertClose);
  document.body.append(alertContainer);
  alertClose.onclick = function() {
    alertContainer.remove();
  };
};
