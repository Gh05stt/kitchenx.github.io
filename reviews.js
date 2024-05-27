document.addEventListener("DOMContentLoaded",function(){
    populatePastReviews('pastreviews');
    populateLeftReviews('leftreviews');

    //Reviews

    //Open Review Container

    document.querySelector('.edit-btn').addEventListener('click', function(event) {
        event.preventDefault();
        toggleReviewVisibility();
    });

    //Post Review
    document.querySelector('.reviews-mask .confirmBtn-r').addEventListener('click', function() {
        document.querySelector('.reviews-mask').style.visibility = 'hidden';
    });

    //Cancel Review
    document.querySelector('.reviews-mask .closeBtn-r').addEventListener('click', function() {
        document.querySelector('.reviews-mask').style.visibility = 'hidden';
    });
});

function toggleReviewVisibility() {
    const reviewMask = document.querySelector('.reviews-mask');
    if (reviewMask.style.visibility === 'hidden' || reviewMask.classList.contains('hidden')) {
        reviewMask.classList.remove('hidden');
        reviewMask.style.visibility = 'visible';
    } else {
        reviewMask.style.visibility = 'hidden';
        reviewMask.classList.add('hidden');
    }
}

function populatePastReviews(listId) {
    const reviewList = document.getElementById(listId);
    const minReview = 2;
    const maxReview = 4;
    const types = ["Bakery Kitchen", "Ice Cream Parlor", "Pizzeria Kitchen", "Restaurant Kitchen", "Catering Kitchen", "Fast Food Kitchen"];
    const numReviews = Math.floor(Math.random() * (maxReview - minReview + 1)) + minReview;

    for (let i = 0; i < numReviews; i++) {
        const randomTypeIndex = Math.floor(Math.random() * types.length);
        const kitchenType = types[randomTypeIndex];
        const imagePath = `Images/Facilities/${kitchenType.replace(/ /g, '_')}/`;
        const imageNumber = Math.floor(Math.random() * 7) + 1;

        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.innerHTML = `
        <div class="review-details">
            <a href="view-facility.html"><img class="item-img" src="${imagePath}${imageNumber}.jpeg" alt="Property in ${kitchenType}"></a>
            <div class="review-description">
                <p class="item-location"><span>${getLocation()}, Auckland</span>  ★ ${getRandomRating(2,5)}</p>
                <p class="item-dates">${getRandomPastDates()}</p>
                <p class="item-price">${getRandomPrice()}</p>
                <p class="item-content-r">Review: ${getRandomReviewContent()}</p>
            </div>
            <div class="manage-review">
            <li><div class="edit-btn"><a><i class="fa-solid fa-pen-to-square"></i></i></a>
                <span class="edit-tip">Edit Review</span></div></li>
                <li><div class="delete-btn"><a href="#" onclick="removeReviewItem(this); return false;"><i class="fa-solid fa-trash"></i></a>
                    <span class="delete-tip">Remove Review</span></div></li> 
            </div>
        </div>
        `;
        reviewList.appendChild(reviewItem);
    }
}

function populateLeftReviews(listId) {
    const reviewList = document.getElementById(listId);
    const minReview = 2;
    const maxReview = 4;
    const types = ["Bakery Kitchen", "Ice Cream Parlor", "Pizzeria Kitchen", "Restaurant Kitchen", "Catering Kitchen", "Fast Food Kitchen"];
    const numReviews = Math.floor(Math.random() * (maxReview - minReview + 1)) + minReview;

    for (let i = 0; i < numReviews; i++) {
        const randomTypeIndex = Math.floor(Math.random() * types.length);
        const kitchenType = types[randomTypeIndex];
        const imagePath = `Images/Facilities/${kitchenType.replace(/ /g, '_')}/`;
        const imageNumber = Math.floor(Math.random() * 7) + 1;

        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.innerHTML = `
        <div class="review-details">
            <a href="view-facility.html"><img class="item-img" src="${imagePath}${imageNumber}.jpeg" alt="Property in ${kitchenType}"></a>
            <div class="review-description">
                <p class="item-location"><span>${getLocation()}, Auckland</span>  ★ ${getRandomRating(2,5)}</p>
                <p class="item-dates">${getRandomPastDates()}</p>
                <p class="item-price">${getRandomPrice()}</p>
                <p class="item-content-r">Review: ${getRandomProfileContent()}</p>
            </div>
        </div>
        `;
        reviewList.appendChild(reviewItem);
    }
}


//Generate stuff for thing
function getLocation() {
    const locations = [
        'Albany', 'Balmoral', 'Birkenhead', 'Blockhouse Bay', 'Botany Downs',
        'Browns Bay', 'Epsom', 'Glenfield', 'Greenlane', 'Grey Lynn',
        'Henderson', 'Hibiscus Coast', 'Howick', 'Manukau', 'Manurewa',
        'Mt Albert', 'Mt Eden', 'Mt Roskill', 'Mt Wellington', 'Newmarket',
        'Onehunga', 'Papakura', 'Parnell', 'Ponsonby', 'Remuera',
        'St Heliers', 'Takapuna', 'Titirangi', 'Waitakere', 'West Harbour',
        'Whangaparaoa'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
}

function getRandomRating(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
  }

function getRandomPastDates() {
    const start = new Date(); 
    start.setDate(start.getDate() - Math.floor(Math.random() * 30 + 1));
    const end = new Date(start); 


    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return `${formatDate(end)} - ${formatDate(start)}`;
}

function getRandomPrice() {
    const price = Math.floor(Math.random() * 900) + 100;
    return `$${price} daily`;
}

function removeReviewItem(element) {
    if (confirm("Are you sure you want to delete this review?")) {
        element.closest('.review-item').remove();
        updateNoBookingsMessage();
    }
    return false; 
}


function getRandomReviewContent(){
    const reviews = ["Alot of space", "Easy to communicate with Host",
        "Had everything we needed for our staff"
    ]

    return reviews[Math.floor(Math.random() * reviews.length)];
}

function getRandomProfileContent(){
    const reviews = ["Very friendly", "Easy to communicate with",
        "Cleaned up before leaving"
    ]

    return reviews[Math.floor(Math.random() * reviews.length)];
}