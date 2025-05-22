// Products Page JavaScript
document.addEventListener('DOMContentLoaded', async () => {
  // Wait for products to be processed for images
  await processProductImages();
  
  // Initialize products functionality
  filterAndRenderProducts();
  
  // Add event listeners
  setupEventListeners();
});

// Variables
let selectedCategory = 'All';
let currentView = 'grid';
let currentSort = 'popularity';
let activeTab = 'all';
let minPrice = 0;
let maxPrice = 5000;
let displayCount = 12;
let filteredProducts = [];
let isProductsLoaded = false;

// Set up all event listeners
function setupEventListeners() {
  // Category filter buttons
  const filterButtons = document.querySelectorAll('.filter-option');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      // Update selected category
      selectedCategory = button.dataset.category;
      // Reset display count
      displayCount = 12;
      // Apply filters and render
      filterAndRenderProducts();
    });
  });
  
  // Filter toggle (mobile only)
  const filterToggleBtn = document.getElementById('filter-toggle-btn');
  const productsSidebar = document.getElementById('products-sidebar');
  if (filterToggleBtn && productsSidebar) {
    filterToggleBtn.addEventListener('click', () => {
      productsSidebar.classList.toggle('active');
    });
  }
  
  // View toggle buttons
  const gridViewBtn = document.getElementById('grid-view-btn');
  const listViewBtn = document.getElementById('list-view-btn');
  const productsGrid = document.getElementById('products-grid');
  if (gridViewBtn && listViewBtn && productsGrid) {
    gridViewBtn.addEventListener('click', () => {
      setView('grid');
    });
    
    listViewBtn.addEventListener('click', () => {
      setView('list');
    });
  }
  
  // Sort select
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      filterAndRenderProducts();
    });
  }
  
  // Price range sliders
  const minPriceSlider = document.getElementById('min-price');
  const maxPriceSlider = document.getElementById('max-price');
  const minPriceValue = document.getElementById('min-price-value');
  const maxPriceValue = document.getElementById('max-price-value');
  if (minPriceSlider && maxPriceSlider && minPriceValue && maxPriceValue) {
    minPriceSlider.addEventListener('input', () => {
      minPrice = parseInt(minPriceSlider.value);
      minPriceValue.textContent = `₹${minPrice}`;
      // Ensure min price doesn't exceed max price
      if (minPrice > maxPrice) {
        maxPrice = minPrice;
        maxPriceSlider.value = minPrice;
        maxPriceValue.textContent = `₹${maxPrice}`;
      }
    });
    
    maxPriceSlider.addEventListener('input', () => {
      maxPrice = parseInt(maxPriceSlider.value);
      maxPriceValue.textContent = `₹${maxPrice}`;
      // Ensure max price isn't less than min price
      if (maxPrice < minPrice) {
        minPrice = maxPrice;
        minPriceSlider.value = maxPrice;
        minPriceValue.textContent = `₹${minPrice}`;
      }
    });
  }
  
  // Apply filters button
  const applyFiltersBtn = document.querySelector('.apply-filters-btn');
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
      filterAndRenderProducts();
      // Close sidebar on mobile
      if (window.innerWidth < 768 && productsSidebar) {
        productsSidebar.classList.remove('active');
      }
    });
  }
  
  // Tab buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  if (tabButtons) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked tab
        button.classList.add('active');
        // Update active tab
        activeTab = button.dataset.tab;
        // Reset display count
        displayCount = 12;
        // Apply filters and render
        filterAndRenderProducts();
      });
    });
  }
  
  // Load more button
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      displayCount += 12;
      renderProducts();
      updateLoadMoreButton();
    });
  }
}

// Set the current view (grid or list)
function setView(view) {
  if (view === currentView) return;
  
  currentView = view;
  
  // Update button states
  const gridViewBtn = document.getElementById('grid-view-btn');
  const listViewBtn = document.getElementById('list-view-btn');
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
  const productsGrid = document.getElementById('products-grid');
  if (productsGrid) {
    if (view === 'grid') {
      productsGrid.classList.remove('list-view');
    } else {
      productsGrid.classList.add('list-view');
    }
  }
  
  // Re-render products
  renderProducts();
}

