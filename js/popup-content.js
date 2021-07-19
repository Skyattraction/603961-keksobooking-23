import {getWordEndByQuantity} from './utils.js';

const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;

const typesMap = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const mapTypesForCard = (type) => typesMap[type];

const createPhotosList = (photos, container) => {
  for(let ind = 0; ind < photos.length; ind++) {
    const photoElement = document.createElement('img');
    photoElement.width = PHOTO_WIDTH;
    photoElement.height = PHOTO_HEIGHT;
    photoElement.alt = 'Фотография жилья';
    photoElement.classList.add('popup__photo');
    photoElement.src = photos[ind];
    container.append(photoElement);
  }
};

const createFeaturesList = (features, container) => {
  for(let ind = 0; ind < features.length; ind++) {
    const featureElement = document.createElement('li');
    const featureClass = `popup__feature--${features[ind]}`;
    featureElement.classList.add('popup__feature');
    featureElement.classList.add(featureClass);
    featureElement.ariaLabel = features[ind];
    container.append(featureElement);
  }
};

const createCustomPopup = (point) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.popup__title');
  const cardAddress = cardElement.querySelector('.popup__text--address');
  const cardPrice = cardElement.querySelector('.popup__text--price');
  const cardType = cardElement.querySelector('.popup__type');
  const cardCapacity = cardElement.querySelector('.popup__text--capacity');
  const cardTime = cardElement.querySelector('.popup__text--time');
  const cardFeatures = cardElement.querySelector('.popup__features');
  const cardDescription = cardElement.querySelector('.popup__description');
  const cardPhotos = cardElement.querySelector('.popup__photos');
  const cardAvatar = cardElement.querySelector('.popup__avatar');

  const rooms = point.offer.rooms;
  const guests = point.offer.guests;

  if (point.offer.title) {
    cardTitle.textContent = point.offer.title;
  } else {
    cardTitle.remove();
  }

  if (point.offer.address) {
    cardAddress.textContent = point.offer.address;
  } else {
    cardAddress.remove();
  }

  if (point.offer.price) {
    cardPrice.textContent = `${point.offer.price} ₽/ночь`;
  } else {
    cardPrice.remove();
  }

  if (point.offer.type) {
    cardType.textContent = mapTypesForCard(point.offer.type);
  } else {
    cardType.remove();
  }

  if (rooms && guests) {
    cardCapacity.textContent = `${rooms} ${getWordEndByQuantity(rooms, ['комната', 'комнаты', 'комнат'])} для ${guests} ${getWordEndByQuantity(guests, ['гостя', 'гостей', 'гостей'])}`;
  } else {
    cardCapacity.remove();
  }

  if (point.offer.checkin && point.offer.checkout) {
    cardTime.textContent = `Заезд после ${point.offer.checkin}, выезд до  ${point.offer.checkout}`;
  } else {
    cardTime.remove();
  }

  if (point.offer.features) {
    cardFeatures.innerHTML = '';
    createFeaturesList(point.offer.features, cardFeatures);
  } else {
    cardFeatures.remove();
  }

  if (point.offer.description) {
    cardDescription.textContent = point.offer.description;
  } else {
    cardDescription.remove();
  }

  if (point.offer.photos) {
    cardPhotos.innerHTML = '';
    createPhotosList(point.offer.photos, cardPhotos);
  } else {
    cardPhotos.remove();
  }

  if (point.author.avatar) {
    cardAvatar.src = point.author.avatar;
  } else {
    cardAvatar.remove();
  }

  return cardElement;
};

export {createCustomPopup};
