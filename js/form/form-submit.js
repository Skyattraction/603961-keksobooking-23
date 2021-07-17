import {sendData} from '../api.js';
import {filterForm} from '../filter.js';
import {initialCoordinates, mainPinMarker, getAdObjects} from '../map.js';
import {setAllInitialValues} from './form-validation.js';

const body = document.querySelector('body');
const adForm = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');

const closePopupOnKeydown = function(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    const messagePopover = document.querySelector('.popover-created');
    body.removeChild(messagePopover);
  }
};

const resetForm = () => {
  adForm.reset();
  filterForm.reset();
  getAdObjects();
  setAllInitialValues();
  mainPinMarker.setLatLng(initialCoordinates);
};

const closePopupWithCallback = (closeCallback, button) => {
  document.addEventListener('keydown', closePopupOnKeydown);
  document.addEventListener('click', closeCallback);
  if (button) {
    button.addEventListener('click', closeCallback);
  }
};

const removePopup = () => {
  const messagePopover = document.querySelector('.popover-created');
  document.removeEventListener('keydown', closePopupOnKeydown);
  document.removeEventListener('click', removePopup);
  body.removeChild(messagePopover);
};

const setUserFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => {
        onSuccess();
        resetForm();
      },
      () => onError(),
      new FormData(evt.target),
    );
  });
};

const showSuccessMessage = function() {
  const messageTemplate = document.querySelector('#success').content.querySelector('.success');
  const messageElement = messageTemplate.cloneNode(true);
  messageElement.classList.add('popover-created');
  body.appendChild(messageElement);
  closePopupWithCallback(removePopup);
};

const showErrorMessage = function() {
  const messageTemplate = document.querySelector('#error').content.querySelector('.error');
  const messageElement = messageTemplate.cloneNode(true);
  messageElement.classList.add('popover-created');
  const errorButton = document.querySelector('.error__button');
  body.appendChild(messageElement);
  closePopupWithCallback(removePopup, errorButton);
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

setUserFormSubmit(showSuccessMessage, showErrorMessage);
