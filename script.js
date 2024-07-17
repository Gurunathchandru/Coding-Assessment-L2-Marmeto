document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const tabButtons = document.querySelectorAll('.tab-btn');
    let products = [];

    // Fetch product data from API
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            products = data.categories;
            showCategory('Kids'); // Show Kids' products by default
        })
        .catch(error => console.error('Error fetching data:', error));

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            showCategory(category);
            setActiveTab(button);
        });
    });

    function showCategory(category) {
        const categoryProducts = products.find(cat => cat.category_name === category)?.category_products || [];
        productContainer.innerHTML = '';

        categoryProducts.forEach(product => {
            const card = createProductCard(product);
            productContainer.appendChild(card);
        });
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        const discount = calculateDiscount(product.price, product.compare_at_price);

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-vendor">${product.vendor}</p>
                <p class="product-price">
                    <span class="product-compare-price">Rs ${product.compare_at_price}.00</span>
                    Rs ${product.price}.00
                    <span class="product-discount">${discount}% Off</span>
                </p>
                <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        `;

        return card;
    }

    function calculateDiscount(price, comparePrice) {
        const discount = ((comparePrice - price) / comparePrice) * 100;
        return Math.round(discount);
    }

    function setActiveTab(activeButton) {
        tabButtons.forEach(button => button.classList.remove('active'));
        activeButton.classList.add('active');
    }
});