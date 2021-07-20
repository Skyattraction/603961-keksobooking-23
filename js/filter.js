import {isArrayIncludesOtherArray} from './utils.js';
import {markerGroup, createMarkers} from './map.js';

const DISPLAYED_ADS_NUMBER = 10;
const ROOM_PRICE_LOW = 10000;
const ROOM_PRICE_HIGH = 50000;
const GUESTS_QUANTITY_NOT_FOR_GUESTS = 100;

const filterForm = document.querySelector('.map__filters');
const housingTypeFilter = filterForm.querySelector('#housing-type');
const housingPriceFilter = filterForm.querySelector('#housing-price');
const housingRoomsFilter = filterForm.querySelector('#housing-rooms');
const housingGuestsFilter = filterForm.querySelector('#housing-guests');
const housingFeaturesFilter = filterForm.querySelector('#housing-features');


const filterByType = (adItem) => (housingTypeFilter.value === adItem.offer.type || housingTypeFilter.value === 'any');

const filterByPrice = (adItem) => (
  (housingPriceFilter.value === 'middle' && adItem.offer.price >= ROOM_PRICE_LOW && adItem.offer.price <= ROOM_PRICE_HIGH) ||
  (housingPriceFilter.value === 'low' && adItem.offer.price < ROOM_PRICE_LOW) ||
  (housingPriceFilter.value === 'high' && adItem.offer.price > ROOM_PRICE_HIGH) ||
  housingPriceFilter.value === 'any');

const filterByRooms = (adItem) => (
  housingRoomsFilter.value === (adItem.offer.rooms).toString() ||
  housingRoomsFilter.value === 'any');

const filterByGuests = (adItem) => (
  housingGuestsFilter.value === (adItem.offer.guests).toString() ||
  (housingGuestsFilter.value === '0' && adItem.offer.guests === GUESTS_QUANTITY_NOT_FOR_GUESTS) ||
  housingGuestsFilter.value === 'any');

const filterByFeatures = (adItem) => {
  const initialFeatures = adItem.offer.features;
  const filteredFeatures = [];
  const featuresInputs = housingFeaturesFilter.querySelectorAll('input:checked');
  featuresInputs.forEach((inputItem) => {
    filteredFeatures.push(inputItem.value);
  });

  if(filteredFeatures.length === 0) {
    return true;
  }

  if(initialFeatures && filteredFeatures.length) {
    return isArrayIncludesOtherArray(initialFeatures, filteredFeatures);
  }

  return false;
};

const setAllFilters = (items) => {
  const filteredItems = [];
  for (let index = 0; index < items.length; index++) {
    const itemElement = items[index];

    if (filterByType(itemElement) &&
    filterByPrice(itemElement) &&
    filterByRooms(itemElement) &&
    filterByGuests(itemElement) &&
    filterByFeatures(itemElement)) {
      filteredItems.push(itemElement);
    }
    if (filteredItems.length === DISPLAYED_ADS_NUMBER) {
      break;
    }
  }
  return filteredItems;
};

const addFilteredMarkers = (items) => {
  createMarkers(setAllFilters(items));
};

const setFilterFormChange = (cb) => {
  filterForm.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

export {filterForm, addFilteredMarkers, setFilterFormChange, DISPLAYED_ADS_NUMBER};
