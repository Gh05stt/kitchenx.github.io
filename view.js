// Array of names
const names = [
  "Baljot Toor", "Harry Chhay", "Aaron Mendonca",
  "Krishant Maharaj", "Caleb Simmons", "Chuanze Zhao"
];

const kitchenTypes = [
  "Bakery Kitchen",
  "Ice Cream Parlor",
  "Pizzeria Kitchen",
  "Restaurant Kitchen",
  "Catering Kitchen",
  "Fast Food Kitchen"
];

function changeKitchenType() {
  const randomIndex = Math.floor(Math.random() * kitchenTypes.length);
  const selectedKitchenType = kitchenTypes[randomIndex];
  document.querySelector('.title').textContent = selectedKitchenType;

  updateImages(selectedKitchenType);
}

function updateImages(kitchenType) {
  const formattedType = kitchenType.replace(/ /g, '_'); // Replace spaces with underscores
  const images = document.querySelectorAll('.thumbnail');
  images.forEach((img, index) => {
    img.src = `Images/Facilities/${formattedType}/${index + 1}.jpeg`;
    img.alt = `Images/Facilities/${formattedType}/${index + 1}.jpeg`;
  });
}
window.onload = changeKitchenType;

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomRating() {
  return (Math.random() * 4 + 1).toFixed(1);
}

function getRandomReviews() {
  return (Math.floor(Math.random() * 301));
}

document.addEventListener('DOMContentLoaded', function() {
  const profileIcon = document.querySelector('.profile-icon');
  const hostName = document.querySelector('.host-name');
  const yearsHostingSpan = document.querySelector('.years-hosting');
  const reviews = document.querySelector('.reviews');
  const reviewsLink = document.querySelector('.reviews-link');
  const reviewsContainer = document.querySelector('.reviews-container');

  fetch('Data/reviews.json')
    .then(response => response.json())
    .then(reviewsData => {
      const randomName = getRandomElement(names);
      const firstLetter = randomName.charAt(0);
      profileIcon.textContent = firstLetter; 
      hostName.textContent = randomName; 
      const yearsHosting = Math.floor(Math.random() * 7) + 1;
      yearsHostingSpan.textContent = yearsHosting + (yearsHosting === 1 ? " Year Hosting" : " Years Hosting");
      
      let totalRating = getRandomRating(); // Initialize total rating
      let totalReviews = getRandomReviews(); // Initialize total reviews count


      // Generate 30 different review cards
      for (let i = 0; i < 30; i++) {
        const randomReviewData = getRandomElement(reviewsData);
        const { profilePhoto, name, reviewText } = randomReviewData;
        const reviewRating = getRandomRating(); // Generate random rating

        const review = document.createElement('div');
        review.classList.add('review');

        const authorImage = document.createElement('img');
        authorImage.src = profilePhoto;
        authorImage.alt = `Review Author ${i + 1}`;
        authorImage.classList.add('author-image');

        const authorName = document.createElement('p');
        authorName.textContent = name;
        authorName.classList.add('author-name');

        const rating = document.createElement('p');
        rating.textContent = `★ ${reviewRating}`;
        rating.classList.add('rating');

        const content = document.createElement('p');
        content.textContent = reviewText;
        content.classList.add('content');

        review.appendChild(authorImage);
        review.appendChild(authorName);
        review.appendChild(rating);
        review.appendChild(content);

        reviewsContainer.appendChild(review);
      }

      reviews.firstChild.textContent = `★ ${totalRating}`; // Set the average rating
      reviewsLink.textContent = `${totalReviews} Reviews`; // Update link text with total reviews count
    })
    .catch(error => {
      console.error('Error fetching reviews:', error);
    });
});

function getRandomRating() {
  return (Math.random() * 4 + 1).toFixed(1); // Generate random rating between 1 and 5
}
