// Product data for the Balaji Tech Store
const products = [
  {
    id: 1,
    name: "RC Smart Robot Toy",
    description: "This advanced RC Robot Toy combines fun with learning. It can be programmed using a simple app, teaching children the basics of coding while they play. With voice commands, touch sensors, and programmable movements, this robot provides endless entertainment.",
    category: "Robotics",
    currentPrice: 1499,
    originalPrice: 1999,
    imageUrl: "images/products/robot.jpg",
    badge: "Sale",
    rating: 4.5,
    reviewCount: 124,
    colors: ["bg-blue-500", "bg-red-500", "bg-green-500"],
    features: [
      "App-controlled movements",
      "Voice command recognition",
      "Touch sensors for interaction",
      "Programmable actions and dance moves",
      "Rechargeable battery (4 hours playtime)",
      "Compatible with iOS and Android",
      "Bluetooth connectivity up to 10 meters",
      "Multilingual voice support (5 languages)",
      "Motion detection sensors for interactive play",
      "Educational coding lessons built-in"
    ],
    inStock: true
  },
  {
    id: 2,
    name: "Science Experiment Kit",
    description: "Discover the wonders of science with this comprehensive experiment kit. Perfect for young scientists ages 8+, this kit includes over 40 exciting experiments covering chemistry, physics, and biology concepts. All materials are safe and kid-friendly.",
    category: "Science Kits",
    currentPrice: 899,
    originalPrice: 1199,
    imageUrl: "images/products/science-kit.jpg",
    badge: null,
    rating: 4,
    reviewCount: 89,
    colors: ["bg-purple-500", "bg-blue-500"],
    features: [
      "40+ experiments in one box",
      "Detailed full-color instruction manual",
      "Real scientific tools included",
      "Safe, non-toxic materials",
      "Educational guide with explanations",
      "Connection to NCERT curriculum topics",
      "Online video demonstrations included",
      "Additional resources through QR codes",
      "Eco-friendly packaging materials",
      "Free replacement parts within 3 months"
    ],
    inStock: true
  },
  {
    id: 3,
    name: "Creative Building Blocks (120 pcs)",
    description: "Encourage creativity and develop motor skills with our 120-piece building block set. Made from high-quality, BPA-free plastic, these colorful blocks are perfectly sized for small hands and easy to connect. Compatible with all major building block brands.",
    category: "Building Blocks",
    currentPrice: 799,
    originalPrice: 999,
    imageUrl: "images/products/blocks.jpg",
    badge: null,
    rating: 5,
    reviewCount: 215,
    colors: ["bg-yellow-500", "bg-red-500", "bg-blue-500", "bg-green-500"],
    features: [
      "120 pieces in assorted colors and shapes",
      "Compatible with all major block brands",
      "BPA-free, non-toxic materials",
      "Develops fine motor skills and creativity",
      "Storage box included",
      "Suitable for ages 3+",
      "Instruction booklet with 15 model ideas",
      "Extra-large pieces for younger children",
      "Smooth edges for safe handling",
      "High-quality ABS plastic for durability"
    ],
    inStock: true
  },
  {
    id: 4,
    name: "Remote Control Racing Car",
    description: "Experience high-speed fun with this sleek remote control racing car. With a powerful motor and responsive controls, this car can reach speeds of up to 20km/h. Features a durable design that can handle crashes and all-terrain wheels for indoor and outdoor play.",
    category: "RC Toys",
    currentPrice: 1299,
    originalPrice: 1799,
    imageUrl: "images/products/rc-car.jpg",
    badge: "Sale",
    rating: 3.5,
    reviewCount: 67,
    colors: ["bg-red-500", "bg-blue-500", "bg-black"],
    features: [
      "Up to 20km/h top speed",
      "25-minute playtime per charge",
      "30-meter control range",
      "All-terrain wheels",
      "Impact-resistant body",
      "Easy-to-use controller",
      "LED headlights for night racing",
      "Quick-charge technology (2 hours for full charge)",
      "Drift capability on smooth surfaces",
      "Waterproof design for outdoor use"
    ],
    inStock: true
  },
  {
    id: 5,
    name: "Super Art & Craft Kit",
    description: "Unleash creativity with our comprehensive art and craft kit. Perfect for children 5+, this kit includes everything needed for countless creative projects, from drawing and painting to crafting and decorating.",
    category: "Art & Craft",
    currentPrice: 599,
    originalPrice: null,
    imageUrl: "images/products/art-kit.jpg",
    badge: null,
    rating: 4,
    reviewCount: 103,
    colors: ["bg-purple-500"],
    features: [
      "150+ piece comprehensive art set",
      "Watercolor paints, crayons, and colored pencils",
      "Craft papers, stickers, and scissors",
      "Drawing pad and coloring pages",
      "Step-by-step project guides",
      "Reusable storage case",
      "Non-staining washable colors",
      "Biodegradable and eco-friendly materials",
      "10 Indian art technique guides",
      "Online community for sharing creations"
    ],
    inStock: true
  },
  {
    id: 6,
    name: "Puzzle Cube Set",
    description: "Challenge young minds with our set of 3 puzzle cubes of varying difficulty. These classic brain teasers help develop problem-solving skills, spatial awareness, and persistence. Perfect for children and adults alike.",
    category: "Board Games",
    currentPrice: 499,
    originalPrice: null,
    imageUrl: "images/products/puzzle-cube.jpg",
    badge: null,
    rating: 4.5,
    reviewCount: 142,
    colors: ["bg-green-500", "bg-blue-500", "bg-red-500"],
    features: [
      "Set of 3 puzzle cubes (2x2, 3x3, 4x4)",
      "Smooth rotation mechanism",
      "Durable ABS plastic construction",
      "Illustrated solution guide included",
      "Develops logical thinking and patience",
      "Suitable for ages 6+",
      "Enhanced corner design for faster solving",
      "Competition-grade quality",
      "Tension adjustment tools included",
      "Custom stickers for personalization"
    ],
    inStock: true
  },
  {
    id: 7,
    name: "Fun Learning Board Game",
    description: "Combine fun and education with this engaging board game that teaches math, language, and general knowledge. Perfect for family game night, this game accommodates 2-6 players and offers adjustable difficulty levels for different ages.",
    category: "Board Games",
    currentPrice: 899,
    originalPrice: null,
    imageUrl: "images/products/board-game.jpg",
    badge: null,
    rating: 4,
    reviewCount: 87,
    colors: ["bg-yellow-500"],
    features: [
      "2-6 players, 30-60 minutes gameplay",
      "1000+ questions in multiple categories",
      "Adjustable difficulty levels",
      "Teaches math, language, and general knowledge",
      "High-quality board and game pieces",
      "Perfect for family game night",
      "Ages 7+",
      "India-specific trivia questions included",
      "Digital scorekeeping app available",
      "Monthly question pack updates available online"
    ],
    inStock: true
  },
  {
    id: 8,
    name: "Mini Drone for Kids",
    description: "Introduce children to the exciting world of drones with this easy-to-fly mini drone. Designed specifically for beginners, it features one-button takeoff/landing, altitude hold, and a durable crash-resistant design. Includes protective propeller guards for safe indoor flight.",
    category: "RC Toys",
    currentPrice: 1999,
    originalPrice: null,
    imageUrl: "images/products/drone.jpg",
    badge: "New",
    rating: 5,
    reviewCount: 56,
    colors: ["bg-black", "bg-blue-500"],
    features: [
      "One-button takeoff and landing",
      "Altitude hold for stable flight",
      "Headless mode for easier control",
      "360° flips and tricks capability",
      "Durable, crash-resistant design",
      "10-minute flight time per charge",
      "Remote control included (batteries not included)",
      "Suitable for ages 8+",
      "Built-in low battery warning system",
      "HD camera option available for photography"
    ],
    inStock: true
  },
  {
    id: 9,
    name: "Magnetic Tiles Building Set (60 pcs)",
    description: "Develop spatial thinking and creativity with our magnetic building tiles. These colorful translucent pieces allow children to build 3D structures that stay together with strong magnets. Perfect for STEM learning and imaginative play.",
    category: "Building Blocks",
    currentPrice: 1599,
    originalPrice: 1999,
    imageUrl: "images/products/magnetic-tiles.jpg",
    badge: "Sale",
    rating: 4.8,
    reviewCount: 193,
    colors: ["bg-blue-500", "bg-purple-500", "bg-pink-500"],
    features: [
      "60 magnetic tiles in various shapes and colors",
      "Strong magnets that securely connect pieces",
      "Translucent colorful design for light play",
      "BPA-free, child-safe materials",
      "Compatible with other major magnetic tile brands",
      "Develops STEM skills through creative play",
      "Includes idea booklet with 30+ designs",
      "Storage bag included for easy cleanup",
      "Extra-strength magnets for taller structures",
      "Encourages creative and open-ended play"
    ],
    inStock: true
  },
  {
    id: 10,
    name: "Electronic Keyboard for Kids",
    description: "Introduce your child to the joy of music with this specially designed electronic keyboard. Features 37 keys, 100 different sounds, and built-in learning songs. The colorful keys and fun sound effects make learning music entertaining.",
    category: "Educational Toys",
    currentPrice: 1299,
    originalPrice: 1599,
    imageUrl: "images/products/keyboard.jpg",
    badge: "New",
    rating: 4.3,
    reviewCount: 72,
    colors: ["bg-red-500", "bg-blue-500", "bg-yellow-500"],
    features: [
      "37 keys sized for small hands",
      "100 instrument sounds and rhythm tracks",
      "Built-in learning mode with 20 songs",
      "Recording and playback function",
      "LED display with animated notes",
      "Volume control for quiet practice",
      "Dual power (batteries or AC adapter included)",
      "Microphone input for sing-along fun",
      "USB port for connecting to PC or tablet",
      "Includes stand and music sheet holder"
    ],
    inStock: true
  },
  {
    id: 11,
    name: "Interactive Solar System Model",
    description: "Bring the wonders of space to your home with this interactive solar system model. The motorized planets orbit around the sun while an included audio guide explains fascinating facts about each planet and space exploration.",
    category: "Science Kits",
    currentPrice: 1799,
    originalPrice: 2299,
    imageUrl: "images/products/solar-system.jpg",
    badge: "Sale",
    rating: 4.7,
    reviewCount: 108,
    colors: ["bg-blue-500"],
    features: [
      "Accurate scaled model of our solar system",
      "Motorized orbital movement with LED sun",
      "Audio guide with 30+ minutes of space facts",
      "Night light mode with constellation projection",
      "Detailed hand-painted planet models",
      "Remote control operation",
      "Auto-shutoff after 30 minutes",
      "Includes space quiz game cards",
      "ISRO and NASA educational facts included",
      "Rechargeable battery (8 hours runtime)"
    ],
    inStock: true
  },
  {
    id: 12,
    name: "Wooden Chess Set with Tutorial",
    description: "This premium wooden chess set comes with a built-in tutorial system that uses LED indicators to teach chess moves. Perfect for beginners learning the game or experienced players wanting to improve their skills.",
    category: "Board Games",
    currentPrice: 1899,
    originalPrice: null,
    imageUrl: "images/products/chess.jpg",
    badge: "Premium",
    rating: 4.9,
    reviewCount: 85,
    colors: ["bg-amber-800", "bg-stone-800"],
    features: [
      "Handcrafted wooden board and pieces",
      "Built-in tutorial mode with LED indicators",
      "50 pre-programmed chess lessons",
      "Magnetic pieces for secure placement",
      "Folding board with storage compartment",
      "Available in classic or modern design",
      "Battery-powered electronic components",
      "Includes printed strategy guidebook",
      "Timer function for tournament play",
      "Compatible with chess tutorial app"
    ],
    inStock: true
  }
];

