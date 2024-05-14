document.addEventListener("DOMContentLoaded", function () {
    const facilityTypeSelect = document.getElementById("facility-type");
    const mainImages = document.querySelectorAll(".main-image img");
    const allThumbnails = document.querySelectorAll(".thumbnail-container");
    const uploadThumbnail = document.getElementById("upload-pic");
    const proceedBtn = document.querySelector('.host'); // Ensure this selector matches the HTML
    const calendarMask = document.querySelector('.calendar-mask');
    const confirmPublishContainer = document.querySelector('.confirm-publish-container');
    const publishBtn = document.querySelector(".publishBtn");
    const cancelPublishBtn = document.querySelector(".cancelPublishBtn");
    const confirmBtn = document.querySelector('.confirmBtn');
    const cancelBtn = document.querySelector('.cancelBtn');
    const successSplash = document.getElementById("success-splash");
    const contentSection = document.querySelector('.content');
    const footerSection = document.querySelector('.footer');
    const confirmListingDays = document.querySelector('.availability .day-selector-container');
    let selectedDays = [];

    const priceInput = document.querySelector('.price-input-container input[name="price"]');
    const finalPriceDisplay = document.querySelector('.final-price');

    priceInput.addEventListener('input', function () {
        const price = priceInput.value;
        finalPriceDisplay.textContent = `$${price} daily`;
    });


    facilityTypeSelect.addEventListener("change", function () {
        const selectedType = facilityTypeSelect.value;
        const indexes = [2, 3, 4, 5, 6, 7];
        indexes.sort(() => Math.random() - 0.5);
    
        mainImages.forEach(image => {
            image.src = selectedType ? `Images/Facilities/${selectedType.replace(/\s+/g, '_')}/1.jpeg` : "Images/grey.jpg";
        });
    
        allThumbnails.forEach((container, idx) => {
            const thumbnails = container.querySelectorAll(".thumbnail");
            thumbnails.forEach((thumbnail, i) => {
                thumbnail.src = selectedType ? `Images/Facilities/${selectedType.replace(/\s+/g, '_')}/${indexes[i]}.jpeg` : "Images/grey.jpg";
            });
        });
    
        // Directly set #upload-pic based on whether a facility type is selected
        const uploadThumbnail = document.getElementById('upload-pic');
        uploadThumbnail.src = selectedType ? `Images/Facilities/${selectedType.replace(/\s+/g, '_')}/${indexes[i]}.jpg` : "Images/upload.jpg";
    
    });
    



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
        updateConfirmListingDays();
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

    function updateConfirmListingDays() {
        confirmListingDays.innerHTML = '';
        const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        allDays.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.innerText = day.slice(0, 3);
            if (selectedDays.includes(day)) {
                dayElement.classList.add('selected');
            }
            confirmListingDays.appendChild(dayElement);
        });
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
