import {initialCoordinatesValue} from '../map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_ROOM_PRICE = 1000000;
const MIN_ROOM_PRICE_BUNGALOW = 0;
const MIN_ROOM_PRICE_FLAT = 1000;
const MIN_ROOM_PRICE_HOTEL = 3000;
const MIN_ROOM_PRICE_HOUSE = 5000;
const MIN_ROOM_PRICE_PALACE = 10000;

const adForm = document.querySelector('.ad-form');
const adFormSubmitButton = adForm.querySelector('.ad-form__submit');
const inputs = adForm.getElementsByTagName('input');
const adTitle = adForm.querySelector('input[name="title"]');
const adAddress = adForm.querySelector('input[name="address"]');
const adPrice = adForm.querySelector('input[name="price"]');
const adRooms = adForm.querySelector('select[name="rooms"]');
const adGuests = adForm.querySelector('select[name="capacity"]');
const adGuestsOptions = adGuests.options;
const adType = adForm.querySelector('select[name="type"]');
const timeIn = adForm.querySelector('select[name="timein"]');
const timeOut = adForm.querySelector('select[name="timeout"]');

let stopSubmit;
let adTypeValue;
let adTypeContent;
let valueRooms;
let minRoomPrice;
let timeValue;

const setInitialGuestOptions = () => {
  Array.from(adGuestsOptions).forEach((option) => {
    if(option.value !== '1') {
      option.disabled = true;
    } else {
      option.selected = true;
    }
  });
};

const setInitialRoomsOptions = () => {
  valueRooms = adRooms.value;
  switch (valueRooms) {
    case '1':
      setInitialGuestOptions();
      break;
    case '2':
      setInitialGuestOptions();
      Array.from(adGuestsOptions).forEach((option) => {
        option.disabled = false;
        if(option.value !== '1' && option.value !== '2' ) {
          option.disabled = true;
        }
      });
      break;
    case '3':
      setInitialGuestOptions();
      Array.from(adGuestsOptions).forEach((option) => {
        option.disabled = false;
        if(option.value === '0' ) {
          option.disabled = true;
        }
      });
      break;
    case '100':
      Array.from(adGuestsOptions).forEach((option) => {
        option.disabled = false;
        if(option.value !== '0' ) {
          option.disabled = true;
        } else {
          option.selected = true;
        }
      });
      break;
    default:
      throw new Error('Incorrect value');
  }
};

const setInitialPriceOptions = () => {
  adTypeValue = adType.value;
  adTypeContent = adType.options[adType.selectedIndex].text;
  switch (adTypeValue) {
    case 'bungalow':
      minRoomPrice = MIN_ROOM_PRICE_BUNGALOW;
      break;
    case 'flat':
      minRoomPrice = MIN_ROOM_PRICE_FLAT;
      break;
    case 'hotel':
      minRoomPrice = MIN_ROOM_PRICE_HOTEL;
      break;
    case 'house':
      minRoomPrice = MIN_ROOM_PRICE_HOUSE;
      break;
    case 'palace':
      minRoomPrice = MIN_ROOM_PRICE_PALACE;
      break;
    default:
      throw new Error('Incorrect type');
  }
  adPrice.placeholder = minRoomPrice;
};

const setInitialTimeOptions = () => {
  timeValue = timeIn.value;
  timeOut.value = timeValue;
};

const setAllInitialValues = () => {
  stopSubmit = false;
  adAddress.value = initialCoordinatesValue;
  setInitialPriceOptions();
  setInitialRoomsOptions();
  setInitialTimeOptions();
  Array.from(inputs).forEach((inputItem) => {
    inputItem.style.border = '';
  });
};

setAllInitialValues();

adFormSubmitButton.addEventListener('click', (evt) => {
  Array.from(inputs).forEach((inputItem) => {
    if (inputItem.checkValidity() === false) {
      stopSubmit = true;
      inputItem.style.border = '3px solid #FF4B4B';
    }
  });

  if (stopSubmit) {
    evt.preventDefault();
  }
});

adTitle.addEventListener('input', () => {
  stopSubmit = false;
  adTitle.style.border = '';
  const valueLength = adTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    adTitle.setCustomValidity('');
  }

  adTitle.reportValidity();
});

adRooms.addEventListener('change', () => {
  setInitialRoomsOptions();
});

adType.addEventListener('change', () => {
  setInitialPriceOptions();
});

adPrice.addEventListener('input', () => {
  stopSubmit = false;
  adPrice.style.border = '';
  const valueLength = adPrice.value;

  if (valueLength > MAX_ROOM_PRICE) {
    adPrice.setCustomValidity(`Максимальная цена - ${MAX_ROOM_PRICE}`);
  } else if (valueLength < minRoomPrice) {
    adPrice.setCustomValidity(`Минимальная цена для жилья типа "${adTypeContent}" - ${minRoomPrice}`);
  }
  else {
    adPrice.setCustomValidity('');
  }

  adPrice.reportValidity();
});

timeIn.addEventListener('change', () => {
  setInitialTimeOptions();
});


timeOut.addEventListener('change', () => {
  timeValue = timeOut.value;
  timeIn.value = timeValue;
});

export {setAllInitialValues};
