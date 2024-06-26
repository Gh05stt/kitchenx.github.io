document.addEventListener('DOMContentLoaded', () => {
    const datesInput = document.getElementById('dates-input');
    const calendarContainer = document.querySelector('.calendar-container');

    datesInput.addEventListener('click', (event) => {
        event.stopPropagation(); 
        calendarContainer.style.display = 'block';
    });

    document.addEventListener('click', (event) => {
        if (!calendarContainer.contains(event.target) && !datesInput.contains(event.target)) {
            calendarContainer.style.display = 'none';
        }
    });

    calendarContainer.addEventListener('click', (event) => {
        event.stopPropagation(); 
    });

    const itemContainer = document.getElementById('item-container');
    const typeSelect = document.getElementById('facility-type');
    const searchForm = document.querySelector('.search-container');
    const searchInput = document.getElementById('search-bar');
    let allItems = [];
  
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');
    const navTitleText = document.getElementById('nav-title-text');

    searchButton.addEventListener('click', () => {
        searchBar.classList.toggle('hidden');
        searchButton.classList.toggle('active');
        navTitleText.classList.toggle('hidden');
        if (!searchBar.classList.contains('hidden')) {
            searchBar.focus();
        }
    });
  
    function loadAllItems() {
        const types = ["Bakery Kitchen", "Ice Cream Parlor", "Pizzeria Kitchen", "Restaurant Kitchen", "Catering Kitchen", "Fast Food Kitchen"];
        const locations = [
          'Albany', 'Balmoral', 'Birkenhead', 'Blockhouse Bay', 'Botany Downs',
          'Browns Bay', 'Epsom', 'Glenfield', 'Greenlane', 'Grey Lynn',
          'Henderson', 'Hibiscus Coast', 'Howick', 'Manukau', 'Manurewa',
          'Mt Albert', 'Mt Eden', 'Mt Roskill', 'Mt Wellington', 'Newmarket',
          'Onehunga', 'Papakura', 'Parnell', 'Ponsonby', 'Remuera',
          'St Heliers', 'Takapuna', 'Titirangi', 'Waitakere', 'West Harbour',
          'Whangaparaoa'
      ];
        types.forEach(type => {
            for (let i = 0; i < 12; i++) {
                const randomLocation = locations[Math.floor(Math.random() * locations.length)];
                const name = `${randomLocation}, Auckland`;
                const rating = getRandomRating();
                const price = getRandomPrice();
                const item = createItem(name, type.replace(/ /g, "_"), rating, price);
                allItems.push(item);
            }
        });
    }
  
    function createItem(name, type, rating, price) {
        const item = document.createElement('div');
        const randomImageNumber = Math.floor(Math.random() * 7) + 1;
        item.className = 'item';
        item.innerHTML = `
            <a href="view-m.html"><div class="image-placeholder" id="transition" style="background-image: url('../Images/Facilities/${type}/${randomImageNumber}.jpeg');"></div></a>
            <div class="item-name"><a href="view-m.html">${name}</a></div>
            <div class="item-rating">${rating} ★</div>
            <div class="item-price">${price}</div>
        `;
        return { name, type, element: item };
    }
  
    function displayItems(selectedType = '', searchTerm = '') {
      itemContainer.innerHTML = '';
      allItems.forEach(item => {
          const matchesType = selectedType === '' || item.type === selectedType;
          const matchesSearch = searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase());
          if (matchesType && matchesSearch) {
              itemContainer.appendChild(item.element);
          }
      });
  }
  
  loadAllItems();
  displayItems(); 
  
  typeSelect.addEventListener('change', () => {
    const selectedType = typeSelect.value.replace(/ /g, "_");
      displayItems(selectedType, searchInput.value);
  });
  
  
  searchInput.addEventListener('input', () => {
        const selectedType = typeSelect.value.replace(/ /g, "_");
        const searchTerm = searchInput.value;
        displayItems(selectedType, searchTerm);
    });

  function getRandomRating() {
    return (Math.random() * (5 - 1) + 1).toFixed(1);
  }
  
  function getRandomPrice() {
    const price = Math.floor(Math.random() * 900) + 100;
    return `$${price} daily`;
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
  const dateRangeSpan = document.getElementById('date-range');
  if (selectedDates.start) {
      dateRangeSpan.textContent = selectedDates.start.toLocaleDateString();
      if (selectedDates.end) {
          dateRangeSpan.textContent += ' - ' + selectedDates.end.toLocaleDateString();
      }
  }
}

function isDateInRange(date) {
    if (selectedDates.start && selectedDates.end) {
        return date > selectedDates.start && date < selectedDates.end;
    }
    return false;
}
