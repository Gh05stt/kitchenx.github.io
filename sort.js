document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sortPrice');
    const itemsContainer = document.getElementById('item-container');

    sortSelect.addEventListener('change', function() {
        let items = Array.from(itemsContainer.getElementsByClassName('item'));

        items.forEach((item, index) => item.dataset.order = item.dataset.order || index);

        if (this.value === 'relevance') {
            items.sort((a, b) => parseInt(a.dataset.order) - parseInt(b.dataset.order));
        } else if (this.value === 'highest-review') {
            items.sort((a, b) => {
                let ratingA = parseFloat(a.querySelector('.item-rating').textContent);
                let ratingB = parseFloat(b.querySelector('.item-rating').textContent);
                return ratingB - ratingA;
            });
        } else if (this.value === 'lowest-review') {
            items.sort((a, b) => {
                let ratingA = parseFloat(a.querySelector('.item-rating').textContent);
                let ratingB = parseFloat(b.querySelector('.item-rating').textContent);
                return ratingA - ratingB;
            });
        } else {
            items.sort((a, b) => {
                let priceA = parseInt(a.querySelector('.item-price').textContent.replace(/\D/g, ''));
                let priceB = parseInt(b.querySelector('.item-price').textContent.replace(/\D/g, ''));
                return this.value === 'low-to-high' ? priceA - priceB : priceB - priceA;
            });
        }

        itemsContainer.innerHTML = '';
        items.forEach(item => itemsContainer.appendChild(item));
    });
});
