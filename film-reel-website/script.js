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
        { sliderId: "diversity-slider", imageId: "diversity-image", folder: "map/diversity" },
        { sliderId: "height-slider", imageId: "height-image", folder: "map/height" },
        { sliderId: "age-slider", imageId: "age-image", folder: "map/age" },
        { sliderId: "gender-slider", imageId: "gender-image", folder: "map/gender" },
        { sliderId: "ethnicity-slider", imageId: "ethnicity-image", folder: "map/ethnicity" },
        { sliderId: "foreign-slider", imageId: "foreign-image", folder: "map/foreign" },
        { sliderId: "comments-slider", imageId: "comments-image", folder: "comment" }
    ];

    sliders.forEach(({ sliderId, imageId, folder }) => {
        const slider = document.getElementById(sliderId);
        const image = document.getElementById(imageId);

        // Ensure slider and image elements exist
        if (slider && image) {
            console.log(`Initializing slider: ${sliderId}, folder: ${folder}`); // Debugging output
            slider.addEventListener("input", function () {
                const index = this.value; // Get current slider value
                const newImagePath = `${folder}/${folder.split('/').pop()}${index}.jpg`; // Build image path
                console.log(`Slider ${sliderId}: Updating to ${newImagePath}`); // Debugging output
                image.src = newImagePath; // Update image source
                image.alt = `${folder.split('/').pop()} ${index}`; // Update alt text
            });
        } else {
            console.error(`Slider or image not found for ID: ${sliderId}`); // Debugging output
        }
    });
}

// Initialize sliders on DOM load
document.addEventListener("DOMContentLoaded", initializeSliders);


// Initialize sliders when the DOM is loaded
document.addEventListener("DOMContentLoaded", initializeSliders);


setInterval(autoScroll, 50);