// For image URLs, make a fallback to external URLs in case local images are not available
const fallbackImages = {
  'images/products/robot.jpg': 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'images/products/science-kit.jpg': 'https://images.unsplash.com/photo-1632853073412-782bf0279d65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'images/products/blocks.jpg': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'images/products/rc-car.jpg': 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'images/products/art-kit.jpg': 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'images/products/puzzle-cube.jpg': 'https://pixabay.com/get/g6d6007363fc576724b4dc975b353cbfb6f6c9dbcb4bfbc2bb72a503f07699d4103a35fc2bdf3e78bc5c3e1932ce7fb2e76bf288818370853b06b3db7c8aa6995_1280.jpg',
  'images/products/board-game.jpg': 'https://pixabay.com/get/ga8301104d1309be24c62cb4d24aca5d57909dd6931f0a330e1d24b851198b86e494e51765eceebcea6c73c9e383ea8d20dfdc635684a0895fca07cd045fbb934_1280.jpg',
  'images/products/drone.jpg': 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'images/products/magnetic-tiles.jpg': 'https://images.unsplash.com/photo-1560167016-022b78a0258e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'images/products/keyboard.jpg': 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'images/products/solar-system.jpg': 'https://pixabay.com/get/g8bfb1b97cea2b1e14c685fb7d46db0a3823acc0cf32a57be7c15f9a97bc1a5204dfc9ddbc41a1ff979329c80c41a51af2fd15f2da1e22feae9d3af9dbb39e6cc_1280.jpg',
  'images/products/chess.jpg': 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
};

