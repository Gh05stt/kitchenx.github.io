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
}

function isDateInRange(date) {
    if (selectedDates.start && selectedDates.end) {
        return date > selectedDates.start && date < selectedDates.end;
    }
    return false;
}
