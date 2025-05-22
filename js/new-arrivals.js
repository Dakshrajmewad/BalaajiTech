// New Arrivals Page Functionality

// DOM Elements
const newProductsGrid = document.getElementById('new-products-grid');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');
const sortSelect = document.getElementById('sort-select');
const categorySelect = document.getElementById('category-select');
const featuredBuyButton = document.querySelector('.featured-buy-button');
const notifyButtons = document.querySelectorAll('.notify-btn');
const newsletterForm = document.getElementById('newsletter-form');

// Variables
let currentView = 'grid'; // 'grid' or 'list'
let currentSort = 'newest'; // Default sort option
let selectedCategory = 'all'; // Default category
let displayCount = 6; // Initial number of products to display
let newProducts = []; // Will hold new products

// Initialize new arrivals page functionality
document.addEventListener('DOMContentLoaded', async () => {
  // Wait for products to be processed for images
  await processProductImages();
  
  // Filter for new products
  newProducts = products.filter(product => product.badge === 'New');
  
  // If there are no products marked as 'New', get the most recent ones based on ID
  if (newProducts.length === 0) {
    const sortedProducts = [...products].sort((a, b) => b.id - a.id);
    newProducts = sortedProducts.slice(0, 6); // Get the 6 most recent products
  }
  
  // Apply filters and render products
  filterAndRenderProducts();
  
  // Add event listeners
  setupEventListeners();
});

// Set up all event listeners
function setupEventListeners() {
  // View toggle buttons
  if (gridViewBtn && listViewBtn && newProductsGrid) {
    gridViewBtn.addEventListener('click', () => {
      setView('grid');
    });
    
    listViewBtn.addEventListener('click', () => {
      setView('list');
    });
  }
  
  // Sort select
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      filterAndRenderProducts();
    });
  }
  
  // Category select
  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      selectedCategory = categorySelect.value;
      filterAndRenderProducts();
    });
  }
  
  // Featured Buy Now button
  if (featuredBuyButton) {
    featuredBuyButton.addEventListener('click', () => {
      const productName = "Mini Drone for Kids";
      const price = 1999;
      redirectToWhatsApp(productName, price);
    });
  }
  
  // Notify Me buttons
  if (notifyButtons.length > 0) {
    notifyButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productName = e.target.closest('.coming-soon-item').querySelector('h3').textContent;
        button.textContent = 'Notification Set!';
        button.disabled = true;
        
        // Show a notification message (you could implement a proper notification system here)
        alert(`You will be notified when ${productName} becomes available!`);
      });
    });
  }
  
  // Newsletter form
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      
      if (email) {
        // Show a success message (you could implement a proper submission here)
        alert(`Thank you for subscribing with ${email}! You'll be the first to know about our new arrivals.`);
        newsletterForm.reset();
      }
    });
  }
}

// Set the current view (grid or list)
function setView(view) {
  if (view === currentView) return;
  
  currentView = view;
  
  // Update button states
  if (gridViewBtn && listViewBtn) {
    if (view === 'grid') {
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
    } else {
      gridViewBtn.classList.remove('active');
      listViewBtn.classList.add('active');
    }
  }
  
  // Update grid class
  if (newProductsGrid) {
    if (view === 'grid') {
      newProductsGrid.classList.remove('list-view');
    } else {
      newProductsGrid.classList.add('list-view');
    }
  }
  
  // Re-render products
  renderProducts();
}

// Filter and render products
function filterAndRenderProducts() {
  // Filter by category
  let filtered = newProducts;
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(product => product.category === selectedCategory);
  }
  
  // Sort products
  sortProducts(filtered);
  
  // Display products
  renderProducts(filtered);
}

// Sort products based on current sort option
function sortProducts(products) {
  switch (currentSort) {
    case 'price-low':
      products.sort((a, b) => a.currentPrice - b.currentPrice);
      break;
    case 'price-high':
      products.sort((a, b) => b.currentPrice - a.currentPrice);
      break;
    case 'popularity':
      products.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'newest':
    default:
      // Assuming higher IDs are newer products
      products.sort((a, b) => b.id - a.id);
      break;
  }
}

// Render products in the container
function renderProducts(filteredProducts = newProducts) {
  if (!newProductsGrid) return;
  
  // If no products match filters
  if (filteredProducts.length === 0) {
    newProductsGrid.innerHTML = `
      <div class="no-products">
        <i class="fas fa-search-minus"></i>
        <p>No new products match your selected filters.</p>
        <button class="btn btn-outline reset-filters-btn">Reset Filters</button>
      </div>
    `;
    
    // Add event listener to reset filters button
    const resetFiltersBtn = newProductsGrid.querySelector('.reset-filters-btn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        // Reset filters to default
        selectedCategory = 'all';
        currentSort = 'newest';
        
        if (categorySelect) categorySelect.value = 'all';
        if (sortSelect) sortSelect.value = 'newest';
        
        // Apply reset filters
        filterAndRenderProducts();
      });
    }
    
    return;
  }
  
  // Limit to display count
  const productsToShow = filteredProducts.slice(0, displayCount);
  
  // Create HTML for products based on current view
  const productsHTML = productsToShow.map(product => 
    currentView === 'grid' ? createProductCard(product) : createProductListItem(product)
  ).join('');
  
  // Set the HTML content
  newProductsGrid.innerHTML = productsHTML;
  
  // Add click event listeners to each product
  document.querySelectorAll('.product-card, .product-list-item').forEach((item, index) => {
    item.addEventListener('click', () => {
      openProductModal(productsToShow[index]);
    });
  });
  
  // Add click event listeners to Buy Now buttons
  document.querySelectorAll('.buy-button').forEach((button, index) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent opening the modal
      
      const product = productsToShow[index];
      redirectToWhatsApp(product.name, product.currentPrice);
    });
  });
}

// Create HTML for a product card (grid view)
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
        <span class="product-badge badge-new">New</span>
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

// Create HTML for a product list item (list view)
function createProductListItem(product) {
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
  
  // Extract first 150 characters of description for list view
  const shortDescription = product.description.length > 150 
    ? product.description.substring(0, 150) + '...' 
    : product.description;
  
  return `
    <div class="product-list-item">
      <div class="product-list-image">
        <img src="${product.imageUrl}" alt="${product.name}">
        <span class="product-badge badge-new">New</span>
      </div>
      <div class="product-list-details">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          ${starsHTML}
          <span class="review-count">(${product.reviewCount})</span>
        </div>
        <p class="product-description">${shortDescription}</p>
        <div class="product-list-bottom">
          <div class="product-price">
            <span class="current-price">₹${product.currentPrice.toLocaleString()}</span>
            ${product.originalPrice ? `
              <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
              <span class="discount-tag">${discountPercentage}% OFF</span>
            ` : ''}
          </div>
          <button class="btn btn-primary buy-button">
            <i class="fab fa-whatsapp"></i> Buy Now
          </button>
        </div>
      </div>
    </div>
  `;
}