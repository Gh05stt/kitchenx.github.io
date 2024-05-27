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

document.addEventListener('DOMContentLoaded', function() {
    const kitchenType = document.getElementById("kitchenType").firstChild.textContent;
    
    updateAmenities(kitchenType);
});


function updateAmenities(kitchenType) {
    const amenitiesList = document.getElementById('amenitiesList');
    amenitiesList.innerHTML = '';

    const amenities = amenitiesData[kitchenType];
    amenities.forEach(amenity => {
        const listItem = document.createElement('li');
        const img = document.createElement('img');
        img.src = 'Images/KitchenX Logo_Icon.png';
        img.alt = `${amenity} Icon`;
        img.classList.add('icon');
        listItem.appendChild(img);
        listItem.appendChild(document.createTextNode(amenity));
        amenitiesList.appendChild(listItem);
    });
}