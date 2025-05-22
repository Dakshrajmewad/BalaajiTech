// Home Page Functionality

// DOM Elements
const productsContainer = document.getElementById('products-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const categoryItems = document.querySelectorAll('.category-item');

// Variables
let displayCount = 4; // Initial number of products to display
const incrementCount = 4; // How many more products to load when clicking "Load More"
let selectedCategory = 'All'; // Default category
let filteredProducts = []; // Will hold filtered products
let isProductsLoaded = false; // Flag to track if products are loaded

// Initialize home page functionality
document.addEventListener('DOMContentLoaded', async () => {
  // Wait for products to be processed for images
  await processProductImages();
  
  // Apply filters and render products
  filterAndRenderProducts();
  
  // Add event listener for Load More button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreProducts);
  }
  
  // Add event listeners for category items
  if (categoryItems) {
    categoryItems.forEach(item => {
      item.addEventListener('click', () => {
        selectedCategory = item.dataset.category;
        displayCount = 4; // Reset display count
        filterAndRenderProducts();
        
        // Scroll to products section
        document.getElementById('products').scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }
});

// Filter and render products
function filterAndRenderProducts() {
  // Filter products by selected category
  filteredProducts = selectedCategory === 'All' 
    ? [...products]
    : products.filter(product => product.category === selectedCategory);
  
  // Display products up to current display count
  renderProducts();
  
  // Update Load More button visibility
  updateLoadMoreButton();
}

// Render products in the container
function renderProducts() {
  if (!productsContainer) return;
  
  // Clear the loading message if present
  if (!isProductsLoaded) {
    productsContainer.innerHTML = '';
    isProductsLoaded = true;
  }
  
  // Get the subset of products to display
  const productsToShow = filteredProducts.slice(0, displayCount);
  
  // Create HTML for products
  const productsHTML = productsToShow.map(product => createProductCard(product)).join('');
  
  // Set the HTML content
  productsContainer.innerHTML = productsHTML;
  
  // Add click event listeners to each product card
  document.querySelectorAll('.product-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      openProductModal(productsToShow[index]);
    });
  });
}

// Create HTML for a product card
function createProductCard(product) {
  // Calculate discount percentage if applicable
  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.currentPrice / product.originalPrice) * 100) 
    : 0;
  
  // Generate stars HTML based on rating
  let starsHTML = '';
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;
  
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }
  
  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  const emptyStars = 5 - (fullStars + (hasHalfStar ? 1 : 0));
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }
  
  return `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.imageUrl}" alt="${product.name}">
        ${product.badge ? `<span class="product-badge badge-${product.badge.toLowerCase()}">${product.badge}</span>` : ''}
      </div>
      <div class="product-details">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          ${starsHTML}
          <span class="review-count">(${product.reviewCount})</span>
        </div>
        <div class="product-price">
          <span class="current-price">₹${product.currentPrice.toLocaleString()}</span>
          ${product.originalPrice ? `
            <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
          ` : ''}
        </div>
        <button class="btn btn-primary buy-button">
          <i class="fab fa-whatsapp"></i> Buy Now
        </button>
      </div>
    </div>
  `;
}

// Load more products
function loadMoreProducts() {
  displayCount += incrementCount;
  renderProducts();
  updateLoadMoreButton();
}

// Update Load More button visibility
function updateLoadMoreButton() {
  if (!loadMoreBtn) return;
  
  if (displayCount >= filteredProducts.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

// Event delegation for Buy Now buttons
document.addEventListener('click', (e) => {
  if (e.target && e.target.closest('.buy-button')) {
    e.preventDefault();
    e.stopPropagation(); // Prevent opening the modal
    
    const productCard = e.target.closest('.product-card');
    const index = Array.from(productCard.parentNode.children).indexOf(productCard);
    const product = filteredProducts[index];
    
    if (product) {
      redirectToWhatsApp(product.name, product.currentPrice);
    }
  }
});