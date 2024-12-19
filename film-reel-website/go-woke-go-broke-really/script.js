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

const BACKEND_URL = 'http://localhost:3000'; // Replace with your backend URL when deployed

// Submit an answer to the backend
const submitAnswer = async (answer) => {
    try {
        const response = await fetch(`${BACKEND_URL}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer }),
        });

        if (response.ok) {
            console.log('Answer submitted successfully');
            fetchStats(); // Update stats after submission
        } else {
            console.error('Failed to submit answer');
        }
    } catch (error) {
        console.error('Error submitting answer:', error);
    }
};

const fetchStats = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/stats`);
        const data = await response.json();

        // Extract counts for fact and fiction
        const factCount = data.find(item => item._id === 'fact')?.count || 0;
        const fictionCount = data.find(item => item._id === 'fiction')?.count || 0;

        // Calculate total and percentages
        const total = factCount + fictionCount;
        const factPercentage = total > 0 ? (factCount / total) * 100 : 0;
        const fictionPercentage = total > 0 ? (fictionCount / total) * 100 : 0;

        // Update progress bars dynamically
        const factBar = document.getElementById('fact-bar');
        factBar.style.width = `${factPercentage}%`;
        factBar.textContent = `Fact: ${factPercentage.toFixed(1)}%`;

        const fictionBar = document.getElementById('fiction-bar');
        fictionBar.style.width = `${fictionPercentage}%`;
        fictionBar.textContent = `Fiction: ${fictionPercentage.toFixed(1)}%`;
    } catch (error) {
        console.error('Error fetching stats:', error);
        // Handle error by displaying a default message
        document.getElementById('fact-bar').textContent = 'Fact: Error';
        document.getElementById('fiction-bar').textContent = 'Fiction: Error';
    }
};


// Add event listeners to the quiz buttons
document.getElementById('fact-button').addEventListener('click', () => {
    submitAnswer('fact');
});

document.getElementById('fiction-button').addEventListener('click', () => {
    submitAnswer('fiction');
});

// Fetch stats when the page loads
window.onload = fetchStats;


// Initialize sliders on DOM load
document.addEventListener("DOMContentLoaded", initializeSliders);

setInterval(autoScroll, 50);

