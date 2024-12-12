const filmReel = document.querySelector('.film-reel');
let scrollAmount = 0;

function autoScroll() {
    scrollAmount += 2;
    filmReel.scrollTop = scrollAmount;
    if (scrollAmount >= filmReel.scrollHeight) scrollAmount = 0;
}

setInterval(autoScroll, 50);

document.addEventListener("DOMContentLoaded", () => {
    const mapSlider = document.getElementById("map-slider");
    const mapImage = document.getElementById("map-image");

    // Define the image paths
    const mapImages = [
        "map/map1.jpeg", // Before 1975
        "map/map2.jpeg", // 1975-1990
        "map/map3.jpeg", // After 1990
    ];

    // Change image based on slider value
    mapSlider.addEventListener("input", () => {
        const selectedIndex = mapSlider.value - 1; // Slider values start from 1
        mapImage.src = mapImages[selectedIndex];
    });
});

