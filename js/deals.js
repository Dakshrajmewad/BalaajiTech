// Deals Page Functionality

// DOM Elements
const countdownTimer = document.getElementById('countdown-timer');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const dealTimer = document.getElementById('deal-timer');
const dealsProductsGrid = document.getElementById('deals-products-grid');
const discountFilter = document.getElementById('discount-filter');
const sortFilter = document.getElementById('sort-filter');
const loadMoreBtn = document.getElementById('load-more-btn');
const copyCodeBtns = document.querySelectorAll('.copy-code-btn');
const featuredBuyButton = document.querySelector('.featured-buy-button');

// Variables
let discountedProducts = []; // Will hold products with discounts
let displayCount = 6; // Initial number of products to display
let currentDiscount = 'all'; // Default discount filter
let currentSort = 'discount-high'; // Default sort

// Initialize deals page functionality
document.addEventListener('DOMContentLoaded', async () => {
  // Wait for products to be processed for images
  await processProductImages();
  
  // Filter for discounted products
  discountedProducts = products.filter(product => 
    product.originalPrice && product.currentPrice < product.originalPrice
  );
  
  // Initialize countdown timer for flash sale
  initCountdown();
  
  // Initialize deal of the day timer
  initDealTimer();
  
  // Apply filters and render products
  filterAndRenderProducts();
  
  // Add event listeners
  setupEventListeners();
});

// Set up all event listeners
function setupEventListeners() {
  // Discount filter
  if (discountFilter) {
    discountFilter.addEventListener('change', () => {
      currentDiscount = discountFilter.value;
      displayCount = 6; // Reset display count
      filterAndRenderProducts();
    });
  }
  
  // Sort filter
  if (sortFilter) {
    sortFilter.addEventListener('change', () => {
      currentSort = sortFilter.value;
      filterAndRenderProducts();
    });
  }
  
  // Load more button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      displayCount += 6;
      filterAndRenderProducts();
    });
  }
  
  // Promo code copy buttons
  if (copyCodeBtns.length > 0) {
    copyCodeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.dataset.code;
        copyToClipboard(code);
        
        // Update button text temporarily
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      });
    });
  }
  
  // Featured Buy Now button
  if (featuredBuyButton) {
    featuredBuyButton.addEventListener('click', () => {
      redirectToWhatsApp('RC Smart Robot Toy', 1499);
    });
  }
}

// Initialize countdown timer for flash sale
function initCountdown() {
  if (!countdownTimer) return;
  
  // Set the end date to 3 days from now
  const now = new Date();
  const endDate = new Date();
  endDate.setDate(now.getDate() + 3);
  endDate.setHours(23, 59, 59, 0);
  
  // Update timer immediately and then every second
  updateCountdown(endDate);
  setInterval(() => updateCountdown(endDate), 1000);
}

