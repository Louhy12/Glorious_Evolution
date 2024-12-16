const mapSlider = document.getElementById('map-slider');
const mapImage = document.getElementById('map-image');

mapSlider.addEventListener('input', function() {
    const mapIndex = mapSlider.value;
    switch(mapIndex) {
        case '1':
            mapImage.src = 'map/map1.jpeg';
            break;
        case '2':
            mapImage.src = 'map/map2.jpeg';
            break;
        case '3':
            mapImage.src = 'map/map3.jpeg';
            break;
    }
});

const filmReel = document.querySelector('.film-reel');
let scrollAmount = 0;

function autoScroll() {
    scrollAmount += 2;
    filmReel.scrollTop = scrollAmount;
    if (scrollAmount >= filmReel.scrollHeight) scrollAmount = 0;
}


// Get the slider and image elements
const slider = document.getElementById('map-slider');
const mapImage = document.getElementById('map-image');

// Add an event listener to update the image based on slider value
slider.addEventListener('input', function () {
    const commentNumber = this.value; // Get current slider value
    mapImage.src = `comments/comment${commentNumber}.png`; // Update the image source
    mapImage.alt = `Comment ${commentNumber}`; // Update the alt text
});


setInterval(autoScroll, 50);

