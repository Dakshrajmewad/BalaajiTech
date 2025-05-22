// Banner Carousel Functionality

// DOM Elements
const carouselSlides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dots .dot');

// Variables
let currentSlide = 0;
let slideInterval;
const slideDelay = 5000; // 5 seconds per slide

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Start the slideshow
  startSlideshow();
  
  // Add click events for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetSlideTimer();
    });
  });
  
  // Handle swipe gestures for mobile
  const carousel = document.querySelector('.carousel-container');
  if (carousel) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      // Detect swipe direction and change slide accordingly
      if (touchEndX < touchStartX - 50) {
        // Swipe left - next slide
        nextSlide();
        resetSlideTimer();
      } else if (touchEndX > touchStartX + 50) {
        // Swipe right - previous slide
        prevSlide();
        resetSlideTimer();
      }
    }
  }
});

// Start the slideshow
function startSlideshow() {
  slideInterval = setInterval(() => {
    nextSlide();
  }, slideDelay);
}

// Reset the slide timer
function resetSlideTimer() {
  clearInterval(slideInterval);
  startSlideshow();
}

// Go to a specific slide
function goToSlide(index) {
  // Remove active class from all slides and dots
  carouselSlides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Add active class to current slide and dot
  carouselSlides[index].classList.add('active');
  dots[index].classList.add('active');
  
  // Update current slide index
  currentSlide = index;
  
  // Reset animations on the current slide content
  const content = carouselSlides[index].querySelector('.carousel-content');
  if (content) {
    const heading = content.querySelector('h2');
    const paragraph = content.querySelector('p');
    const button = content.querySelector('.btn');
    
    // Reset animation by removing and re-adding animation class
    if (heading) {
      heading.style.animation = 'none';
      heading.offsetHeight; // Trigger reflow
      heading.style.animation = null;
      heading.style.animationName = 'slideUp';
      heading.style.animationDuration = '0.5s';
      heading.style.animationFillMode = 'forwards';
    }
    
    if (paragraph) {
      paragraph.style.animation = 'none';
      paragraph.offsetHeight; // Trigger reflow
      paragraph.style.animation = null;
      paragraph.style.animationName = 'slideUp';
      paragraph.style.animationDuration = '0.5s';
      paragraph.style.animationDelay = '0.3s';
      paragraph.style.animationFillMode = 'forwards';
    }
    
    if (button) {
      button.style.animation = 'none';
      button.offsetHeight; // Trigger reflow
      button.style.animation = null;
      button.style.animationName = 'slideUp';
      button.style.animationDuration = '0.5s';
      button.style.animationDelay = '0.4s';
      button.style.animationFillMode = 'forwards';
    }
  }
}

// Go to next slide
function nextSlide() {
  let next = currentSlide + 1;
  if (next >= carouselSlides.length) {
    next = 0;
  }
  goToSlide(next);
}

// Go to previous slide
function prevSlide() {
  let prev = currentSlide - 1;
  if (prev < 0) {
    prev = carouselSlides.length - 1;
  }
  goToSlide(prev);
}