// Update countdown timer
function updateCountdown(endDate) {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  
  const now = new Date();
  const diff = endDate - now;
  
  if (diff <= 0) {
    // Timer expired
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  daysEl.textContent = days.toString().padStart(2, '0');
  hoursEl.textContent = hours.toString().padStart(2, '0');
  minutesEl.textContent = minutes.toString().padStart(2, '0');
  secondsEl.textContent = seconds.toString().padStart(2, '0');
}

// Initialize deal of the day timer
function initDealTimer() {
  if (!dealTimer) return;
  
  // Set random hours, minutes, seconds for the deal timer
  const hours = Math.floor(Math.random() * 23);
  const minutes = Math.floor(Math.random() * 59);
  const seconds = Math.floor(Math.random() * 59);
  
  updateDealTimer(hours, minutes, seconds);
  
  // Update every second
  let currentHours = hours;
  let currentMinutes = minutes;
  let currentSeconds = seconds;
  
  setInterval(() => {
    if (currentSeconds > 0) {
      currentSeconds--;
    } else {
      currentSeconds = 59;
      
      if (currentMinutes > 0) {
        currentMinutes--;
      } else {
        currentMinutes = 59;
        
        if (currentHours > 0) {
          currentHours--;
        } else {
          // Reset to a new random time when it reaches zero
          currentHours = Math.floor(Math.random() * 23);
          currentMinutes = Math.floor(Math.random() * 59);
          currentSeconds = Math.floor(Math.random() * 59);
        }
      }
    }
    
    updateDealTimer(currentHours, currentMinutes, currentSeconds);
  }, 1000);
}

// Update deal timer display
function updateDealTimer(hours, minutes, seconds) {
  if (!dealTimer) return;
  
  dealTimer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Copy text to clipboard
function copyToClipboard(text) {
  // Create a temporary input element
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  
  // Select and copy the text
  input.select();
  document.execCommand('copy');
  
  // Remove the temporary input
  document.body.removeChild(input);
}

// Filter and render products
function filterAndRenderProducts() {
  // Start with all discounted products
  let filtered = [...discountedProducts];
  
  // Apply discount filter
  if (currentDiscount !== 'all') {
    const minDiscount = parseInt(currentDiscount);
    filtered = filtered.filter(product => {
      const discountPercentage = Math.round((1 - product.currentPrice / product.originalPrice) * 100);
      return discountPercentage >= minDiscount;
    });
  }
  
  // Sort products
  sortProducts(filtered);
  
  // Render products
  renderProducts(filtered);
  
  // Update load more button visibility
  updateLoadMoreButton(filtered);
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
    case 'discount-high':
    default:
      // Sort by discount percentage (highest first)
      products.sort((a, b) => {
        const discountA = (1 - a.currentPrice / a.originalPrice) * 100;
        const discountB = (1 - b.currentPrice / b.originalPrice) * 100;
        return discountB - discountA;
      });
      break;
  }
}

// Update load more button visibility
function updateLoadMoreButton(filtered) {
  if (!loadMoreBtn) return;
  
  if (displayCount >= filtered.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'inline-block';
  }
}

// Render products in the grid
function renderProducts(filtered) {
  if (!dealsProductsGrid) return;
  
  // If no products match filters
  if (filtered.length === 0) {
    dealsProductsGrid.innerHTML = `
      <div class="no-products">
        <i class="fas fa-search-minus"></i>
        <p>No products match your selected filters.</p>
        <button class="btn btn-outline reset-filters-btn">Reset Filters</button>
      </div>
    `;
    
    // Add event listener to reset filters button
    const resetFiltersBtn = dealsProductsGrid.querySelector('.reset-filters-btn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        // Reset filters to default
        currentDiscount = 'all';
        currentSort = 'discount-high';
        
        if (discountFilter) discountFilter.value = 'all';
        if (sortFilter) sortFilter.value = 'discount-high';
        
        // Apply reset filters
        filterAndRenderProducts();
      });
    }
    
    return;
  }
  
  // Get products to display
  const productsToShow = filtered.slice(0, displayCount);
  
  // Create HTML for each product
  const productsHTML = productsToShow.map(product => createProductCard(product)).join('');
  
  // Set the HTML content
  dealsProductsGrid.innerHTML = productsHTML;
  
  // Add click event listeners to product cards
  document.querySelectorAll('.product-card').forEach((card, index) => {
    card.addEventListener('click', () => {
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

// Create HTML for a product card
function createProductCard(product) {
  // Calculate discount percentage
  const discountPercentage = Math.round((1 - product.currentPrice / product.originalPrice) * 100);
  
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
    <div class="product-card deal-card">
      <div class="product-image">
        <img src="${product.imageUrl}" alt="${product.name}">
        <span class="product-badge badge-sale">Sale</span>
        <div class="discount-bubble">-${discountPercentage}%</div>
      </div>
      <div class="product-details">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          ${starsHTML}
          <span class="review-count">(${product.reviewCount})</span>
        </div>
        <div class="product-price">
          <span class="current-price">₹${product.currentPrice.toLocaleString()}</span>
          <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
        </div>
        <button class="btn btn-primary buy-button">
          <i class="fab fa-whatsapp"></i> Buy Now
        </button>
      </div>
    </div>
  `;
}