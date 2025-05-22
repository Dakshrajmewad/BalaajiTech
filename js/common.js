// Common JavaScript functionality shared across all pages

// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const menuIcon = document.getElementById('menu-icon');
const searchToggle = document.getElementById('search-toggle');
const mobileSearch = document.getElementById('mobile-search');
const backToTopBtn = document.getElementById('back-to-top');
const productModal = document.getElementById('product-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalProductDetails = document.querySelector('.modal-product-details');
const currentYearEl = document.getElementById('current-year');

// Set current year in footer
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// Mobile Menu Toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    
    // Toggle between hamburger and X icon
    if (mainNav.classList.contains('active')) {
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-times');
    } else {
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
    }
  });
}

// Mobile Search Toggle
if (searchToggle) {
  searchToggle.addEventListener('click', () => {
    mobileSearch.classList.toggle('active');
  });
}

// Back to Top Button
window.addEventListener('scroll', () => {
  if (backToTopBtn) {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Modal Functions
function openProductModal(product) {
  if (!productModal || !modalProductDetails) return;
  
  modalProductDetails.innerHTML = generateProductModalHTML(product);
  productModal.classList.add('open');
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  
  // Add event listeners for the modal content
  addModalEventListeners();
}

function closeProductModal() {
  if (!productModal) return;
  
  productModal.classList.remove('open');
  document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking the close button
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeProductModal);
}

// Close modal when clicking outside the modal content
if (productModal) {
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
      closeProductModal();
    }
  });
}

// Close modal when pressing ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && productModal && productModal.classList.contains('open')) {
    closeProductModal();
  }
});

