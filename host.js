document.addEventListener("DOMContentLoaded", function () {
    const facilityTypeSelect = document.getElementById("facility-type");
    const mainImages = document.querySelectorAll(".main-image img");
    const allThumbnails = document.querySelectorAll(".thumbnail-container");
    const uploadThumbnail = document.getElementById("upload-pic");
    const proceedBtn = document.querySelector('.host'); 
    const calendarMask = document.querySelector('.calendar-mask');
    const confirmPublishContainer = document.querySelector('.confirm-publish-container');
    const publishBtn = document.querySelector(".publishBtn");
    const cancelPublishBtn = document.querySelector(".cancelPublishBtn");
    const confirmBtn = document.querySelector('.confirmBtn');
    const cancelBtn = document.querySelector('.cancelBtn');
    const successSplash = document.getElementById("success-splash");
    const contentSection = document.querySelector('.content');
    const footerSection = document.querySelector('.footer');
    let selectedDays = [];

    const dropdownButton = document.querySelector('.dropbtn');
    const checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const selectedAmenities = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(', ');
            dropdownButton.textContent = selectedAmenities.length > 0 ? selectedAmenities : 'Select Amenities';
        });
    });

    const priceInput = document.querySelector('.price-input-container input[name="price"]');
    const finalPriceDisplay = document.querySelector('.final-price');

    priceInput.addEventListener('input', function () {
        const price = priceInput.value;
        finalPriceDisplay.textContent = `$${price} daily`;
    });

    uploadThumbnail.addEventListener('click', uploadPhotos);

    function uploadPhotos() {
        const selectedType = facilityTypeSelect.value;
        if (!selectedType) {
            alert("Please select a facility type first.");
            return;
        }
    
        const basePath = `Images/Facilities/${selectedType.replace(/\s+/g, '_')}/`;
    
        mainImages.forEach(image => {
            image.src = selectedType ? `${basePath}1.jpeg` : "Images/grey.jpg";
        });
    
        const indexes = [2, 3, 4, 5, 6, 7];
        indexes.sort(() => Math.random() - 0.5);
    
        allThumbnails.forEach((container, idx) => {
            const thumbnails = container.querySelectorAll(".thumbnail");
    
            thumbnails.forEach((thumbnail, i) => {
                if (i < 2) { 
                    thumbnail.src = selectedType ? `${basePath}${indexes[i]}.jpeg` : "Images/grey.jpg";
                }
            });
        });
    }
        
    document.querySelectorAll('.day').forEach(day => {
        day.addEventListener('click', function () {
            day.classList.toggle('selected');
            const dayName = day.getAttribute('data-day');
            if (day.classList.contains('selected')) {
                selectedDays.push(dayName);
            } else {
                selectedDays = selectedDays.filter(d => d !== dayName);
            }
        });
    });

    proceedBtn.addEventListener('click', function (event) {
        event.preventDefault();
        toggleCalendarVisibility();
    });

    publishBtn.addEventListener('click', function (event) {
        event.preventDefault();
        successSplash.style.visibility = "visible";
        confirmPublishContainer.style.visibility = "hidden";
        setTimeout(function() {
            window.location.reload(true);
        }, 2500);
    });
    

    cancelPublishBtn.addEventListener('click', function (event) {
        event.preventDefault();
        toggleConfirmVisibility();
        toggleCalendarVisibility();
    });

    confirmBtn.addEventListener('click', function (event) {
        event.preventDefault();
        toggleCalendarVisibility();
        toggleConfirmVisibility();
    });

    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        selectedDays = [];
        resetDaySelection();
        toggleCalendarVisibility();
    });

    function toggleCalendarVisibility() {
        calendarMask.classList.toggle('hidden');
        calendarMask.style.visibility = calendarMask.classList.contains('hidden') ? 'hidden' : 'visible';
        toggleContentAndFooter(calendarMask.style.visibility !== 'visible');
    }

    function toggleConfirmVisibility() {
        confirmPublishContainer.classList.toggle('hidden');
        confirmPublishContainer.style.visibility = confirmPublishContainer.classList.contains('hidden') ? 'hidden' : 'visible';
        toggleContentAndFooter(confirmPublishContainer.style.visibility !== 'visible');
    }

    function resetDaySelection() {
        document.querySelectorAll('.day').forEach(day => {
            day.classList.remove('selected');
        });
    }

    function toggleContentAndFooter(show) {
        contentSection.style.display = show ? '' : 'none';
        footerSection.style.display = show ? '' : 'none';
    }
});


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
  updateDateInput();
}

function updateDateInput() {
    const datesInput = document.getElementById('dates-input');
    if (selectedDates.start) {
        datesInput.textContent = selectedDates.start.toLocaleDateString();
        if (selectedDates.end) {
            datesInput.textContent += ' - ' + selectedDates.end.toLocaleDateString();
        }
    }
}


function isDateInRange(date) {
    if (selectedDates.start && selectedDates.end) {
        return date > selectedDates.start && date < selectedDates.end;
    }
    return false;
}