// Fallback for banner images
const fallbackBanners = {
  'images/banner1.jpg': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=600',
  'images/banner2.jpg': 'https://pixabay.com/get/gd4deb6c21514ee07b9aa50a115047495351812a7108e8de3a36e08b9cd72d39cf875c2678c3f193d44f95c53254e320ffe43e740ffa99024c835fdc653f2d308_1280.jpg',
  'images/banner3.jpg': 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=600',
  'images/promo.jpg': 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'images/about.jpg': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
};

// Categories data
const categories = [
  {
    id: 1,
    name: "Robotics",
    icon: "robot",
    color: "text-secondary",
    bgColor: "bg-secondary-light"
  },
  {
    id: 2,
    name: "Board Games",
    icon: "chess-board",
    color: "text-primary",
    bgColor: "bg-primary-light"
  },
  {
    id: 3,
    name: "Building Blocks",
    icon: "cubes",
    color: "text-amber",
    bgColor: "bg-amber-light"
  },
  {
    id: 4,
    name: "RC Toys",
    icon: "car",
    color: "text-purple",
    bgColor: "bg-purple-light"
  },
  {
    id: 5,
    name: "Art & Craft",
    icon: "paint-brush",
    color: "text-green",
    bgColor: "bg-green-light"
  },
  {
    id: 6,
    name: "Science Kits",
    icon: "flask",
    color: "text-blue",
    bgColor: "bg-blue-light"
  }
];

