const TITLES = [
  'Сдам квартиру',
  'Сдам комнату',
  'Сдам гараж',
];
const PRICE_MIN = 10;
const PRISE_MAX = 1000;
const ROOMS_MIN = 1;
const ROOMS_MAX = 10;
const GUESTS_MIN = 1;
const GUESTS_MAX = 50;
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKIN_CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Вид на море',
  'Вид во двор',
  'Вид на дорогу',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LAT_MIN = 35.65;
const LAT_MAX = 35.7;
const LNG_MIN = 139.7;
const LNG_MAX = 139.8;
const COORDINATES_ACCURACY = 5;

/* Функция getRandomInt основана на примере по ссылке:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
Возвращает случайное целое число из заданного диапазона чисел больше или равных 0.
Можно задать большее и меньшее число в любом порядке.
*/

function getRandomInt(min, max) {
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
function getRandomFloat(min, max, symbolsAfterComma) {
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


const getRandomArrayElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};


const getUniqueRandomArrayElement = (min, max) => {
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

const getFewRandomArrayElements = function (array) {
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

const getUniqueRandomAvatar = getUniqueRandomArrayElement(1, 10);

const createOffer = (lat, lng) => {
  const offer = {
    title: getRandomArrayElement(TITLES),
    address: `${lat}, ${lng}`,
    price: getRandomInt(PRICE_MIN, PRISE_MAX),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomInt(ROOMS_MIN, ROOMS_MAX),
    guests: getRandomInt(GUESTS_MIN, GUESTS_MAX),
    checkin: getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
    checkout: getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
    features: getFewRandomArrayElements(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getFewRandomArrayElements(PHOTOS),
  };
  return offer;
};

const createAd = () => {
  const lat = getRandomFloat(LAT_MIN, LAT_MAX, COORDINATES_ACCURACY);
  const lng = getRandomFloat(LNG_MIN, LNG_MAX, COORDINATES_ACCURACY);
  const ad = {
    author: {
      avatar: `img/avatars/user${(`0${getUniqueRandomAvatar()}`).slice(-2)}.png`,
    },
    offer: createOffer(lat, lng),
    location: {
      lat: lat,
      lng: lng,
    },
  };
  return ad;
};

const ads = new Array(10).fill(null).map(() => createAd());
document.body.append(JSON.stringify(ads)); //temporary
