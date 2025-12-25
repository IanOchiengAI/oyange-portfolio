/**
 * OYANGE: GSAP VISUAL ENGINE (Refined for "S-Tier" Feel)
 */

gsap.registerPlugin(ScrollTrigger);

// 1. DATA CONFIG (The Content)
const heroData = [
    { src: "https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=600", x: -40, y: -40, r: -15, scale: 0.8 },
    { src: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=600", x: 40, y: -30, r: 10, scale: 0.9 },
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600", x: -30, y: 40, r: -5, scale: 1.1 },
    { src: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=600", x: 35, y: 35, r: 8, scale: 0.85 },
    { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600", x: 0, y: -50, r: 0, scale: 1.0 },
    { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600", x: -20, y: 10, r: -20, scale: 0.7 }
];

const defaultGallery = [
    { src: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800", cat: "Campaign", title: "Nairobi Noir" },
    { src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800", cat: "Portrait", title: "The Elder" },
    { src: "https://images.unsplash.com/photo-1547471080-7541fbe112da?q=80&w=800", cat: "Landscape", title: "Mara Dawn" },
    { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800", cat: "Fashion", title: "Gold Dust" },
    { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800", cat: "Spatial", title: "Lines & Light" },
    { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800", cat: "Portrait", title: "Gaze" },
    { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800", cat: "Editorial", title: "Urban Soul" },
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800", cat: "Portrait", title: "Nostalgia" }
];

let galleryData = JSON.parse(localStorage.getItem('oyange_gallery')) || defaultGallery;

// 2. RENDER FUNCTIONS
function renderHero() {
    const container = document.getElementById('stack-container');
    if (!container) return;

    container.innerHTML = heroData.map((item, i) => `
        <div class="hero-card absolute w-48 md:w-64 aspect-[3/4] bg-gray-200 rounded-sm overflow-hidden shadow-2xl border border-white/20"
             style="z-index: ${10 - i}; transform: translate(-50%, -50%) scale(0.5); opacity: 0;">
            <img src="${item.src}" class="w-full h-full object-cover" loading="lazy">
        </div>
    `).join('');
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
                <img src="${item.src}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" onload="this.parentElement.classList.remove('bg-brand-dark/10')">
                <div class="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span class="text-brand-gold text-[10px] uppercase tracking-widest font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-500">${item.cat}</span>
                    <h3 class="text-white font-display text-xl uppercase translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">${item.title}</h3>
                </div>
            </div>
        </div>`;
        cols[index % 3].innerHTML += cardHTML;
    });
    
    // Re-bind hover effects after render
    bindInteractives();
    
    // Refresh ScrollTrigger for new height
    ScrollTrigger.refresh();
}

function filterSelection(category) {
    renderGallery(category);
}

// 3. GSAP ANIMATIONS (The "Anti-Gravity" Logic)
function initAnimations() {
    
    // A. HERO EXPLOSION
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero-track",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5, // 1.5s lag for fluid "underwater" feel
        }
    });

    // 1. Cards Explode Outwards
    const cards = document.querySelectorAll('.hero-card');
    cards.forEach((card, i) => {
        const data = heroData[i];
        
        // Initial set (Center stack)
        gsap.set(card, { left: "50%", top: "50%", scale: 0.5, opacity: 0, rotation: 0 });

        // Animation: Explode to specific positions
        timeline.to(card, {
            left: `${50 + data.x}%`, 
            top: `${50 + data.y}%`, 
            rotation: data.r,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            duration: 1
        }, 0); // All start at time 0
    });

    // 2. Brand Reveal (Zooms in and Fades in behind cards)
    timeline.to("#brand-reveal", {
        scale: 1,
        opacity: 1,
        ease: "power1.out",
        duration: 0.8
    }, 0.2);

    // 3. Scroll Hint (Fades out)
    timeline.to("#scroll-hint", { opacity: 0, duration: 0.2 }, 0);


    // B. VELOCITY GRID PARALLAX
    if (window.innerWidth > 768) {
        gsap.to("#col-2", {
            y: 150, // Middle column moves DOWN (Lag)
            ease: "none",
            scrollTrigger: {
                trigger: "#gallery-container",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        gsap.to(["#col-1", "#col-3"], {
            y: -50, // Outer columns move UP (Fast)
            ease: "none",
            scrollTrigger: {
                trigger: "#gallery-container",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    }

    // C. NAVBAR REVEAL
    ScrollTrigger.create({
        start: "top -100",
        end: 99999,
        onUpdate: (self) => {
            const nav = document.getElementById('navbar');
            if (self.direction === 1) { // Scrolling Down
                gsap.to(nav, { y: 0, opacity: 1, duration: 0.5 });
            } else if (self.direction === -1 && self.scrollY < 100) { // Top
                gsap.to(nav, { y: 80, opacity: 0, duration: 0.5 });
            }
        }
    });
}

// 4. LOADING SEQUENCE
function runLoader() {
    const bar = document.getElementById('loader-bar');
    const text = document.getElementById('loader-text');
    const loader = document.getElementById('loader');

    // 1. Animate Bar
    gsap.to(bar, { width: "100%", duration: 1.5, ease: "power2.inOut" });
    
    // 2. Reveal Text
    gsap.to(text, { y: 0, duration: 1, ease: "power4.out", delay: 0.2 });

    // 3. Exit Loader
    gsap.to(loader, { 
        yPercent: -100, 
        duration: 1, 
        ease: "power4.inOut", 
        delay: 1.8,
        onComplete: () => {
            // Start animations ONLY after loader is gone
            initAnimations();
        }
    });
}

// 5. CURSOR PHYSICS (Raw JS is faster for cursor than GSAP)
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if(cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    }

    // GSAP for smooth follower delay
    if(cursorOutline) {
        gsap.to(cursorOutline, {
            x: posX,
            y: posY,
            duration: 0.15,
            ease: "power2.out"
        });
    }

    // Magnetic Buttons
    const target = e.target.closest('[data-magnetic="true"]');
    if(target) {
        const rect = target.getBoundingClientRect();
        const x = (posX - (rect.left + rect.width / 2)) * 0.3;
        const y = (posY - (rect.top + rect.height / 2)) * 0.3;
        gsap.to(target, { x: x, y: y, duration: 0.3 });
    }
});

document.addEventListener('mouseout', (e) => {
    if(e.target.dataset?.magnetic === "true") {
        gsap.to(e.target, { x: 0, y: 0, duration: 0.3 });
    }
});

function bindInteractives() {
    document.querySelectorAll('.interactive-element').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

// 6. INITIALIZE
window.addEventListener('load', () => {
    renderHero();
    renderGallery();
    runLoader();
});
