import {enableForm} from './form/form-status.js';
import {createCustomPopup} from './popup-content.js';
import {getData} from './api.js';
import {showErrorAlert} from './utils.js';

const initialCoordinates =  {
  lat: 35.65283,
  lng: 139.83947,
};

let coordinates = initialCoordinates;

const initialCoordinatesValue = `Lat: ${coordinates.lat} Lng: ${coordinates.lng}`;
const adForm = document.querySelector('.ad-form');
const adAddress = adForm.querySelector('input[name="address"]');

const map = L.map('map-canvas');

const getAdObjects = getData(
  (ads) => {
    ads.forEach((adItem) => {
      const lat = adItem.location.lat;
      const lng = adItem.location.lng;
      const icon = L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
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

      marker.addTo(map).bindPopup(createCustomPopup(adItem));
    });
  },
  (err) => {
    showErrorAlert(err);
  },
);

map.on('load', () => {
  enableForm(['ad-form', 'map__filters']);
  adAddress.value = initialCoordinatesValue;
  getAdObjects();
})
  .setView({
    lat: 35.65283,
    lng: 139.83947,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.65283,
    lng: 139.83947,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  coordinates = evt.target.getLatLng();
  adAddress.value = `Lat: ${coordinates.lat.toFixed(5)} Lng: ${coordinates.lng.toFixed(5)}`;
});

export {initialCoordinates, initialCoordinatesValue, mainPinMarker};
