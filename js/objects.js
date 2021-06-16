import * as data from './data.js';
import {getRandomInt, getRandomFloat, getRandomArrayElement, getUniqueRandomArrayElement, getFewRandomArrayElements} from './utils.js';

const getUniqueRandomAvatar = getUniqueRandomArrayElement(1, 10);

const createOffer = (lat, lng) => {
  const offer = {
    title: getRandomArrayElement(data.TITLES),
    address: `${lat}, ${lng}`,
    price: getRandomInt(data.PRICE_MIN, data.PRISE_MAX),
    type: getRandomArrayElement(data.TYPES),
    rooms: getRandomInt(data.ROOMS_MIN, data.ROOMS_MAX),
    guests: getRandomInt(data.GUESTS_MIN, data.GUESTS_MAX),
    checkin: getRandomArrayElement(data.CHECKIN_CHECKOUT_TIME),
    checkout: getRandomArrayElement(data.CHECKIN_CHECKOUT_TIME),
    features: getFewRandomArrayElements(data.FEATURES),
    description: getRandomArrayElement(data.DESCRIPTIONS),
    photos: getFewRandomArrayElements(data.PHOTOS),
  };
  return offer;
};

const createAd = () => {
  const lat = getRandomFloat(data.LAT_MIN, data.LAT_MAX, data.COORDINATES_ACCURACY);
  const lng = getRandomFloat(data.LNG_MIN, data.LNG_MAX, data.COORDINATES_ACCURACY);
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

export const ads = new Array(10).fill(null).map(() => createAd());