// Function to check if an image exists and return fallback if it doesn't
function getImageUrl(src, fallbackUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(fallbackUrl);
    img.src = src;
  });
}

// Process products to ensure images are available
async function processProductImages() {
  for (const product of products) {
    const fallbackUrl = fallbackImages[product.imageUrl];
    if (fallbackUrl) {
      product.imageUrl = await getImageUrl(product.imageUrl, fallbackUrl);
    }
  }
  return products;
}

// Process banner images to ensure they are available
async function processBannerImages() {
  const bannerElements = document.querySelectorAll('.carousel-slide');
  for (const banner of bannerElements) {
    const backgroundImage = window.getComputedStyle(banner).backgroundImage;
    const match = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
    if (match) {
      const imagePath = match[1];
      const fallbackUrl = fallbackBanners[imagePath];
      if (fallbackUrl) {
        const validUrl = await getImageUrl(imagePath, fallbackUrl);
        banner.style.backgroundImage = `url('${validUrl}')`;
      }
    }
  }
}

// Process promo and about images
async function processOtherImages() {
  const promoImg = document.querySelector('.promo-image img');
  if (promoImg) {
    const fallbackUrl = fallbackBanners[promoImg.src];
    if (fallbackUrl) {
      promoImg.src = await getImageUrl(promoImg.src, fallbackUrl);
    }
  }
  
  const aboutImg = document.querySelector('.about-image img');
  if (aboutImg) {
    const fallbackUrl = fallbackBanners[aboutImg.src];
    if (fallbackUrl) {
      aboutImg.src = await getImageUrl(aboutImg.src, fallbackUrl);
    }
  }
}

// Initialize all images when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  await processProductImages();
  await processBannerImages();
  await processOtherImages();
});