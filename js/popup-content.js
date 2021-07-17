const typesMap = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const mapTypesForCard = function(type) {
  return typesMap[type];
};

const mapRoomsQuantity = function(roomsNumber) {
  if(roomsNumber === 1) {
    return 'комната';
  } else if (roomsNumber > 1 && roomsNumber < 5) {
    return 'комнаты';
  }
  return 'комнат';
};

const mapGuestQuantity = function(guestsNumber) {
  if(guestsNumber === 1) {
    return 'гостя';
  }
  return 'гостей';
};

const createPhotosList = function(photos, container) {
  for(let ind = 0; ind < photos.length; ind++) {
    const photoElement = document.createElement('img');
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    photoElement.classList.add('popup__photo');
    photoElement.src = photos[ind];
    container.append(photoElement);
  }
};

const createFeaturesList = function(features, container) {
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
  const rooms = point.offer.rooms;
  const guests = point.offer.guests;

  cardElement.querySelector('.popup__title').textContent = point.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = point.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${point.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = mapTypesForCard(point.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${mapRoomsQuantity(rooms)} для ${point.offer.guests} ${mapGuestQuantity(guests)}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до  ${point.offer.checkout}`;

  if(point.offer.features) {
    cardElement.querySelector('.popup__features').innerHTML = '';
    createFeaturesList(point.offer.features, cardElement.querySelector('.popup__features'));
  } else {
    cardElement.querySelector('.popup__features').remove();
  }

  if(point.offer.description) {
    cardElement.querySelector('.popup__description').textContent = point.offer.description;
  } else {
    cardElement.querySelector('.popup__description').remove();
  }

  if (point.offer.photos) {
    cardElement.querySelector('.popup__photos').innerHTML = '';
    createPhotosList(point.offer.photos, cardElement.querySelector('.popup__photos'));
  } else {
    cardElement.querySelector('.popup__photos').remove();
  }

  if(point.author.avatar) {
    cardElement.querySelector('.popup__avatar').src = point.author.avatar;
  }
  return cardElement;
};

export {createCustomPopup};
