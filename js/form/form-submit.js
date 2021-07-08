import {onPopupEscKeydown} from '../utils.js';
import {sendData} from '../api.js';
import {initialCoordinates, mainPinMarker} from '../map.js';
import {setAllInitialValues} from './form-validation.js';

const body = document.querySelector('body');
const adForm = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');

const resetForm = () => {
  adForm.reset();
  setAllInitialValues();
  mainPinMarker.setLatLng(initialCoordinates);
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const closePopup = (closeCallback, button) => {
  document.addEventListener('keydown', (evt) => {
    onPopupEscKeydown(closeCallback, evt);
  });
  document.addEventListener('click', closeCallback);
  if (button) {
    button.addEventListener('click', closeCallback);
  }
};

const closeMessage = () => {
  const messagePopover = document.querySelector('.popover-created');
  document.removeEventListener('keydown', (evt) => {
    onPopupEscKeydown(closeMessage, evt);
  });
  document.removeEventListener('click', closeMessage);
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
  closePopup(closeMessage);
};

const showErrorMessage = function() {
  const messageTemplate = document.querySelector('#error').content.querySelector('.error');
  const messageElement = messageTemplate.cloneNode(true);
  messageElement.classList.add('popover-created');
  const errorButton = document.querySelector('.error__button');
  body.appendChild(messageElement);
  closePopup(closeMessage, errorButton);
};

setUserFormSubmit(showSuccessMessage, showErrorMessage);
