document.addEventListener('DOMContentLoaded', function() {
    populateUpcomingListings('upcomingList');
    populatePastListings('pastList');
    const cancelBtn = document.querySelector('.cancelBtn');
    const calendarMask = document.querySelector('.calendar-mask');
    const editBtns = document.querySelectorAll('.upcoming-btn a'); 

    cancelBtn.addEventListener('click', function(event) {
        event.preventDefault();
        toggleCalendarVisibility();
    });

    editBtns.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            toggleCalendarVisibility();
        });
    });

    function toggleCalendarVisibility() {
        if (calendarMask.classList.contains('hidden')) {
            calendarMask.classList.remove('hidden');
            calendarMask.style.visibility = 'visible';
        } else {
            calendarMask.classList.add('hidden');
            calendarMask.addEventListener('transitionend', function() {
                if (calendarMask.classList.contains('hidden')) {
                    calendarMask.style.visibility = 'hidden';
                }
            }, { once: true });
        }
    }


    //Reviews

    //Open Review Container
    document.querySelectorAll('.review-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            toggleReviewVisibility();
        });
    });

    //Post Review
    document.querySelector('.reviews-mask .confirmBtn-r').addEventListener('click', function() {
        document.querySelector('.reviews-mask').style.visibility = 'hidden';
    });

    //Cancel Review
    document.querySelector('.reviews-mask .closeBtn-r').addEventListener('click', function() {
        document.querySelector('.reviews-mask').style.visibility = 'hidden';
    });
    
    const reviewMask = document.querySelector('.reviews-mask');
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
    updateNoBookingsMessage();
});

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

function removePropertyItem(element) {
    if (confirm("Are you sure you want to cancel this booking?")) {
        element.closest('.property-item').remove();
        updateNoBookingsMessage();
    }
    return false; 
}

function updateNoBookingsMessage() {
    const noBookingsMessageId = 'noBookingsMessage';
    let noBookingsMessage = document.getElementById(noBookingsMessageId);
    const propertyItems = document.querySelectorAll('.property-item');

    if (propertyItems.length === 0) {
        if (!noBookingsMessage) {
            noBookingsMessage = document.createElement('p');
            noBookingsMessage.id = noBookingsMessageId;
            noBookingsMessage.textContent = "No upcoming bookings";
            noBookingsMessage.style.textAlign = "center";
            noBookingsMessage.style.marginTop = "20px";
            noBookingsMessage.style.fontSize = "20px";
            noBookingsMessage.style.color = "#6a6a6a";
            propertyList.appendChild(noBookingsMessage);
        }
    } else if (noBookingsMessage) {
        noBookingsMessage.remove();
    }
}

function getRandomDates() {
    const start = new Date();
    start.setDate(start.getDate() + Math.floor(Math.random() * 30)); 
    const end = new Date(start);
    end.setDate(start.getDate() + Math.floor(Math.random() * 7) + 1); 

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return `${formatDate(start)} - ${formatDate(end)}`;
}


function getRandomRating() {
    return (Math.random() * (5 - 1) + 1).toFixed(1);
}
  
function getRandomPrice() {
    const price = Math.floor(Math.random() * 2000) + 500;
    return `$${price} daily`;
}


//Date picker

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
  updateDateInput();
}



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

function getRandomPastDates() {
    const start = new Date(); 
    start.setDate(start.getDate() - Math.floor(Math.random() * 30 + 1));
    const end = new Date(start); 


    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return `${formatDate(end)} - ${formatDate(start)}`;
}


