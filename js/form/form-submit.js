import {sendData} from '../api.js';
import {filterForm} from '../filter.js';
import {map, initialCoordinates, markerGroup, mainPinMarker, getInitialAdObjects} from '../map.js';
import {resetAllFilePreviewFields} from './form-file-reader.js';
import {setAllInitialValues} from './form-validation.js';

const body = document.querySelector('body');
const adForm = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const onEscKeydownClose = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    const messagePopover = document.querySelector('.popover-created');
    body.removeChild(messagePopover);
  }
};

const resetForm = () => {
  adForm.reset();
  filterForm.reset();
  map.closePopup();
  markerGroup.clearLayers();
  resetAllFilePreviewFields();
  getInitialAdObjects();
  setAllInitialValues();
  mainPinMarker.setLatLng(initialCoordinates);
};

const closePopupWithCallback = (closeCallback, button) => {
  document.addEventListener('keydown', onEscKeydownClose);
  document.addEventListener('click', closeCallback);
  if (button) {
    button.addEventListener('click', closeCallback);
  }
};

const removePopup = () => {
  const messagePopover = document.querySelector('.popover-created');
  document.removeEventListener('keydown', onEscKeydownClose);
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

const showSuccessMessage = () => {
  const messageElement = successMessageTemplate.cloneNode(true);
  messageElement.classList.add('popover-created');
  body.appendChild(messageElement);
  closePopupWithCallback(removePopup);
};

const showErrorMessage = () => {
  const messageElement = errorMessageTemplate.cloneNode(true);
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
