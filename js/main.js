/**
 * OYANGE: Visual Portfolio Website
 * Main application logic with modular architecture
 */

// Application namespace
const OYANGE = {
  // Configuration
  config: {
    cloudName: 'demo', // Replace with your actual cloudinary name
    brandStorageKey: 'oyange_brand',
    galleryStorageKey: 'oyange_gallery',
    adminPassword: 'oyange2025', // Change this in production
    defaultBrand: { name: "OYANGE", tagline: "Visual Archive" },
    animationsEnabled: true
  },
  
  // State management
  state: {
    isLoading: true,
    galleryData: [],
    brandSettings: {},
    isAuthenticated: false
  },
  
  // Initialize the application
  init: function() {
    this.loadData();
    this.setupEventListeners();
    this.renderHero();
    this.renderGallery();
    this.runLoader();
  },
  
  // Load data from localStorage
  loadData: function() {
    try {
      const savedBrand = localStorage.getItem(this.config.brandStorageKey);
      this.state.brandSettings = savedBrand ? 
        JSON.parse(savedBrand) : this.config.defaultBrand;
      
      const savedGallery = localStorage.getItem(this.config.galleryStorageKey);
      this.state.galleryData = savedGallery ? 
        JSON.parse(savedGallery) : this.defaultGallery;
    } catch (error) {
      console.error('Error loading data:', error);
      this.state.brandSettings = this.config.defaultBrand;
      this.state.galleryData = this.defaultGallery;
    }
  },
  
  // Setup event listeners
  setupEventListeners: function() {
    // Window resize handler
    window.addEventListener('resize', this.debounce(() => {
      ScrollTrigger.refresh();
    }, 250));
    
    // Custom cursor (only on desktop)
    if (window.innerWidth > 768) {
      this.setupCustomCursor();
    }
  },
  
  // Setup custom cursor
  setupCustomCursor: function() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      
      gsap.to(cursorOutline, {
        x: posX,
        y: posY,
        duration: 0.15,
        ease: "power2.out"
      });
      
      // Magnetic buttons
      const target = e.target.closest('[data-magnetic="true"]');
      if (target) {
        const rect = target.getBoundingClientRect();
        const x = (posX - (rect.left + rect.width / 2)) * 0.3;
        const y = (posY - (rect.top + rect.height / 2)) * 0.3;
        gsap.to(target, { x: x, y: y, duration: 0.3 });
      }
    });
    
    document.addEventListener('mouseout', (e) => {
      if (e.target.dataset?.magnetic === "true") {
        gsap.to(e.target, { x: 0, y: 0, duration: 0.3 });
      }
    });
  },
  
  // Debounce function for performance
  debounce: function(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  },
  
  // Render hero section
  renderHero: function() {
    const container = document.getElementById('stack-container');
    if (!container) return;

    container.innerHTML = this.heroData.map((item, i) => `
      <div class="hero-card absolute w-48 md:w-64 aspect-[3/4] bg-gray-200 rounded-sm overflow-hidden shadow-2xl border border-white/20"
           style="z-index: ${10 - i}; transform: translate(-50%, -50%) scale(0.5); opacity: 0;">
        <img src="${item.src}" class="w-full h-full object-cover" loading="lazy" alt="Hero image">
      </div>
    `).join('');
  },
  
  // Render gallery
  renderGallery: function(filter = 'all') {
    const cols = [
      document.getElementById('col-1'), 
      document.getElementById('col-2'), 
      document.getElementById('col-3')
    ];
    
    if (!cols[0]) return;

    cols.forEach(c => c.innerHTML = '');
    
    const filteredData = filter === 'all' ? 
      this.state.galleryData : 
      this.state.galleryData.filter(item => 
        item.cat.toLowerCase().includes(filter.toLowerCase()) || 
        item.title.toLowerCase().includes(filter.toLowerCase())
      );

    filteredData.forEach((item, index) => {
      const aspects = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-square'];
      const randomAspect = aspects[index % 3]; 

      const cardHTML = `
      <div class="relative group w-full mb-8 interactive-element" data-magnetic="false">
        <div class="${randomAspect} w-full overflow-hidden rounded-sm bg-brand-dark/10 relative">
          <img src="${this.getOptimizedUrl(item.src)}" 
               srcset="${this.getSrcSet(item.src)}" 
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
               class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
               loading="lazy" 
               alt="${item.title}"
               onload="this.parentElement.classList.remove('bg-brand-dark/10')">
          <div class="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
            <span class="text-brand-gold text-[10px] uppercase tracking-widest font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-500">${item.cat}</span>
            <h3 class="text-white font-display text-xl uppercase translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">${item.title}</h3>
          </div>
        </div>
      </div>`;
      cols[index % 3].innerHTML += cardHTML;
    });
    
    this.bindInteractives();
    ScrollTrigger.refresh();
  },
  
  // Get optimized image URL
  getOptimizedUrl: function(url, width = 800) {
    if (!url) return '';
    if (url.includes('http') && !url.includes('cloudinary')) return url;
    const transforms = `f_auto,q_auto,w_${width},c_limit`;
    return `https://res.cloudinary.com/${this.config.cloudName}/image/upload/${transforms}/${url}`;
  },
  
  // Get responsive srcset for images
  getSrcSet: function(publicId) {
    if (!publicId || publicId.includes('http')) return '';
    const sizes = [400, 800, 1200];
    return sizes.map(w => `${this.getOptimizedUrl(publicId, w)} ${w}w`).join(', ');
  },
  
  // Bind interactive elements
  bindInteractives: function() {
    document.querySelectorAll('.interactive-element').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  },
  
  // Initialize animations
  initAnimations: function() {
    if (!this.config.animationsEnabled) return;
    
    // Hero animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-track",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    const cards = document.querySelectorAll('.hero-card');
    cards.forEach((card, i) => {
      const data = this.heroData[i];
      
      gsap.set(card, { left: "50%", top: "50%", scale: 0.5, opacity: 0, rotation: 0 });

      timeline.to(card, {
        left: `${50 + data.x}%`, 
        top: `${50 + data.y}%`, 
        rotation: data.r,
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        duration: 1
      }, 0);
    });

    timeline.to("#brand-reveal", {
      scale: 1,
      opacity: 1,
      ease: "power1.out",
      duration: 0.8
    }, 0.2);

    timeline.to("#scroll-hint", { opacity: 0, duration: 0.2 }, 0);

    // Gallery parallax
    if (window.innerWidth > 768) {
      gsap.to("#col-2", {
        y: 150,
        ease: "none",
        scrollTrigger: {
          trigger: "#gallery-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(["#col-1", "#col-3"], {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "#gallery-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    // Navbar reveal
    ScrollTrigger.create({
      start: "top -100",
      end: 99999,
      onUpdate: (self) => {
        const nav = document.getElementById('navbar');
        if (self.direction === 1) {
          gsap.to(nav, { y: 0, opacity: 1, duration: 0.5 });
        } else if (self.direction === -1 && self.scrollY < 100) {
          gsap.to(nav, { y: 80, opacity: 0, duration: 0.5 });
        }
      }
    });
  },
  
  // Run loader animation
  runLoader: function() {
    const bar = document.getElementById('loader-bar');
    const text = document.getElementById('loader-text');
    const loader = document.getElementById('loader');

    gsap.to(bar, { width: "100%", duration: 1.5, ease: "power2.inOut" });
    gsap.to(text, { y: 0, duration: 1, ease: "power4.out", delay: 0.2 });

    gsap.to(loader, { 
      yPercent: -100, 
      duration: 1, 
      ease: "power4.inOut", 
      delay: 1.8,
      onComplete: () => {
        this.state.isLoading = false;
        this.initAnimations();
      }
    });
  },
  
  // Filter gallery
  filterGallery: function(category) {
    this.renderGallery(category);
  },
  
  // Default hero data
  heroData: [
    { src: "https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=600", x: -40, y: -40, r: -15, scale: 0.8 },
    { src: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=600", x: 40, y: -30, r: 10, scale: 0.9 },
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600", x: -30, y: 40, r: -5, scale: 1.1 },
    { src: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=600", x: 35, y: 35, r: 8, scale: 0.85 },
    { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600", x: 0, y: -50, r: 0, scale: 1.0 },
    { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600", x: -20, y: 10, r: -20, scale: 0.7 }
  ],
  
  // Default gallery data
  defaultGallery: [
    { src: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800", cat: "Campaign", title: "Nairobi Noir" },
    { src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800", cat: "Portrait", title: "The Elder" },
    { src: "https://images.unsplash.com/photo-1547471080-7541fbe112da?q=80&w=800", cat: "Landscape", title: "Mara Dawn" },
    { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800", cat: "Fashion", title: "Gold Dust" },
    { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800", cat: "Spatial", title: "Lines & Light" },
    { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800", cat: "Portrait", title: "Gaze" },
    { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800", cat: "Editorial", title: "Urban Soul" },
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800", cat: "Portrait", title: "Nostalgia" }
  ]
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  OYANGE.init();
});

// Make filter function globally accessible
window.filterSelection = (category) => OYANGE.filterGallery(category);
