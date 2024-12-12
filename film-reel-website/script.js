const filmReel = document.querySelector('.film-reel');
let scrollAmount = 0;

function autoScroll() {
    scrollAmount += 2;
    filmReel.scrollTop = scrollAmount;
    if (scrollAmount >= filmReel.scrollHeight) scrollAmount = 0;
}

setInterval(autoScroll, 50);

// Paths to your GeoJSON files in the 'map' folder
const geojsonFiles = [
    "map/choropleth_old_movies_(before_1975).geojson",
    "map/choropleth_movies_(1975-1990).geojson",
    "map/choropleth_new_movies_(after_1990).geojson",
];

// Initialize the map
const map = L.map("map").setView([0, 0], 2); // Adjust view to your data

// Add a tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Variable to hold the current GeoJSON layer
let currentLayer = null;

// Function to load and display GeoJSON
function loadGeoJSON(file) {
    if (currentLayer) {
        map.removeLayer(currentLayer); // Remove previous layer
    }
    fetch(file)
        .then((response) => response.json())
        .then((data) => {
            currentLayer = L.geoJSON(data).addTo(map);
            map.fitBounds(currentLayer.getBounds());
        })
        .catch((error) => console.error("Error loading GeoJSON:", error));
}

// Load the first GeoJSON by default
loadGeoJSON(geojsonFiles[0]);

// Slider logic
const slider = document.getElementById("map-slider");
slider.addEventListener("input", (event) => {
    const index = parseInt(event.target.value) - 1; // Slider values are 1, 2, 3
    loadGeoJSON(geojsonFiles[index]);
});
