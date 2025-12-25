/**
 * OYANGE: VISUAL ENGINE (GSAP S-Tier Edition)
 * 
 * 📦 REQUIRED CDN (Add to HTML):
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
 */

// ============================================================
// 1. DATA CONFIG
// ============================================================

const heroData=[{src:"https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=800",pos:"left-[5%] top-[20%]",size:"w-48 md:w-60 aspect-[3/4]",z:"z-10",speedX:-3,speedY:-.5,rotate:-15,delay:2,filter:"grayscale-[0.5]"},{src:"https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=800",pos:"left-[2%] top-[60%]",size:"w-52 md:w-64 aspect-square",z:"z-20",speedX:-2.8,speedY:.8,rotate:-8,delay:.5,filter:"filter sepia-[0.3]"},{src:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800",pos:"left-[20%] top-[30%]",size:"w-52 md:w-64 aspect-square",z:"z-40",speedX:-1.8,speedY:-.5,rotate:-5,delay:0,filter:"filter brightness-90 grayscale-[0.2]"},{src:"https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800",pos:"left-[18%] top-[55%]",size:"w-60 md:w-80 aspect-[3/4]",z:"z-30",speedX:-2.2,speedY:.5,rotate:5,delay:1,filter:""},{src:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800",pos:"left-[30%] top-[45%]",size:"w-48 md:w-60 aspect-[3/4]",z:"z-20",speedX:-1.2,speedY:0,rotate:-2,delay:2,filter:"grayscale-[0.4]"},{src:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800",pos:"left-[50%] top-[40%]",size:"w-64 md:w-80 aspect-[4/5]",z:"z-50",speedX:-.8,speedY:-1.5,rotate:-2,delay:4,filter:"",style:"margin-left: -50%;"},{src:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800",pos:"left-[50%] top-[55%]",size:"w-56 md:w-72 aspect-[4/3]",z:"z-50",speedX:.8,speedY:1.5,rotate:0,delay:1.5,filter:"filter sepia-[0.1]",style:"margin-left: -50%;"},{src:"https://images.unsplash.com/photo-1547471080-7541fbe112da?q=80&w=800",pos:"right-[20%] top-[25%]",size:"w-52 md:w-64 aspect-square",z:"z-40",speedX:1.8,speedY:-.5,rotate:8,delay:3,filter:"filter sepia-[0.2]"},{src:"https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800",pos:"right-[18%] top-[55%]",size:"w-60 md:w-80 aspect-[3/4]",z:"z-30",speedX:2.2,speedY:.5,rotate:12,delay:.5,filter:"grayscale-[0.3]"},{src:"https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800",pos:"right-[30%] top-[40%]",size:"w-48 md:w-60 aspect-[3/4]",z:"z-20",speedX:1.2,speedY:0,rotate:3,delay:2.5,filter:""},{src:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",pos:"right-[5%] top-[65%]",size:"w-56 md:w-72 aspect-[4/3]",z:"z-10",speedX:3,speedY:1.2,rotate:20,delay:4,filter:""},{src:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800",pos:"right-[2%] top-[15%]",size:"w-48 md:w-60 aspect-[3/4]",z:"z-20",speedX:2.8,speedY:-.8,rotate:25,delay:1.5,filter:"grayscale-[0.6]"}];

