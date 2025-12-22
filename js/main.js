/**
 * OYANGE: VISUAL ENGINE (Vanilla JS Port)
 */

// 1. DATA CONFIG
const heroData=[{src:"https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=800",pos:"left-[5%] top-[20%]",size:"w-48 md:w-60 aspect-[3/4]",z:"z-10",speedX:-3,speedY:-.5,rotate:-15,delay:2,filter:"grayscale-[0.5]"},{src:"https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=800",pos:"left-[2%] top-[60%]",size:"w-52 md:w-64 aspect-square",z:"z-20",speedX:-2.8,speedY:.8,rotate:-8,delay:.5,filter:"filter sepia-[0.3]"},{src:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800",pos:"left-[20%] top-[30%]",size:"w-52 md:w-64 aspect-square",z:"z-40",speedX:-1.8,speedY:-.5,rotate:-5,delay:0,filter:"filter brightness-90 grayscale-[0.2]"},{src:"https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800",pos:"left-[18%] top-[55%]",size:"w-60 md:w-80 aspect-[3/4]",z:"z-30",speedX:-2.2,speedY:.5,rotate:5,delay:1,filter:""},{src:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800",pos:"left-[30%] top-[45%]",size:"w-48 md:w-60 aspect-[3/4]",z:"z-20",speedX:-1.2,speedY:0,rotate:-2,delay:2,filter:"grayscale-[0.4]"},{src:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800",pos:"left-[50%] top-[40%]",size:"w-64 md:w-80 aspect-[4/5]",z:"z-50",speedX:-.8,speedY:-1.5,rotate:-2,delay:4,filter:"",style:"margin-left: -50%;"},{src:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800",pos:"left-[50%] top-[55%]",size:"w-56 md:w-72 aspect-[4/3]",z:"z-50",speedX:.8,speedY:1.5,rotate:0,delay:1.5,filter:"filter sepia-[0.1]",style:"margin-left: -50%;"},{src:"https://images.unsplash.com/photo-1547471080-7541fbe112da?q=80&w=800",pos:"right-[20%] top-[25%]",size:"w-52 md:w-64 aspect-square",z:"z-40",speedX:1.8,speedY:-.5,rotate:8,delay:3,filter:"filter sepia-[0.2]"},{src:"https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800",pos:"right-[18%] top-[55%]",size:"w-60 md:w-80 aspect-[3/4]",z:"z-30",speedX:2.2,speedY:.5,rotate:12,delay:.5,filter:"grayscale-[0.3]"},{src:"https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800",pos:"right-[30%] top-[40%]",size:"w-48 md:w-60 aspect-[3/4]",z:"z-20",speedX:1.2,speedY:0,rotate:3,delay:2.5,filter:""},{src:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",pos:"right-[5%] top-[65%]",size:"w-56 md:w-72 aspect-[4/3]",z:"z-10",speedX:3,speedY:1.2,rotate:20,delay:4,filter:""},{src:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800",pos:"right-[2%] top-[15%]",size:"w-48 md:w-60 aspect-[3/4]",z:"z-20",speedX:2.8,speedY:-.8,rotate:25,delay:1.5,filter:"grayscale-[0.6]"}];