// Generate Product Modal HTML
function generateProductModalHTML(product) {
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
  
  // Generate features list if available
  let featuresHTML = '';
  if (product.features && product.features.length > 0) {
    featuresHTML = `
      <div class="product-features">
        <h4>Key Features:</h4>
        <ul>
          ${product.features.map(feature => `<li><i class="fas fa-check text-green"></i> ${feature}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Generate color options if available
  let colorsHTML = '';
  if (product.colors && product.colors.length > 0) {
    colorsHTML = `
      <div class="product-colors">
        <h4>Available Colors:</h4>
        <div class="color-options">
          ${product.colors.map((color, index) => `
            <div class="color-option ${color} ${index === 0 ? 'active' : ''}" data-color="${color}"></div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  return `
    <div class="product-gallery">
      <div class="main-image">
        <img src="${product.imageUrl}" alt="${product.name}">
        ${product.badge ? `<span class="product-badge badge-${product.badge.toLowerCase()}">${product.badge}</span>` : ''}
      </div>
      <div class="thumbnail-container">
        <div class="thumbnail active" data-img="${product.imageUrl}">
          <img src="${product.imageUrl}" alt="${product.name} thumbnail 1">
        </div>
        <div class="thumbnail" data-img="https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600">
          <img src="https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" alt="${product.name} thumbnail 2">
        </div>
        <div class="thumbnail" data-img="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600">
          <img src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" alt="${product.name} thumbnail 3">
        </div>
      </div>
    </div>
    <div class="product-info">
      <h2>${product.name}</h2>
      <div class="product-rating">
        ${starsHTML}
        <span class="review-count">(${product.reviewCount} reviews)</span>
      </div>
      <div class="product-price-container">
        <div class="current-price">₹${product.currentPrice.toLocaleString()}</div>
        ${product.originalPrice ? `
          <div class="price-details">
            <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
            <span class="discount-tag">${discountPercentage}% OFF</span>
          </div>
        ` : ''}
        <p class="tax-info">Inclusive of all taxes</p>
      </div>
      
      ${colorsHTML}
      
      <div class="product-quantity">
        <h4>Quantity:</h4>
        <div class="quantity-selector">
          <button class="quantity-btn minus" disabled>-</button>
          <span class="quantity-value">1</span>
          <button class="quantity-btn plus">+</button>
        </div>
      </div>
      
      <div class="product-description">
        <h4>Description:</h4>
        <p>${product.description}</p>
      </div>
      
      ${featuresHTML}
      
      <div class="product-actions">
        <button class="btn btn-primary add-to-cart-btn">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
        <button class="btn btn-secondary buy-now-btn">
          <i class="fab fa-whatsapp"></i> Buy Now
        </button>
      </div>
      
      <div class="delivery-info">
        <div class="delivery-item">
          <i class="fas fa-truck text-secondary"></i>
          <div>
            <h5>Free Delivery</h5>
            <p>3-5 business days on orders over ₹500</p>
          </div>
        </div>
        <div class="delivery-item">
          <i class="fas fa-shield-alt text-secondary"></i>
          <div>
            <h5>1 Year Warranty</h5>
            <p>Against manufacturing defects</p>
          </div>
        </div>
        <div class="delivery-item">
          <i class="fas fa-undo text-secondary"></i>
          <div>
            <h5>7-Day Returns</h5>
            <p>Hassle-free return policy</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Add event listeners for modal elements
function addModalEventListeners() {
  // Thumbnail clicks
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.querySelector('.main-image img');
  
  if (thumbnails && mainImage) {
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        thumbnail.classList.add('active');
        
        // Update main image
        mainImage.src = thumbnail.dataset.img;
      });
    });
  }
  
  // Quantity buttons
  const minusBtn = document.querySelector('.quantity-btn.minus');
  const plusBtn = document.querySelector('.quantity-btn.plus');
  const quantityValue = document.querySelector('.quantity-value');
  
  if (minusBtn && plusBtn && quantityValue) {
    minusBtn.addEventListener('click', () => {
      let quantity = parseInt(quantityValue.textContent);
      if (quantity > 1) {
        quantity--;
        quantityValue.textContent = quantity;
        minusBtn.disabled = quantity <= 1;
      }
    });
    
    plusBtn.addEventListener('click', () => {
      let quantity = parseInt(quantityValue.textContent);
      if (quantity < 10) {
        quantity++;
        quantityValue.textContent = quantity;
        minusBtn.disabled = false;
        plusBtn.disabled = quantity >= 10;
      }
    });
  }
  
  // Color options
  const colorOptions = document.querySelectorAll('.color-option');
  
  if (colorOptions) {
    colorOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Remove active class from all options
        colorOptions.forEach(o => o.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
      });
    });
  }
  
  // Buy Now Button
  const buyNowBtn = document.querySelector('.buy-now-btn');
  
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      const productName = document.querySelector('.product-info h2').textContent;
      const priceText = document.querySelector('.current-price').textContent;
      const price = parseInt(priceText.replace(/[₹,]/g, ''));
      const quantity = parseInt(document.querySelector('.quantity-value').textContent);
      
      redirectToWhatsApp(productName, price, quantity);
    });
  }
}

// WhatsApp Redirection Function
function redirectToWhatsApp(productName, price, quantity = 1) {
  const message = `Hello, I'm interested in purchasing the "${productName}" from Balaji Tech Toys.\n\nPrice: ₹${price.toLocaleString()}\nQuantity: ${quantity}\n\nPlease provide more details about delivery options.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/919265736761?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  // Initialize animation observers
  initAnimations();
});

// Initialize animations with Intersection Observer
function initAnimations() {
  // Find elements with animation classes
  const animElements = document.querySelectorAll('.animate-on-scroll');
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animClass = element.dataset.animation || 'fade-in';
        const delay = element.dataset.delay || '0s';
        
        element.style.animationDelay = delay;
        element.classList.add(animClass);
        
        // Unobserve after animation is triggered
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe elements
  animElements.forEach(element => {
    observer.observe(element);
  });
  
  // Add animation classes to common elements if they don't have them already
  const elementsToAnimate = [
    { selector: '.section-title', animation: 'slide-up', delay: '0s' },
    { selector: '.category-item', animation: 'slide-up', staggered: true },
    { selector: '.product-card', animation: 'fade-in', staggered: true },
    { selector: '.testimonial-card', animation: 'slide-up', staggered: true },
    { selector: '.promo-content h2', animation: 'slide-left', delay: '0s' },
    { selector: '.promo-content p', animation: 'slide-left', delay: '0.1s' },
    { selector: '.promo-content .btn', animation: 'slide-left', delay: '0.2s' },
    { selector: '.about-content h2', animation: 'slide-up', delay: '0s' },
    { selector: '.about-content p', animation: 'slide-up', delay: '0.1s' },
    { selector: '.about-image', animation: 'slide-right', delay: '0.2s' }
  ];
  
  elementsToAnimate.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    
    elements.forEach((element, index) => {
      if (!element.classList.contains('animate-on-scroll')) {
        element.classList.add('animate-on-scroll');
        element.dataset.animation = item.animation;
        
        if (item.staggered) {
          element.dataset.delay = `${index * 0.1}s`;
        } else if (item.delay) {
          element.dataset.delay = item.delay;
        }
        
        observer.observe(element);
      }
    });
  });
}