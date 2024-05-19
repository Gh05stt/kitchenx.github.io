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
  const formattedType = kitchenType.replace(/ /g, '_'); 
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
function updateImages(kitchenType) {
  const formattedType = kitchenType.replace(/ /g, '_'); 
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumbnail, index) => {
    const newPath = `Images/Facilities/${formattedType}/${index + 1}.jpeg`;
    thumbnail.src = newPath;
    thumbnail.alt = `Image of ${formattedType} ${index + 1}`;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  const profileIcon = document.querySelector('.profile-icon');
  const hostName = document.querySelector('.host-name');
  const yearsHostingSpan = document.querySelector('.years-hosting');
  const reviewsContainer = document.querySelector('.reviews-container');
  const successSplash = document.getElementById("success-splash");
  const publishBtn = document.getElementById("submitBtn");

  changeKitchenType();
  renderCalendar(currentMonth, currentYear);

  prevMonthBtn.onclick = () => changeMonth(-1);
  nextMonthBtn.onclick = () => changeMonth(1);

  fetch('Data/reviews.json')
    .then(response => response.json())
    .then(reviewsData => {
      const randomName = getRandomElement(names);
      const firstLetter = randomName.charAt(0);
      profileIcon.textContent = firstLetter; 
      hostName.textContent = randomName; 
      const yearsHosting = Math.floor(Math.random() * 7) + 1;
      yearsHostingSpan.textContent = yearsHosting + (yearsHosting === 1 ? " Year Hosting" : " Years Hosting");
      
      let totalRating = getRandomRating(); 
      let totalReviews = getRandomReviews();


      for (let i = 0; i < 30; i++) {
        const randomReviewData = getRandomElement(reviewsData);
        const { profilePhoto, name, reviewText } = randomReviewData;
        const reviewRating = getRandomRating(); 

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

      reviews.firstChild.textContent = `★ ${totalRating}`; 
      reviewsLink.textContent = `${totalReviews} Reviews`; 
    })
    .catch(error => {
      console.error('Error fetching reviews:', error);
    });

    publishBtn.addEventListener('click', function (event) {
      console.log("CLICK");
        event.preventDefault();
        successSplash.style.visibility = "visible";
        confirmPublishContainer.style.visibility = "hidden";
        setTimeout(function() {
            window.location.reload(true);
        }, 2500);
    });

});

function getRandomRating() {
  return (Math.random() * 4 + 1).toFixed(1); 
}


let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDates = { start: null, end: null };

window.onload = function() {
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    prevMonthBtn.onclick = () => changeMonth(-1);
    nextMonthBtn.onclick = () => changeMonth(1);

    renderCalendar(currentMonth, currentYear);
};

function renderCalendar(month, year) {
    const container = document.getElementById('datepicker');
    container.innerHTML = ''; 

    const monthYearLabel = document.getElementById('monthYear');
    monthYearLabel.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

    const today = new Date();
    const todayDateString = today.toDateString();

    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
        const dayElem = document.createElement('div');
        dayElem.textContent = day;
        const fullDate = new Date(year, month, day);
        dayElem.onclick = () => selectDate(fullDate);
        container.appendChild(dayElem);
        
        if (fullDate.toDateString() === selectedDates.start?.toDateString()) {
            dayElem.classList.add('start');
        } else if (fullDate.toDateString() === selectedDates.end?.toDateString()) {
            dayElem.classList.add('end');
        } else if (isDateInRange(fullDate)) {
            dayElem.classList.add('range');
        }

        if (fullDate.toDateString() === todayDateString) {
            dayElem.classList.add('today');
        }
    }
}

function changeMonth(change) {
    currentMonth += change;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
}

function selectDate(date) {
  if (!selectedDates.start || (selectedDates.start && selectedDates.end)) {
      selectedDates.start = date;
      selectedDates.end = null;
  } else if (selectedDates.start && !selectedDates.end) {
      if (date >= selectedDates.start) {
          selectedDates.end = date;
      } else {
          selectedDates.end = selectedDates.start;
          selectedDates.start = date;
      }
  }
  renderCalendar(currentMonth, currentYear);
  calculateSubtotal(); 
}
function calculateSubtotal() {
  if (selectedDates.start && selectedDates.end) {
      const oneDay = 24 * 60 * 60 * 1000; 
      const diffDays = Math.round(Math.abs((selectedDates.end - selectedDates.start) / oneDay)) + 1; 
      const pricePerDay = 1900;
      const subtotal = pricePerDay * diffDays;
      document.getElementById('subtotal-price').textContent = `$${subtotal.toLocaleString()}`;
      updateTotal();
  } else {
      document.getElementById('subtotal-price').textContent = `$0`;
      updateTotal(); 
  }
}

function updateTotal() {
  const subtotal = parseFloat(document.getElementById('subtotal-price').textContent.replace(/[$,]/g, ''));
  const fees = subtotal * 0.03; 
  document.getElementById('fees-price').textContent = `$${fees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

  const discountCode = document.getElementById('discountCode').value;
  let discount = 0;
  if (discountCode) {
      discount = 1500;
  }
  document.getElementById('discount-price').textContent = `$${discount.toLocaleString()}`;

  const total = subtotal + fees - discount;
  document.getElementById('total-price').textContent = `$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

document.getElementById('discountCode').addEventListener('input', updateTotal); 

document.getElementById('submitBtn').addEventListener('click', function() {
updateTotal(); 
});

window.onload = function() {
  renderCalendar(currentMonth, currentYear);
  calculateSubtotal(); 
};


function isDateInRange(date) {
    if (selectedDates.start && selectedDates.end) {
        return date > selectedDates.start && date < selectedDates.end;
    }
    return false;
}

document.getElementById('bookButton').addEventListener('click', function() {
  document.querySelector('.confirmation-mask').style.visibility = 'visible'; 
  document.querySelector('.content').classList.add('hidden');
  document.querySelector('.footer').classList.add('hidden'); 
  document.querySelector('.nav-bar').classList.add('hidden'); 
  var confirmationMask = document.querySelector('.confirmation-mask');
  confirmationMask.classList.add('visible'); 
});

document.getElementById('cancelButton').addEventListener('click', function() { 
  document.querySelector('.confirmation-mask').style.visibility = 'hidden'; 
  document.querySelector('.content').classList.remove('hidden'); 
  document.querySelector('.footer').classList.remove('hidden'); 
  document.querySelector('.nav-bar').classList.remove('hidden'); 
});

document.getElementById('submitBtn').addEventListener('click', function() {
  const ccNumber = document.getElementById('ccNumber').value;
  const expiry = document.getElementById('expiry').value;
  const cvv = document.getElementById('cvv').value;
  const isFormValid = ccNumber && expiry && cvv; 

  const isDateRangeSelected = selectedDates.start && selectedDates.end;

  if (isFormValid && isDateRangeSelected) {
    setTimeout(function() {
      window.location.href = 'view-facility.html'; 
    }, 2500);
  } else {
    alert('Please fill out all required fields and select a date range.');
  }
});