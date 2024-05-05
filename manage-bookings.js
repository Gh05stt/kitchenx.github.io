document.addEventListener('DOMContentLoaded', function() {
    const propertyList = document.getElementById('propertyList');
    const minProperties = 3;
    const maxProperties = 12;
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
                <img src="${imagePath}${imageNumber}.jpeg" alt="Property in ${kitchenType}">
                <div class="property-description">
                    <p class="item-location">${getLocation()}, Auckland</p>
                    <p class="item-rating">★ ${getRandomRating()}</p>
                    <p class="item-price">${getRandomPrice()}</p>
                    <p class="item-dates">${getRandomDates()}</p>
                </div>
                <div class="manage-property">
                <li><div class="edit-btn"><a href="#"><i class="fa-solid fa-pen-to-square"></i></a>
                    <span class="edit-tip">Edit Booking</span></div></li>
                <li><div class="message-btn"><a href="404.html"><i class="fa-solid fa-message"></i></a>
                    <span class="message-tip">Message Host</span></div></li>
                <li><div class="trash-btn"><a href="#" onclick="removePropertyItem(this); return false;"><i class="fa-solid fa-trash"></i></a>
                    <span class="trash-tip">Cancel Booking</span></div></li> 
                </div>
            </div>
        `;
        propertyList.appendChild(propertyItem);
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