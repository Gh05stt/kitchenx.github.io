document.addEventListener('DOMContentLoaded', () => {
    const itemContainer = document.getElementById('item-container');
    const typeSelect = document.querySelector('select[name="type"]');
    const searchInput = document.querySelector('input[name="search"]');
    let allItems = [];
  
  
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
        const randomImageNumber = Math.floor(Math.random() * 4) + 1;
        item.className = 'item';
        item.innerHTML = `
            <div class="image-placeholder" id="transition" style="background-image: url('Images/Facilities/${type}/${randomImageNumber}.jpeg');"></div>
            <div class="item-name"><a href="view-facility.html">${name}</a></div>
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
      displayItems(typeSelect.value.replace(/ /g, "_"), searchInput.value);
  });
  
  searchInput.addEventListener('input', () => {
      displayItems(typeSelect.value.replace(/ /g, "_"), searchInput.value);
  });
  });
  
  
  function getRandomRating() {
    return (Math.random() * (5 - 2) + 2).toFixed(1);
  }
  
  function getRandomPrice() {
    const price = Math.floor(Math.random() * 2000) + 500;
    return `$${price} daily`;
  }