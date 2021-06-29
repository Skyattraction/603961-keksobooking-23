const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_ROOM_PRICE = 1000000;

const adForm = document.querySelector('.ad-form');
const adTitle = adForm.querySelector('input[name="title"]');
const adPrice = adForm.querySelector('input[name="price"]');
const adRooms = adForm.querySelector('select[name="rooms"]');
const adGuests = adForm.querySelector('select[name="capacity"]');
const adGuestsOptions = adGuests.options;

let valueRooms = 1;

const setInitialGuestOptions = function() {
  Array.from(adGuestsOptions).forEach((option) => {
    if(option.value !== '1') {
      option.disabled = true;
    } else {
      option.selected = true;
    }
  });
};

setInitialGuestOptions();
// const validateFields = function() {

//   adTitle.addEventListener('invalid', () => {
//     if (adTitle.validity.tooShort) {
//       adTitle.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
//     } else if (adTitle.validity.tooLong) {
//       adTitle.setCustomValidity('Заголовок должен состоять максимум из 100 символов');
//     } else if (adTitle.validity.valueMissing) {
//       adTitle.setCustomValidity('Обязательное поле');
//     } else {
//       adTitle.setCustomValidity('');
//     }
//   });
// console.log(adTitle);
// };


adTitle.addEventListener('input', () => {
  const valueLength = adTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    adTitle.setCustomValidity('');
  }

  adTitle.reportValidity();
});

adPrice.addEventListener('input', () => {
  const valueLength = adPrice.value;

  if (valueLength > MAX_ROOM_PRICE) {
    adPrice.setCustomValidity(`Максимальная цена - ${MAX_ROOM_PRICE}`);
  } else {
    adPrice.setCustomValidity('');
  }

  adPrice.reportValidity();
});

adRooms.addEventListener('change', () => {
  valueRooms = adRooms.value;
  switch (valueRooms) {
    case '1':
      setInitialGuestOptions();
      break;
    case '2':
      Array.from(adGuestsOptions).forEach((option) => {
        option.disabled = false;
        if(option.value !== '1' && option.value !== '2' ) {
          option.disabled = true;
        } else if (option.value === '1') {
          option.selected = true;
        }
      });
      break;
    case '3':
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
});