const defaultGallery = [
    { src: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800", cat: "Campaign", title: "Nairobi Noir", client: "Vogue Africa" },
    { src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800", cat: "Portrait", title: "The Elder", client: "National Museum" },
    { src: "https://images.unsplash.com/photo-1547471080-7541fbe112da?q=80&w=800", cat: "Landscape", title: "Mara Dawn", client: "Conservation Int." },
    { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800", cat: "Fashion", title: "Gold Dust", client: "Editorial" },
    { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800", cat: "Spatial", title: "Lines & Light", client: "Architectural Digest" },
    { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800", cat: "Portrait", title: "Gaze", client: "Independent" },
    { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800", cat: "Editorial", title: "Urban Soul", client: "Street" },
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800", cat: "Portrait", title: "Nostalgia", client: "Private" }
];

// Load from LocalStorage OR use Default
let galleryData = JSON.parse(localStorage.getItem('oyange_gallery'));
if (!galleryData || galleryData.length === 0) {
    galleryData = defaultGallery;
}

// ============================================================
// 2. RENDER FUNCTIONS (PRESERVED)
// ============================================================

function renderHero() {
    const container = document.getElementById('stack-container');
    if (!container) return; 

    container.innerHTML = heroData.map(item => `
        <div class="hero-card-wrapper absolute ${item.pos} ${item.size} ${item.z} pointer-events-auto transition-transform will-change-transform"
             data-speed-x="${item.speedX}" data-speed-y="${item.speedY}" data-initial-rotate="${item.rotate}">
             <div class="hero-card-inner w-full h-full shadow-2xl rounded-sm overflow-hidden border border-white/20 interactive-element bg-gray-200" style="${item.style || ''}">
                <img src="${item.src}" class="w-full h-full object-cover ${item.filter}" loading="lazy">
             </div>
        </div>
    `).join('');
    bindInteractives();
}

function renderGallery(filter = 'all') {
    const cols = [document.getElementById('col-1'), document.getElementById('col-2'), document.getElementById('col-3')];
    if (!cols[0]) return;

    cols.forEach(c => c.innerHTML = '');
    
    const filteredData = filter === 'all' ? galleryData : galleryData.filter(item => 
        item.cat.toLowerCase().includes(filter.toLowerCase()) || 
        item.title.toLowerCase().includes(filter.toLowerCase())
    );

    filteredData.forEach((item, index) => {
        const aspects = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-square'];
        const randomAspect = aspects[index % 3]; 

        const cardHTML = `
        <div class="relative group w-full mb-8 interactive-element" data-magnetic="false">
            <div class="${randomAspect} w-full overflow-hidden rounded-sm bg-brand-dark/10 relative">
                <img src="${item.src}" 
                     class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                     loading="lazy"
                     onload="this.parentElement.classList.remove('bg-brand-dark/10')">
                
                <div class="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-8">
                    <span class="text-brand-gold text-[10px] uppercase tracking-widest font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">${item.cat}</span>
                    <h3 class="text-white font-display text-2xl uppercase mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">${item.title}</h3>
                </div>
            </div>
        </div>`;
        
        cols[index % 3].innerHTML += cardHTML;
    });
    
    bindInteractives();
}

function filterSelection(category) {
    renderGallery(category);
}

// ============================================================
// 3. INTERACTION PHYSICS (PRESERVED)
// ============================================================

const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');
let mouseX = 0, mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; 
    mouseY = e.clientY;
    
    if(cursorDot) { 
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }
    
    if(cursorOutline) { 
        cursorOutline.animate({
            left: `${mouseX}px`,
            top: `${mouseY}px`
        }, { duration: 500, fill: "forwards" });
    }
    
    const magneticTarget = e.target.closest('[data-magnetic="true"]');
    if(magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) * 0.3; 
        const y = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
        magneticTarget.style.transform = `translate(${x}px, ${y}px)`;
    }
});

document.addEventListener('mouseout', (e) => {
    if(e.target.dataset && e.target.dataset.magnetic === "true") {
        e.target.style.transform = 'translate(0px, 0px)';
    }
});

function bindInteractives() {
    document.querySelectorAll('.interactive-element').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

// ============================================================
// 4. GSAP ANIMATIONS (APPLE-LEVEL SMOOTHNESS)
// ============================================================

function initBrandReveal() {
    const brandReveal = document.getElementById('brand-reveal');
    if (!brandReveal) return;

    // Split text into characters
    const text = brandReveal.textContent.trim();
    brandReveal.innerHTML = '';

    text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(120px)';
        brandReveal.appendChild(span);
    });

    const chars = brandReveal.querySelectorAll('span');

    // Staggered reveal animation
    gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'power4.out',
        stagger: {
            amount: 0.6,
            from: 'start'
        },
        delay: 0.5
    });
}

