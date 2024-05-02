document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sortPrice');
    const itemsContainer = document.getElementById('item-container');

    sortSelect.addEventListener('change', function() {
        let items = Array.from(itemsContainer.getElementsByClassName('item'));

        items.forEach((item, index) => item.dataset.order = item.dataset.order || index);

        if (this.value === 'relevance') {
            items.sort((a, b) => parseInt(a.dataset.order) - parseInt(b.dataset.order));
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
