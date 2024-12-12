const mapSlider = document.getElementById('map-slider');
const mapImage = document.getElementById('map-image');

mapSlider.addEventListener('input', function() {
    const mapIndex = mapSlider.value;
    switch(mapIndex) {
        case '1':
            mapImage.src = 'images/map1.jpeg';
            break;
        case '2':
            mapImage.src = 'images/map2.jpeg';
            break;
        case '3':
            mapImage.src = 'images/map3.jpeg';
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

setInterval(autoScroll, 50);

