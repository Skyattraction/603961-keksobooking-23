import {markerGroup, createMarkers} from './map.js';

const filterForm = document.querySelector('.map__filters');
const housingTypeFilter = filterForm.querySelector('#housing-type');
const housingPriceFilter = filterForm.querySelector('#housing-price');
const housingRoomsFilter = filterForm.querySelector('#housing-rooms');
const housingGuestsFilter = filterForm.querySelector('#housing-guests');
const housingFeaturesFilter = filterForm.querySelector('#housing-features');

const filterByType = (adItem) => {
  let rank = 0;

  if (housingTypeFilter.value === adItem.offer.type || housingTypeFilter.value === 'any') {
    rank = 1;
  }

  return rank > 0;
};

const filterByPrice = (adItem) => {
  let rank = 0;

  if ((housingPriceFilter.value === 'middle' && adItem.offer.price >= 10000 && adItem.offer.price <= 50000) ||
  (housingPriceFilter.value === 'low' && adItem.offer.price < 10000) ||
  (housingPriceFilter.value === 'high' && adItem.offer.price > 50000) ||
  housingPriceFilter.value === 'any') {
    rank = 1;
  }

  return rank > 0;
};

const filterByRooms = (adItem) => {
  let rank = 0;
  if((housingRoomsFilter.value === (adItem.offer.rooms).toString()) ||
    housingRoomsFilter.value === 'any') {
    rank = 1;
  }

  return rank > 0;
};

const filterByGuests = (adItem) => {
  let rank = 0;

  if((housingGuestsFilter.value === (adItem.offer.guests).toString()) ||
    (housingGuestsFilter.value === '0' && adItem.offer.guests === 100) ||
    housingGuestsFilter.value === 'any') {
    rank = 1;
  }

  return rank > 0;
};

const filterByFeatures = (adItem) => {
  let rank = 0;
  const featuresAdArray = adItem.offer.features;
  const featuresFilterArray = [];
  const featuresInputArray = housingFeaturesFilter.querySelectorAll('input:checked');
  Array.from(featuresInputArray).forEach((inputItem) => {
    featuresFilterArray.push(inputItem.value);
  });

  if(featuresAdArray) {
    const featuresAdArraySorted = featuresAdArray.slice().sort();
    const featuresFilterArraySorted = featuresFilterArray.slice().sort();
    const ffa = featuresAdArraySorted.filter((elem) => featuresFilterArraySorted.indexOf(elem) > -1).length;

    if(ffa === featuresFilterArraySorted.length) {
      rank = 1;
    }
  }

  if(featuresFilterArray.length === 0) {
    rank = 1;
  }

  return rank > 0;
};

const addFilters = function(items) {
  const filteredItems = items
    .slice()
    .filter(filterByType)
    .filter(filterByPrice)
    .filter(filterByRooms)
    .filter(filterByGuests)
    .filter(filterByFeatures)
    .slice(0, 10);

  createMarkers(filteredItems);

  return filteredItems;
};

const setFilterTypeChange = (cb) => {
  housingTypeFilter.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const setFilterPriceChange = (cb) => {
  housingPriceFilter.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const setFilterRoomsChange = (cb) => {
  housingRoomsFilter.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const setFilterGuestsChange = (cb) => {
  housingGuestsFilter.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const setFilterFeaturesClick = (cb) => {
  housingFeaturesFilter.addEventListener('click', () => {
    markerGroup.clearLayers();
    cb();
  });
};
export {addFilters, setFilterTypeChange, setFilterPriceChange, setFilterRoomsChange, setFilterGuestsChange, setFilterFeaturesClick};
