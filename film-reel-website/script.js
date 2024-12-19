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
        { sliderId: "diversity-slider", imageId: "diversity-image", folder: "map/diversity", extension: "jpg" },
        { sliderId: "height-slider", imageId: "height-image", folder: "map/height", extension: "jpg" },
        { sliderId: "age-slider", imageId: "age-image", folder: "map/age", extension: "jpg" },
        { sliderId: "gender-slider", imageId: "gender-image", folder: "map/gender", extension: "jpg" },
        { sliderId: "ethnicity-slider", imageId: "ethnicity-image", folder: "map/ethnicity", extension: "jpg" },
        { sliderId: "foreign-slider", imageId: "foreign-image", folder: "map/foreign", extension: "jpg" },
        { sliderId: "comment-slider", imageId: "comment-image", folder: "comment", extension: "png" },
        { sliderId: "movie-slider", imageId: "movie-image", folder: "movie", extension: "png"} 
    ];

    sliders.forEach(({ sliderId, imageId, folder, extension }) => {
        const slider = document.getElementById(sliderId);
        const image = document.getElementById(imageId);

        // Ensure slider and image elements exist
        if (slider && image) {
            console.log(`Initializing slider: ${sliderId}, folder: ${folder}`); // Debugging output

            // Update image on slider input
            slider.addEventListener("input", function () {
                const index = this.value; // Get current slider value
                const newImagePath = `${folder}/${folder.split('/').pop()}${index}.${extension}`; // Build image path with dynamic extension
                console.log(`Slider ${sliderId}: Updating to ${newImagePath}`); // Debugging output
                image.src = newImagePath; // Update image source
                image.alt = `${folder.split('/').pop()} ${index}`; // Update alt text
            });

            // Add mouse and touch drag functionality
            let isDragging = false;

            slider.addEventListener("mousedown", () => { isDragging = true; });
            slider.addEventListener("mousemove", (event) => {
                if (isDragging) {
                    const sliderRect = slider.getBoundingClientRect();
                    const mouseX = event.clientX || event.touches?.[0]?.clientX;
                    const value = Math.round(
                        ((mouseX - sliderRect.left) / sliderRect.width) * (slider.max - slider.min) + parseInt(slider.min, 10)
                    );
                    slider.value = Math.min(Math.max(value, slider.min), slider.max); // Clamp value
                    slider.dispatchEvent(new Event("input")); // Trigger input event to update the image
                }
            });
            slider.addEventListener("mouseup", () => { isDragging = false; });
            slider.addEventListener("touchstart", () => { isDragging = true; });
            slider.addEventListener("touchmove", (event) => {
                if (isDragging) {
                    const sliderRect = slider.getBoundingClientRect();
                    const touchX = event.touches[0].clientX;
                    const value = Math.round(
                        ((touchX - sliderRect.left) / sliderRect.width) * (slider.max - slider.min) + parseInt(slider.min, 10)
                    );
                    slider.value = Math.min(Math.max(value, slider.min), slider.max); // Clamp value
                    slider.dispatchEvent(new Event("input")); // Trigger input event to update the image
                }
            });
            slider.addEventListener("touchend", () => { isDragging = false; });
        } else {
            console.error(`Slider or image not found for ID: ${sliderId}`); // Debugging output
        }
    });
}

// Add drag-and-slide functionality for all sliders
document.querySelectorAll('input[type="range"]').forEach(slider => {
    let isDragging = false;

    slider.addEventListener('mousedown', () => {
        isDragging = true;
    });

    slider.addEventListener('mousemove', event => {
        if (isDragging) {
            const rect = slider.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const value = Math.round((offsetX / rect.width) * (slider.max - slider.min) + parseInt(slider.min, 10));
            slider.value = Math.max(Math.min(value, slider.max), slider.min);
            slider.dispatchEvent(new Event('input')); // Trigger the input event
        }
    });

    slider.addEventListener('mouseup', () => {
        isDragging = false;
    });

    slider.addEventListener('mouseleave', () => {
        isDragging = false; // Stop dragging if cursor leaves slider area
    });

    // Touch support for mobile devices
    slider.addEventListener('touchstart', () => {
        isDragging = true;
    });

    slider.addEventListener('touchmove', event => {
        if (isDragging) {
            const rect = slider.getBoundingClientRect();
            const touchX = event.touches[0].clientX;
            const offsetX = touchX - rect.left;
            const value = Math.round((offsetX / rect.width) * (slider.max - slider.min) + parseInt(slider.min, 10));
            slider.value = Math.max(Math.min(value, slider.max), slider.min);
            slider.dispatchEvent(new Event('input')); // Trigger the input event
        }
    });

    slider.addEventListener('touchend', () => {
        isDragging = false;
    });
});


// Track votes for 'fact' and 'fiction'
let votes = { fact: 0, fiction: 0 };

function vote(choice) {
    // Increment the vote for the selected option
    votes[choice]++;

    // Calculate total votes
    const totalVotes = votes.fact + votes.fiction;

    // Update the results bar
    const factBar = document.getElementById('fact-bar');
    const fictionBar = document.getElementById('fiction-bar');

    const factPercentage = ((votes.fact / totalVotes) * 100).toFixed(1);
    const fictionPercentage = ((votes.fiction / totalVotes) * 100).toFixed(1);

    factBar.style.width = `${factPercentage}%`;
    fictionBar.style.width = `${fictionPercentage}%`;

    factBar.textContent = `Fact: ${factPercentage}% (${votes.fact})`;
    fictionBar.textContent = `Fiction: ${fictionPercentage}% (${votes.fiction})`;

    // Make the results bar visible
    document.querySelector('.results-container').style.display = 'block';
}

// Initialize sliders on DOM load
document.addEventListener("DOMContentLoaded", initializeSliders);

setInterval(autoScroll, 50);

