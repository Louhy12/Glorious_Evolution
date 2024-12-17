const mapSlider = document.getElementById('map-slider');
const mapImage = document.getElementById('map-image');
const filmReel = document.querySelector('.film-reel');
let scrollAmount = 0;

function autoScroll() {
    scrollAmount += 2;
    filmReel.scrollTop = scrollAmount;
    if (scrollAmount >= filmReel.scrollHeight) scrollAmount = 0;
}


function initializeSliders() {
    // Map of slider IDs to folder paths
    const sliders = [
        { sliderId: "comments-slider", imageId: "comments-image", folder: "comments" },
        { sliderId: "diversity-slider", imageId: "diversity-image", folder: "map/diversity_score" },
        { sliderId: "height-slider", imageId: "height-image", folder: "map/height" },
        { sliderId: "age-slider", imageId: "age-image", folder: "map/age" },
        { sliderId: "gender-slider", imageId: "gender-image", folder: "map/gender" },
        { sliderId: "ethnicity-slider", imageId: "ethnicity-image", folder: "map/ethnicity" },
        { sliderId: "foreign-slider", imageId: "foreign-image", folder: "map/foreign" }
    ];

    // Loop through each slider and attach functionality
    sliders.forEach(({ sliderId, imageId, folder }) => {
        const slider = document.getElementById(sliderId);
        const image = document.getElementById(imageId);

        // Attach event listener to update the image dynamically
        slider.addEventListener("input", function () {
            const index = this.value; // Get slider value
            const newImagePath = `${folder}/comment${index}.png`; // Adjusted for "comments" folder
            image.src = newImagePath; // Update the image source
            image.alt = `${folder.split('/').pop()} ${index}`; // Update the alt text
        });
    });
}

// Initialize sliders when the DOM is loaded
document.addEventListener("DOMContentLoaded", initializeSliders);


setInterval(autoScroll, 50);