//Upcoming 
function populateUpcomingListings(listId) {
    const propertyList = document.getElementById(listId);
    const minProperties = 1;
    const maxProperties = 4;
    const types = ["Bakery Kitchen", "Ice Cream Parlor", "Pizzeria Kitchen", "Restaurant Kitchen", "Catering Kitchen", "Fast Food Kitchen"];
    const numProperties = Math.floor(Math.random() * (maxProperties - minProperties + 1)) + minProperties;

    for (let i = 0; i < numProperties; i++) {
        const randomTypeIndex = Math.floor(Math.random() * types.length);
        const kitchenType = types[randomTypeIndex];
        const imagePath = `Images/Facilities/${kitchenType.replace(/ /g, '_')}/`;
        const imageNumber = Math.floor(Math.random() * 7) + 1;

        const propertyItem = document.createElement('div');
        propertyItem.className = 'property-item';
        propertyItem.innerHTML = `
        <div class="property-details">
            <a href="view-facility.html"><img class="item-img" src="${imagePath}${imageNumber}.jpeg" alt="Property in ${kitchenType}"></a>
            <div class="property-description">
                <p class="item-location"><span>${getLocation()}, Auckland</span></p>
                <p class="item-rating"><span>Tenant Rating:</span> ★ ${getRandomRating()}</p>
                <p class="item-price">${getRandomPrice()}</p>
                <div style="display: flex; align-items: center;">
                    <p class="item-dates">${getRandomDates()}</p>
                </div>
            </div>
            <div class="manage-property">
                <li><div class="upcoming-btn" id="editDates"><a><i class="fa-solid fa-pen-to-square"></i></a>
                    <span class="upcoming-tip">Edit Booking</span></div></li>
                <li><div class="message-btn"><a href="404.html"><i class="fa-solid fa-message"></i></a>
                    <span class="message-tip">Message Tenant</span></div></li>
                <li><div class="trash-btn"><a href="#" onclick="removePropertyItem(this); return false;"><i class="fa-solid fa-trash"></i></a>
                    <span class="trash-tip">Cancel Booking</span></div></li> 
            </div>
        </div>
        `;
        propertyList.appendChild(propertyItem);
    }
}


//Completed
function populatePastListings(listId) {
    const propertyList = document.getElementById(listId);
    const minProperties = 1;
    const maxProperties = 4;
    const types = ["Bakery Kitchen", "Ice Cream Parlor", "Pizzeria Kitchen", "Restaurant Kitchen", "Catering Kitchen", "Fast Food Kitchen"];
    const numProperties = Math.floor(Math.random() * (maxProperties - minProperties + 1)) + minProperties;

    for (let i = 0; i < numProperties; i++) {
        const randomTypeIndex = Math.floor(Math.random() * types.length);
        const kitchenType = types[randomTypeIndex];
        const imagePath = `Images/Facilities/${kitchenType.replace(/ /g, '_')}/`;
        const imageNumber = Math.floor(Math.random() * 7) + 1;

        const propertyItem = document.createElement('div');
        propertyItem.className = 'property-item';
        propertyItem.innerHTML = `
        <div class="property-details">
            <a href="view-facility.html"><img class="item-img" src="${imagePath}${imageNumber}.jpeg" alt="Property in ${kitchenType}"></a>
            <div class="property-description">
                <p class="item-location"><span>${getLocation()}, Auckland</span></p>
                <p class="item-rating"><span>Tenant Rating:</span> ★ ${getRandomRating()}</p>
                <p class="item-price">${getRandomPrice()}</p>
                <div style="display: flex; align-items: center;">
                    <p class="item-dates">${getRandomPastDates()}</p>
                </div>
            </div>
            <div class="manage-property">
            <li><div class="review-btn"><a><i class="fa-solid fa-star"></i></a>
                <span class="review-tip">Leave Review</span></div></li>
                <li><div class="message-btn"><a href="404.html"><i class="fa-solid fa-message"></i></a>
                    <span class="message-tip">Message Tenant</span></div></li>
                <li><div class="trash-btn"><a href="#" onclick="removePropertyItem(this); return false;"><i class="fa-solid fa-trash"></i></a>
                    <span class="trash-tip">Remove Booking</span></div></li> 
            </div>
        </div>
        `;
        propertyList.appendChild(propertyItem);
    }
}

