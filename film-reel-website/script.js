const mapSlider = document.getElementById('map-slider');
const mapImage = document.getElementById('map-image');
const filmReel = document.querySelector('.film-reel');
let scrollAmount = 0;

function autoScroll() {
    scrollAmount += 2;
    filmReel.scrollTop = scrollAmount;
    if (scrollAmount >= filmReel.scrollHeight) scrollAmount = 0;
}


mapSlider.addEventListener('input', function() {
    const mapIndex = mapSlider.value;
    switch(mapIndex) {
        case '1':
            mapImage.src = 'comments/comment1.png';
            break;
        case '2':
            mapImage.src = 'comments/comment2.png';
            break;
        case '3':
            mapImage.src = 'comments/comment3.png';
            break;
        case '4':
            mapImage.src = 'comments/comment4.png';
            break;
        case '5':
            mapImage.src = 'comments/comment5.png';
            break;
        case '6':
            mapImage.src = 'comments/comment6.png';
            break;
        case '7':
            mapImage.src = 'comments/comment7.png';
            break;
        case '8':
            mapImage.src = 'comments/comment8.png';
            break;
        case '9':
            mapImage.src = 'comments/comment9.png';
            break;
        case '10':
            mapImage.src = 'comments/comment10.png';
            break;
        case '11':
            mapImage.src = 'comments/comment11.png';
            break;
        case '12':
            mapImage.src = 'comments/comment12.png';
            break;
    }
});

mapSlider.addEventListener('input', function() {
    const mapIndex = mapSlider.value;
    switch(mapIndex) {
        case '1':
            mapImage.src = 'map/diversity_score/diversity1.jpeg';
            break;
        case '2':
            mapImage.src = 'map/diversity_score/diversity2.jpeg';
            break;
        case '3':
            mapImage.src = 'map/diversity_score/diversity3.jpeg';
            break;

    }
});

mapSlider.addEventListener('input', function() {
    const mapIndex = mapSlider.value;
    switch(mapIndex) {
        case '1':
            mapImage.src = 'map/height/height1.jpeg';
            break;
        case '2':
            mapImage.src = 'map/height/height2.jpeg';
            break;
        case '3':
            mapImage.src = 'map/height/height3.jpeg';
            break;

    }
});

mapSlider.addEventListener('input', function() {
    const mapIndex = mapSlider.value;
    switch(mapIndex) {
        case '1':
            mapImage.src = 'map/age/age1.jpeg';
            break;
        case '2':
            mapImage.src = 'map/age/age2.jpeg';
            break;
        case '3':
            mapImage.src = 'map/age/age3.jpeg';
            break;

    }
});

mapSlider.addEventListener('input', function() {
    const mapIndex = mapSlider.value;
    switch(mapIndex) {
        case '1':
            mapImage.src = 'map/gender/gender1.jpeg';
            break;
        case '2':
            mapImage.src = 'map/gender/gender2.jpeg';
            break;
        case '3':
            mapImage.src = 'map/gender/gender3.jpeg';
            break;

    }
});

mapSlider.addEventListener('input', function() {
    const mapIndex = mapSlider.value;
    switch(mapIndex) {
        case '1':
            mapImage.src = 'map/ethnicity/ethnicity1.jpeg';
            break;
        case '2':
            mapImage.src = 'map/ethnicity/ethnicity2.jpeg';
            break;
        case '3':
            mapImage.src = 'map/ethnicity/ethnicity3.jpeg';
            break;

    }
});

mapSlider.addEventListener('input', function() {
    const mapIndex = mapSlider.value;
    switch(mapIndex) {
        case '1':
            mapImage.src = 'map/foreign/foreign1.jpeg';
            break;
        case '2':
            mapImage.src = 'map/foreign/foreign2.jpeg';
            break;
        case '3':
            mapImage.src = 'map/foreign/foreign3.jpeg';
            break;

    }
});

setInterval(autoScroll, 50);