// Filter and render products
function filterAndRenderProducts() {
  // Start with all products
  let filtered = [...products];
  
  // Filter by category
  if (selectedCategory !== 'All') {
    filtered = filtered.filter(product => product.category === selectedCategory);
  }
  
  // Filter by price range
  filtered = filtered.filter(product => 
    product.currentPrice >= minPrice && product.currentPrice <= maxPrice
  );
  
  // Filter by tab
  if (activeTab !== 'all') {
    if (activeTab === 'sale') {
      filtered = filtered.filter(product => 
        product.originalPrice && product.currentPrice < product.originalPrice
      );
    } else if (activeTab === 'new') {
      filtered = filtered.filter(product => product.badge === 'New');
    } else if (activeTab === 'featured') {
      filtered = filtered.filter(product => product.badge === 'Premium' || product.rating >= 4.5);
    }
  }
  
  // Sort products
  sortProducts(filtered);
  
  // Store filtered products for later use
  filteredProducts = filtered;
  
  // Update products count
  const productsCount = document.getElementById('products-count');
  if (productsCount) {
    productsCount.textContent = filtered.length;
  }
  
  // Display products up to current display count
  renderProducts();
  
  // Update Load More button visibility
  updateLoadMoreButton();
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
    case 'newest':
      // Assuming higher IDs are newer products
      products.sort((a, b) => b.id - a.id);
      break;
    case 'popularity':
    default:
      // Sort by review count as a measure of popularity
      products.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }
}

// Render products in the container
function renderProducts() {
  const productsGrid = document.getElementById('products-grid');
  if (!productsGrid) return;
  
  // Clear the loading message if present
  if (!isProductsLoaded) {
    productsGrid.innerHTML = '';
    isProductsLoaded = true;
  }
  
  // If no products match filters
  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
      <div class="no-products">
        <i class="fas fa-search-minus"></i>
        <p>No products match your selected filters.</p>
        <button class="btn btn-outline reset-filters-btn">Reset Filters</button>
      </div>
    `;
    
    // Add event listener to reset filters button
    const resetFiltersBtn = productsGrid.querySelector('.reset-filters-btn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        // Reset all filters to default
        selectedCategory = 'All';
        activeTab = 'all';
        minPrice = 0;
        maxPrice = 5000;
        currentSort = 'popularity';
        
        // Update UI to reflect reset
        const allCategoryBtn = document.querySelector('[data-category="All"]');
        if (allCategoryBtn) {
          document.querySelectorAll('.filter-option').forEach(btn => {
            btn.classList.remove('active');
          });
          allCategoryBtn.classList.add('active');
        }
        
        const allTabBtn = document.querySelector('[data-tab="all"]');
        if (allTabBtn) {
          document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
          });
          allTabBtn.classList.add('active');
        }
        
        const minPriceSlider = document.getElementById('min-price');
        const maxPriceSlider = document.getElementById('max-price');
        const minPriceValue = document.getElementById('min-price-value');
        const maxPriceValue = document.getElementById('max-price-value');
        if (minPriceSlider) minPriceSlider.value = 0;
        if (maxPriceSlider) maxPriceSlider.value = 5000;
        if (minPriceValue) minPriceValue.textContent = '₹0';
        if (maxPriceValue) maxPriceValue.textContent = '₹5000';
        
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) sortSelect.value = 'popularity';
        
        // Apply reset filters
        filterAndRenderProducts();
      });
    }
    
    return;
  }
  
  // Get the subset of products to display
  const productsToShow = filteredProducts.slice(0, displayCount);
  
  // Create HTML for products based on current view
  const productsHTML = productsToShow.map(product => 
    currentView === 'grid' ? createProductCard(product) : createProductListItem(product)
  ).join('');
  
  // Set the HTML content
  productsGrid.innerHTML = productsHTML;
  
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
        ${product.badge ? `<span class="product-badge badge-${product.badge.toLowerCase()}">${product.badge}</span>` : ''}
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

// Update Load More button visibility
function updateLoadMoreButton() {
  const loadMoreBtn = document.getElementById('load-more-btn');
  const loadMoreContainer = document.getElementById('load-more-container');
  
  if (!loadMoreBtn || !loadMoreContainer) return;
  
  if (displayCount >= filteredProducts.length) {
    loadMoreContainer.style.display = 'none';
  } else {
    loadMoreContainer.style.display = 'block';
  }
}