const mapSlider = document.getElementById('map-slider');
const mapImage = document.getElementById('map-image');


const filmReel = document.querySelector('.film-reel');
let scrollAmount = 0;

function autoScroll() {
    scrollAmount += 2;
    filmReel.scrollTop = scrollAmount;
    if (scrollAmount >= filmReel.scrollHeight) scrollAmount = 0;
}


// Function to initialize multiple sliders
function initializeSliders() {
    // Select all slider inputs
    const sliders = document.querySelectorAll('.map-slider-input');

    sliders.forEach(slider => {
        // Get the folder path from the data-folder attribute
        const folder = slider.dataset.folder;

        // Get the associated image element by matching the slider's ID
        const image = document.querySelector(`#${slider.id.replace('-slider', '-image')}`);

        // Add event listener to update the image dynamically
        slider.addEventListener('input', function () {
            const commentNumber = this.value; // Current slider value
            const imagePath = `${folder}/comment${commentNumber}.png`;

            // Update image src and alt text
            image.src = imagePath;
            image.alt = `Comment ${commentNumber}`;
        });
    });
}

// Call the function to set up all sliders
initializeSliders();



setInterval(autoScroll, 50);

