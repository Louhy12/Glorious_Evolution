// Slider functionality
const mapSlider = document.getElementById('map-slider');
const mapImage = document.querySelector('.map-image'); // Updated to use the correct selector

mapSlider.addEventListener('input', function () {
    const mapIndex = mapSlider.value;

    // Change the map image source based on slider value
    switch (mapIndex) {
        case '1':
            mapImage.src = 'map/map1.jpeg';
            break;
        case '2':
            mapImage.src = 'map/map2.jpeg';
            break;
        case '3':
            mapImage.src = 'map/map3.jpeg';
            break;
        default:
            console.error(`No map image found for index: ${mapIndex}`);
            break;
    }
});

// Auto-scroll functionality
const filmReel = document.querySelector('.film-reel');
let scrollAmount = 0;
let isHovering = false; // Track if the user is hovering over the film reel

function autoScroll() {
    if (!isHovering) {
        scrollAmount += 2; // Adjust scroll speed if needed
        filmReel.scrollTop = scrollAmount;

        // Reset scroll amount when reaching the bottom
        if (scrollAmount >= filmReel.scrollHeight - filmReel.clientHeight) {
            scrollAmount = 0;
        }
    }
}

// Pause auto-scroll on hover
filmReel.addEventListener('mouseenter', function () {
    isHovering = true;
});

filmReel.addEventListener('mouseleave', function () {
    isHovering = false;
});

// Start auto-scroll
setInterval(autoScroll, 50);