function initHeroDispersalGSAP() {
    if (window.innerWidth <= 768) return;

    const wrappers = document.querySelectorAll('.hero-card-wrapper');
    if (!wrappers.length) return;

    // Create timeline with scrub for buttery smoothness
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#stack-container',
            start: 'top top',
            end: 'bottom top',
            scrub: 1, // 🔑 1-second lag = liquid smooth
            // markers: true // Uncomment for debugging
        }
    });

    wrappers.forEach((wrapper) => {
        const speedX = parseFloat(wrapper.dataset.speedX);
        const speedY = parseFloat(wrapper.dataset.speedY);
        const initialRotate = parseFloat(wrapper.dataset.initialRotate);

        // Amplify movement for dramatic dispersal
        tl.to(wrapper, {
            x: speedX * 150, // Increased multiplier for explosive effect
            y: speedY * 150,
            rotation: initialRotate + (speedX * 5), // Add dynamic rotation
            scale: 0.85,
            opacity: 0.6,
            ease: 'power2.out'
        }, 0); // All start at position 0 (simultaneous)
    });
}

function initVelocityGridGSAP() {
    if (window.innerWidth <= 768) return;

    const col1 = document.getElementById('col-1');
    const col2 = document.getElementById('col-2');
    const col3 = document.getElementById('col-3');

    if (!col1 || !col2 || !col3) return;

    // Column 2: Moves DOWN
    gsap.to(col2, {
        y: 150,
        ease: 'none',
        scrollTrigger: {
            trigger: '.gallery-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // Columns 1 & 3: Move UP (opposite direction)
    gsap.to([col1, col3], {
        y: -80,
        ease: 'none',
        scrollTrigger: {
            trigger: '.gallery-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

function initNavbarReveal() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Set initial state
    gsap.set(navbar, { 
        opacity: 0, 
        y: 40 
    });

    // Create reveal animation tied to scroll
    ScrollTrigger.create({
        start: 'top top',
        end: 99999,
        onUpdate: (self) => {
            const progress = self.progress;
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                gsap.to(navbar, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out'
                });
            } else {
                gsap.to(navbar, {
                    opacity: 0,
                    y: 40,
                    duration: 0.4,
                    ease: 'power2.in'
                });
            }
        }
    });
}

// ============================================================
// 5. INITIALIZATION
// ============================================================

function initGSAP() {
    // Register plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all GSAP animations
    initBrandReveal();
    initHeroDispersalGSAP();
    initVelocityGridGSAP();
    initNavbarReveal();

    // Refresh on resize (with debounce)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth <= 768) {
                ScrollTrigger.getAll().forEach(st => st.kill());
            } else {
                ScrollTrigger.refresh();
                // Re-init animations for desktop
                initHeroDispersalGSAP();
                initVelocityGridGSAP();
            }
        }, 250);
    });
}

// ============================================================
// 6. MASTER INIT
// ============================================================

window.addEventListener('load', () => {
    // Reset/Initialize localStorage
    if(!localStorage.getItem('oyange_gallery')) {
        localStorage.setItem('oyange_gallery', JSON.stringify(defaultGallery));
    }

    // Render content
    renderHero();
    renderGallery();
    
    // Loader fade out
    const loader = document.getElementById('loader');
    if(loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.8,
            delay: 1.5,
            onComplete: () => {
                loader.style.display = 'none';
            }
        });
    }

    // Initialize GSAP animations
    initGSAP();
});

// Expose global API for dynamic updates
window.OYANGE = {
    refresh: () => ScrollTrigger.refresh(),
    filterGallery: (cat) => filterSelection(cat)
};
