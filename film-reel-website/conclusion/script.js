const mapSlider = document.getElementById('map-slider');
const mapImage = document.getElementById('map-image');
const filmReel = document.querySelector('.film-reel');
let scrollAmount = 0;

function autoScroll() {
    scrollAmount += 2;
    filmReel.scrollTop = scrollAmount;
    if (scrollAmount >= filmReel.scrollHeight) scrollAmount = 0;
}

document.addEventListener('DOMContentLoaded', function () {
    // Sélectionne tous les éléments ayant la classe "collapsible"
    const collapsible = document.querySelector('.collapsible');
    const content = document.querySelector('.content');

    // Ajoute un écouteur d'événement au clic
    collapsible.addEventListener('click', function () {
        // Si le contenu est déjà visible, on le cache
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            // Sinon, on l'affiche
            content.style.display = 'block';
        }
    });
});

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
            slider.addEventListener("input", function () {
                const index = this.value; // Get current slider value
                const newImagePath = `${folder}/${folder.split('/').pop()}${index}.${extension}`; // Build image path with dynamic extension
                console.log(`Slider ${sliderId}: Updating to ${newImagePath}`); // Debugging output
                image.src = newImagePath; // Update image source
                image.alt = `${folder.split('/').pop()} ${index}`; // Update alt text
            });
        } else {
            console.error(`Slider or image not found for ID: ${sliderId}`); // Debugging output
        }
    });
}

function addTicks(sliderId, ticksContainerId) {
    const slider = document.getElementById(sliderId);
    const ticksContainer = document.getElementById(ticksContainerId);
    
    if (!slider || !ticksContainer) {
        console.error(`Slider or ticks container not found: ${sliderId}, ${ticksContainerId}`);
        return;
    }

    const min = parseInt(slider.min, 10);
    const max = parseInt(slider.max, 10);
    const step = parseInt(slider.step, 10) || 1;

    // Calculate total steps including the min and max
    const totalSteps = ((max - min) / step) + 1;

    // Clear existing ticks
    ticksContainer.innerHTML = '';

    console.log(`Adding ${totalSteps} ticks for slider: ${sliderId}`);

    // Add ticks dynamically
    for (let i = 0; i < totalSteps; i++) {
        const value = min + i * step; // Calculate value for this tick
        const tick = document.createElement('span');
        tick.classList.add('tick'); // Add a class for styling (optional)
        tick.style.left = `${(i / (totalSteps - 1)) * 100}%`; // Evenly distribute ticks
        tick.setAttribute('data-value', value); // Set tick value as an attribute

        // Add label to the tick (optional)
        tick.textContent = value; 

        ticksContainer.appendChild(tick);
    }
}

// Call the function for your specific slider
addTicks('comment-slider', 'slider-ticks');

// Call the function for your specific slider
addTicks('comment-slider', 'slider-ticks');


// Call the function for your slider
addTicks('comment-slider', 'slider-ticks');

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

