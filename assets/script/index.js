/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    Geolocation 

    Noah Miller

 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

'use strict'

const overlay = document.querySelector('.overlay');
const loading = document.querySelector('.loading');

mapboxgl.accessToken = 'pk.eyJ1Ijoibm9zZWJ5IiwiYSI6ImNsZzViYjM3bTAxcGEzaHFybDd3MW8wMnYifQ.wk2obNgJ24gbwkd7D-kJtw'

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0],
    pitch: 40,
    zoom: 16
});

map.dragPan.disable();
map.keyboard.disable();
map.scrollZoom.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disable();

const marker = new mapboxgl.Marker({
    color: '#3898ff'
});

function getLocation(position) {
    const { longitude, latitude } = position.coords;

    if (longitude && latitude) {
        map.setCenter([longitude, latitude]);
        marker.setLngLat([longitude, latitude]).addTo(map);
        setTimeout(() => { overlay.style.display = 'none' }, 500)
    }
}

function errorHandler(event) {
    loading.style.animationPlayState = 'paused';
    console.log(event.message);
};

const options = {
    enableHighAccuracy: true,
    maximumAge: 0
};

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(getLocation, errorHandler, options);
} else {
    console.log('Geolocation is not enabled')
}