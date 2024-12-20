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
        { sliderId: "movie-slider", imageId: "movie-image", folder: "movie", extension: "png" }
    ];

    sliders.forEach(({ sliderId }) => {
        const slider = document.getElementById(sliderId);
        const ticksContainer = slider.parentElement.querySelector('.ticks');

        if (slider && ticksContainer) {
            const min = parseInt(slider.min, 10);
            const max = parseInt(slider.max, 10);
            const step = parseInt(slider.step, 10);
            const tickCount = (max - min) / step;

            ticksContainer.innerHTML = ''; // Clear previous ticks

            for (let i = 0; i <= tickCount; i++) {
                const tick = document.createElement('span');
                tick.style.position = 'absolute';
                tick.style.left = `${(i / tickCount) * 100}%`; // Adjust position
                tick.style.transform = 'translateX(-50%)'; // Center-align tick
                ticksContainer.appendChild(tick);
            }
        }
    });
}

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

