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

const BACKEND_URL = 'mongodb+srv://pikapika:Ux8IK6NjjqKbEJd7@quizresponsesada.mdeyb.mongodb.net/?retryWrites=true&w=majority'; // Replace with your backend URL when deployed

// Vote function to handle button clicks
function vote(choice) {
    console.log(`User selected: ${choice}`); // Debugging log

    // Submit the answer to the server
    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: choice }),
    })
    .then(response => {
        console.log('Server response to /submit:', response); // Debugging log
        if (!response.ok) {
            throw new Error('Failed to submit answer');
        }
        console.log('Answer submitted successfully');
        return response.json();
    })
    .then(() => {
        console.log('Fetching updated stats...'); // Debugging log
        updateStats(); // Fetch updated stats after submission
    })
    .catch(error => {
        console.error('Error submitting answer:', error);
    });
}

// Function to update the response bars
function updateStats() {
    console.log('Requesting stats from the server...'); // Debugging log
    fetch('http://localhost:3000/stats')
        .then(response => {
            console.log('Server response to /stats:', response); // Debugging log
            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched stats from server:', data); // Debugging log

            const factCount = data.find(item => item._id === 'fact')?.count || 0;
            const fictionCount = data.find(item => item._id === 'fiction')?.count || 0;

            const total = factCount + fictionCount;
            const factPercentage = total > 0 ? (factCount / total) * 100 : 0;
            const fictionPercentage = total > 0 ? (fictionCount / total) * 100 : 0;

            console.log(`Fact: ${factCount}, Fiction: ${fictionCount}, Total: ${total}`);
            console.log(`Fact Percentage: ${factPercentage}%, Fiction Percentage: ${fictionPercentage}%`);

            document.getElementById('fact-bar').style.width = `${factPercentage}%`;
            document.getElementById('fact-bar').textContent = `Fact: ${factPercentage.toFixed(1)}%`;

            document.getElementById('fiction-bar').style.width = `${fictionPercentage}%`;
            document.getElementById('fiction-bar').textContent = `Fiction: ${fictionPercentage.toFixed(1)}%`;

            document.querySelector('.results-container').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching stats:', error);
        });
}

// Fetch initial stats on page load
console.log('Initializing stats fetch on page load...'); // Debugging log
window.onload = updateStats;

// Initialize sliders on DOM load
document.addEventListener("DOMContentLoaded", initializeSliders);

setInterval(autoScroll, 50);

