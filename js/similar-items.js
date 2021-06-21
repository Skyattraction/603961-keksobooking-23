import {ads} from './objects.js';

const adsList = ads.slice(0, 1); //temporary
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const typesMap = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

function typesForCard(type) {
  return typesMap[type];
}

function roomsQuantity(rooms) {
  if(rooms === 1) {
    return 'комната';
  } else if (rooms > 1 && rooms < 5) {
    return 'комнаты';
  }
  return 'комнат';
}

function guestQuantity(guests) {
  if(guests === 1) {
    return 'гостя';
  }
  return 'гостей';
}

function photosList(photos, container) {
  for(let ind = 0; ind < photos.length; ind++) {
    const photoElement = document.createElement('img');
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    photoElement.classList.add('popup__photo');
    photoElement.src = photos[ind];
    container.append(photoElement);
  }
}

function featuresList(features, container) {
  for(let ind = 0; ind < features.length; ind++) {
    const featureElement = document.createElement('li');
    const featureClass = `popup__feature--${features[ind]}`;
    featureElement.classList.add('popup__feature');
    featureElement.classList.add(featureClass);
    featureElement.ariaLabel = features[ind];
    container.append(featureElement);
  }
}
for (const adItem of adsList) {
  const cardElement = cardTemplate.cloneNode(true);
  const rooms = adItem.offer.rooms;
  const guests = adItem.offer.guests;

  cardElement.querySelector('.popup__title').textContent = adItem.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = adItem.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${adItem.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typesForCard(adItem.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${roomsQuantity(rooms)} для ${adItem.offer.guests} ${guestQuantity(guests)}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${adItem.offer.checkin}, выезд до  ${adItem.offer.checkout}`;

  if(adItem.offer.features.length) {
    cardElement.querySelector('.popup__features').innerHTML = '';
    featuresList(adItem.offer.features, cardElement.querySelector('.popup__features'));
  } else {
    cardElement.querySelector('.popup__features').remove();
  }

  if(adItem.offer.description) {
    cardElement.querySelector('.popup__description').textContent = adItem.offer.description;
  } else {
    cardElement.querySelector('.popup__description').remove();
  }

  if (adItem.offer.photos.length) {
    cardElement.querySelector('.popup__photos').innerHTML = '';
    photosList(adItem.offer.photos, cardElement.querySelector('.popup__photos'));
  } else {
    cardElement.querySelector('.popup__photos').remove();
  }

  if(adItem.author.avatar) {
    cardElement.querySelector('.popup__avatar').src = adItem.author.avatar;
  }

  document.querySelector('#map-canvas').appendChild(cardElement); //temporary
}

document.querySelector('#map-canvas').style.overflow = 'auto'; //temporary;
