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


// Get the slider, image, and slider value display elements
    const slider = document.getElementById('map-slider');
    const mapImage = document.getElementById('map-image');
    const sliderValue = document.getElementById('slider-value');

    // Add an event listener to update the image and label based on slider value
    slider.addEventListener('input', function () {
        const commentNumber = this.value; // Get current slider value
        const imagePath = `comments/comment${commentNumber}.png`;

        // Check if the image exists (optional, prevents broken images)
        fetch(imagePath, { method: 'HEAD' })
            .then((response) => {
                if (response.ok) {
                    mapImage.src = imagePath; // Update the image source
                    mapImage.alt = `Comment ${commentNumber}`; // Update the alt text
                    sliderValue.textContent = `Comment ${commentNumber}`; // Update slider value display
                } else {
                    console.error(`Image not found: ${imagePath}`);
                }
            })
            .catch((err) => console.error(`Error fetching image: ${err}`));
    });


setInterval(autoScroll, 50);

