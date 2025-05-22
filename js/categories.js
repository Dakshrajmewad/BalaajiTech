// Categories Page Functionality

// DOM Elements
const categoriesGrid = document.getElementById('categories-grid');

// Initialize categories page
document.addEventListener('DOMContentLoaded', async () => {
  // Wait for images to be processed
  await processProductImages();
  
  // Load categories
  loadCategories();
  
  // Initialize animations
  initAnimations();
});

// Load categories into the grid
function loadCategories() {
  if (!categoriesGrid) return;
  
  const categoryHTML = categories.map(category => createCategoryCard(category)).join('');
  categoriesGrid.innerHTML = categoryHTML;
  
  // Add event listeners to category cards
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const categoryName = card.dataset.category;
      window.location.href = `products.html?category=${encodeURIComponent(categoryName)}`;
    });
  });
}

// Create HTML for a category card
function createCategoryCard(category) {
  // Count products in this category
  const productCount = products.filter(product => product.category === category.name).length;
  
  // Get a sample product image from this category
  const sampleProduct = products.find(product => product.category === category.name);
  const sampleImage = sampleProduct ? sampleProduct.imageUrl : 'https://images.unsplash.com/photo-1602526432604-029a709e131c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';
  
  return `
    <div class="category-card" data-category="${category.name}">
      <div class="category-card-image">
        <img src="${sampleImage}" alt="${category.name}">
        <div class="category-icon ${category.bgColor}">
          <i class="fas fa-${category.icon} ${category.color}"></i>
        </div>
      </div>
      <div class="category-card-content">
        <h3>${category.name}</h3>
        <p>${getCategoryDescription(category.name)}</p>
        <div class="category-card-footer">
          <span class="product-count">${productCount} Products</span>
          <span class="view-more">Browse <i class="fas fa-arrow-right"></i></span>
        </div>
      </div>
    </div>
  `;
}

// Get a description for each category
function getCategoryDescription(categoryName) {
  const descriptions = {
    'Robotics': 'Discover robotic toys that teach programming concepts and stimulate curiosity about technology.',
    'Board Games': 'Fun and educational board games that develop strategic thinking and social skills.',
    'Building Blocks': 'Creative building blocks that encourage spatial thinking and fine motor skills.',
    'RC Toys': 'Remote-controlled toys that develop hand-eye coordination and provide hours of entertainment.',
    'Art & Craft': 'Art and craft kits that foster creativity and self-expression in children.',
    'Science Kits': 'Hands-on science kits that make learning about the world fun and interactive.'
  };
  
  return descriptions[categoryName] || 'Explore our range of high-quality educational toys.';
}

// Event delegation for age group buttons
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.age-card .btn');
  if (btn) {
    const ageRange = btn.closest('.age-card').querySelector('h3').textContent;
    window.location.href = `products.html?age=${encodeURIComponent(ageRange)}`;
  }
});