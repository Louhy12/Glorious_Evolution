// Existing code for map sliders and auto-scroll
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

        if (slider && image) {
            slider.addEventListener("input", function () {
                const index = this.value;
                const newImagePath = `${folder}/${folder.split('/').pop()}${index}.${extension}`;
                image.src = newImagePath;
                image.alt = `${folder.split('/').pop()} ${index}`;
            });
        }
    });
}

let votes = { fact: 0, fiction: 0 };

function vote(choice) {
    votes[choice]++;
    const totalVotes = votes.fact + votes.fiction;

    const factBar = document.getElementById('fact-bar');
    const fictionBar = document.getElementById('fiction-bar');

    const factPercentage = ((votes.fact / totalVotes) * 100).toFixed(1);
    const fictionPercentage = ((votes.fiction / totalVotes) * 100).toFixed(1);

    factBar.style.width = `${factPercentage}%`;
    fictionBar.style.width = `${fictionPercentage}%`;

    factBar.textContent = `Fact: ${factPercentage}% (${votes.fact})`;
    fictionBar.textContent = `Fiction: ${fictionPercentage}% (${votes.fiction})`;

    document.querySelector('.results-container').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", initializeSliders);
setInterval(autoScroll, 50);

// === New code starts here ===

// Define your backend URL
const BACKEND_URL = "mongodb+srv://pikapika:Ux8IK6NjjqKbEJd7@quizresponsesada.mdeyb.mongodb.net/?retryWrites=true&w=majority"; // Replace with your deployed backend URL if applicable

// Fetch and display quiz statistics
const fetchStats = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/stats`);
        const data = await response.json();

        const factCount = data.find(item => item._id === 'fact')?.count || 0;
        const fictionCount = data.find(item => item._id === 'fiction')?.count || 0;

        const total = factCount + fictionCount;
        const factPercentage = total > 0 ? (factCount / total) * 100 : 0;
        const fictionPercentage = total > 0 ? (fictionCount / total) * 100 : 0;

        document.getElementById('fact-bar').style.width = `${factPercentage}%`;
        document.getElementById('fact-bar').textContent = `Fact: ${factPercentage.toFixed(1)}%`;

        document.getElementById('fiction-bar').style.width = `${fictionPercentage}%`;
        document.getElementById('fiction-bar').textContent = `Fiction: ${fictionPercentage.toFixed(1)}%`;
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
};

// Function to handle quiz responses
const submitAnswer = async (answer) => {
    try {
        const response = await fetch(`${BACKEND_URL}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer }),
        });

        if (response.ok) {
            alert('Answer submitted successfully!');
            fetchStats(); // Refresh the stats after submission
        } else {
            alert('Failed to submit answer');
        }
    } catch (error) {
        console.error('Error submitting answer:', error);
    }
};

// Attach event listeners to quiz buttons
document.getElementById('fact-button').addEventListener('click', () => {
    submitAnswer('fact');
});
document.getElementById('fiction-button').addEventListener('click', () => {
    submitAnswer('fiction');
});

// Call fetchStats when the page loads
window.onload = fetchStats;


