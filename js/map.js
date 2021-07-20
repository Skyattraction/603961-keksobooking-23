import {debounce} from './utils/debounce.js';
import {enableForm} from './form/form-status.js';
import {createCustomPopup} from './popup-content.js';
import {getData} from './api.js';
import {showErrorAlert} from './utils.js';
import * as filters from './filter.js';

const RERENDER_DELAY = 500;
const COORDINATES_ROUND_NUMBER = 5;
const MAP_SCALE = 10;
const MAIN_MARKER_ICON_SIZE = 52;
const AD_MARKER_ICON_SIZE = 40;

const initialCoordinates =  {
  lat: 35.65283,
  lng: 139.83947,
};

let coordinates = initialCoordinates;

const initialCoordinatesValue = `${coordinates.lat}, ${coordinates.lng}`;
const adForm = document.querySelector('.ad-form');
const adAddress = adForm.querySelector('input[name="address"]');

const map = L.map('map-canvas');

const markerGroup = L.layerGroup().addTo(map);

const createMarkers = (items) => {
  items.forEach((adItem) => {
    const lat = adItem.location.lat;
    const lng = adItem.location.lng;
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [AD_MARKER_ICON_SIZE, AD_MARKER_ICON_SIZE],
      iconAnchor: [AD_MARKER_ICON_SIZE/2, AD_MARKER_ICON_SIZE],
    });
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker.addTo(markerGroup).bindPopup(createCustomPopup(adItem));
  });
};

const getInitialAdObjects = getData(
  (ads) => {
    const filteredAdList = ads.slice(0,filters.DISPLAYED_ADS_NUMBER);
    createMarkers(filteredAdList);
  },
  () => {
    showErrorAlert();
  },
);

const getFilteredAdObjects = getData(
  (ads) => {
    filters.setFilterFormChange(debounce(
      () => filters.addFilteredMarkers(ads),
      RERENDER_DELAY,
    ));
  },
  () => {
    showErrorAlert();
  },
);

map.on('load', () => {
  enableForm(['ad-form', 'map__filters']);
  adAddress.value = initialCoordinatesValue;
  getInitialAdObjects();
  getFilteredAdObjects();
})
  .setView(initialCoordinates, MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_MARKER_ICON_SIZE, MAIN_MARKER_ICON_SIZE],
  iconAnchor: [MAIN_MARKER_ICON_SIZE/2, MAIN_MARKER_ICON_SIZE],
});

const mainPinMarker = L.marker(
  initialCoordinates,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);
mainPinMarker.on('move', (evt) => {
  coordinates = evt.target.getLatLng();
  adAddress.value = `${coordinates.lat.toFixed(COORDINATES_ROUND_NUMBER)}, ${coordinates.lng.toFixed(COORDINATES_ROUND_NUMBER)}`;
});

export {initialCoordinates, initialCoordinatesValue, mainPinMarker, map, markerGroup, getInitialAdObjects, createMarkers};