const defaultGallery = [
    { src: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800", cat: "Campaign", title: "Nairobi Noir", client: "Vogue Africa" },
    { src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800", cat: "Portrait", title: "The Elder", client: "National Museum" },
    { src: "https://images.unsplash.com/photo-1547471080-7541fbe112da?q=80&w=800", cat: "Landscape", title: "Mara Dawn", client: "Conservation Int." },
    { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800", cat: "Fashion", title: "Gold Dust", client: "Editorial" },
    { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800", cat: "Spatial", title: "Lines & Light", client: "Architectural Digest" },
    { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800", cat: "Portrait", title: "Gaze", client: "Independent" }
];

let galleryData = JSON.parse(localStorage.getItem('oyange_gallery')) || defaultGallery;

// 2. RENDER FUNCTIONS
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
    
    // Filter Data
    const filteredData = filter === 'all' ? galleryData : galleryData.filter(item => 
        item.cat.toLowerCase().includes(filter.toLowerCase()) || 
        item.title.toLowerCase().includes(filter.toLowerCase())
    );

    filteredData.forEach((item, index) => {
        const cardHTML = `
        <div class="relative group overflow-hidden bg-brand-dark/5 rounded-sm interactive-element block transition-all duration-500 hover:z-50 hover:shadow-2xl hover:scale-[1.02] mb-8 w-full" data-magnetic="false">
            <img src="${item.src}" class="block w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-105" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-8">
                <span class="text-brand-gold text-[10px] uppercase tracking-widest font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">${item.cat}</span>
                <h3 class="text-white font-display text-2xl uppercase mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">${item.title}</h3>
            </div>
        </div>`;
        cols[index % 3].innerHTML += cardHTML;
    });
    bindInteractives();
}

function filterSelection(category) {
    renderGallery(category);
}

// 3. INTERACTION PHYSICS
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');
let mouseX = 0, mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; 
    mouseY = e.clientY;
    
    if(cursorDot) { 
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`; 
    }
    
    if(cursorOutline) { 
        // Slight delay for fluid feel
        cursorOutline.animate({
            transform: `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
        }, { duration: 500, fill: "forwards" });
    }
    
    // Magnetic Logic
    const magneticTarget = e.target.closest('[data-magnetic="true"]');
    if(magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) * 0.3; // Strength 0.3
        const y = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
        magneticTarget.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// Reset Magnetic on Mouse Leave
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

// 4. SCROLL ANIMATION LOOP
const brandReveal = document.getElementById('brand-reveal');
const navbar = document.getElementById('navbar');
let currentScroll = 0, targetScroll = 0;

window.addEventListener('scroll', () => { targetScroll = window.scrollY; });

function animate() {
    // Lerp for smooth scroll values
    currentScroll += (targetScroll - currentScroll) * 0.08;
    
    // HERO DISPERSAL
    const progress = Math.min(currentScroll / (window.innerHeight * 1.5), 1);
    const wrappers = document.querySelectorAll('.hero-card-wrapper');
    
    if (wrappers.length > 0 && progress < 1) {
        wrappers.forEach(wrapper => {
            const speedX = parseFloat(wrapper.dataset.speedX);
            const speedY = parseFloat(wrapper.dataset.speedY);
            const scrollX = speedX * currentScroll * 0.8;
            const scrollY = speedY * currentScroll * 0.8;
            wrapper.style.transform = `translate3d(${scrollX}px, ${scrollY}px, 0) rotate(${wrapper.dataset.initialRotate}deg)`;
            wrapper.style.opacity = Math.max(0, 1 - (progress * 1.5));
        });
    }

    // BRAND REVEAL
    if (brandReveal) {
        const opacity = 0.2 + (progress * 3);
        brandReveal.style.opacity = Math.min(opacity, 1);
        brandReveal.style.transform = `scale(${0.9 + (Math.min(opacity, 1) * 0.1)})`;
    }

    // NAV REVEAL
    if (navbar) {
        if (targetScroll > 100) {
            navbar.classList.remove('opacity-0', 'translate-y-10');
        } else {
            navbar.classList.add('opacity-0', 'translate-y-10');
        }
    }

    // VELOCITY GRID PARALLAX
    const col2 = document.getElementById('col-2');
    const col3 = document.getElementById('col-3');
    if(col2) col2.style.transform = `translateY(${currentScroll * 0.05}px)`;
    if(col3) col3.style.transform = `translateY(-${currentScroll * 0.05}px)`;

    requestAnimationFrame(animate);
}

// 5. INIT
window.addEventListener('load', () => {
    renderHero();
    renderGallery();
    const loader = document.getElementById('loader');
    if(loader) {
        setTimeout(() => { loader.style.opacity = '0'; setTimeout(() => loader.style.display = 'none', 800); }, 1500);
    }
    animate();
});
