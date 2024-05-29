const names = [
    "Baljot Toor", "Harry Chhay", "Aaron Mendonca",
    "Krishant Maharaj", "Caleb Simmons", "Chuanze Zhao"
  ];
  
document.addEventListener('DOMContentLoaded', function() {
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const profileIcon = document.querySelector('.profile-icon');
    const hostName = document.querySelector('.host-name');
    const yearsHostingSpan = document.querySelector('.years-hosting');
    const kitchenType = document.getElementById("kitchenType").firstChild.textContent;
    const reviewsContainer = document.querySelector('.reviews-container');
    const publishBtn = document.getElementById("submitBtn");


    fetch('../Data/reviews.json')
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

      for (let i = 0; i < 4; i++) {
        const randomReviewData = getRandomElement(reviewsData);
        const { profilePhoto, name, reviewText } = randomReviewData;
        const reviewRating = getRandomRate(0, 6); 

        const review = document.createElement('div');
        review.classList.add('review');

        const authorImage = document.createElement('img');
        authorImage.src = `../${profilePhoto}`;
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

      document.querySelector('.reviews .reviews-link').textContent = `${totalReviews} Reviews`;
      document.querySelector('.reviews').firstChild.textContent = `★ ${totalRating}`; 
    })
    .catch(error => {
      //console.error('Error fetching reviews:', error);
    });
    
    updateAmenities(kitchenType);
});

function updateAmenities(kitchenType) {
    const amenitiesList = document.getElementById('amenitiesList');
    amenitiesList.innerHTML = '';

    const amenities = amenitiesData[kitchenType];
    amenities.forEach(amenity => {
        const listItem = document.createElement('li');
        const img = document.createElement('img');
        img.src = '../Images/KitchenX Logo_Icon.png';
        img.alt = `${amenity} Icon`;
        img.classList.add('icon');
        listItem.appendChild(img);
        listItem.appendChild(document.createTextNode(amenity));
        amenitiesList.appendChild(listItem);
    });
}

const amenitiesData = {
    "Bakery Kitchen": [
        "Dough Sheeters and Dividers",
        "Fermentation Chambers",
        "High-Volume Mixers",
        "Custom Display Cases",
        "Ingredient Bins",
        "Baker’s Tables"
    ],
    "General Kitchen": [
        "Multiple Burner Ranges",
        "Combi Ovens",
        "Sous-vide Equipment",
        "High-Capacity Dishwashers",
        "Food Processors and Blenders",
        "Pot Wash Stations",
        "Cold and Hot Holding Stations"
    ],
    "Ice Cream Parlor": [
        "Batch Freezers",
        "Soft Serve Machines",
        "Dip Wells",
        "Blast Freezers",
        "Gelato Cases",
        "Milkshake Machines",
        "Waffle Cone Makers"
    ],
    "Pizzeria Kitchen": [
        "Wood-fired Pizza Oven",
        "Dough Presses and Rollers",
        "High-Temperature Cheese Melters",
        "Refrigerated Prep Rails",
        "Pizza Peel Racks",
        "Stone Counters",
        "Dough Proofing Cabinets"
    ],
    "Restaurant Kitchen": [
        "Interactive Order Systems",
        "Theme-Specific Decor and Furniture",
        "Advanced Reservation Systems",
        "Chef’s Counter",
        "Wine and Beer Tap Systems",
        "Open Kitchen Design",
        "Specialty Cooking Stations"
    ],
    "Catering Kitchen": [
        "Portable Bars",
        "Mobile Hot Boxes",
        "Large Scale Buffet Equipment",
        "Event Tents and Furniture",
        "Portable Cooking Stations",
        "Customizable Menu Boards",
        "Thermal Food Carriers"
    ],
    "Fast Food Kitchen": [
        "High-Speed Grills",
        "Automated Fry Stations",
        "Touchscreen POS Systems",
        "Energy-Efficient Beverage Coolers",
        "Condiment Dispensing Systems",
        "Rapid Cook Ovens",
        "Drive-Thru LED Menus"
    ]
};


//Calendar
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
          dayElem.addEventListener('click', () => selectDate(new Date(year, month, day)));
          
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
    updateDateInput();
}


function calculateSubtotal() {
    if (selectedDates.start && selectedDates.end) {
      const oneDay = 24 * 60 * 60 * 1000; 
      const diffDays = Math.round(Math.abs((selectedDates.end - selectedDates.start) / oneDay)) + 1; 
      const pricePerDay = 500;
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
      discount = 200;
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
  

function updateDateInput() {
    const datesInput = document.getElementById('dates-input');
    if (selectedDates.start) {
        datesInput.value = selectedDates.start.toLocaleDateString();
        if (selectedDates.end) {
            datesInput.value += ' - ' + selectedDates.end.toLocaleDateString();
        }
    }
}

function isDateInRange(date) {
      if (selectedDates.start && selectedDates.end) {
          return date > selectedDates.start && date < selectedDates.end;
      }
      return false;
}
  


function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function getRandomRating() {
    return (Math.random() * 4 + 1).toFixed(1);
  }
  
  function getRandomReviews() {
    return (Math.floor(Math.random() * 301));
  }

function getRandomRate(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
  }


//Payment and confirmation

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