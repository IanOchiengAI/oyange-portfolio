/**
 * OYANGE: CLIENT-SIDE CMS
 * Handles local storage for the static demo site.
 */

function toggleAdmin() {
    const panel = document.getElementById('admin-panel');
    if (!panel) return;

    // Use translation instead of class toggling for smoother animation
    if (panel.style.transform === 'translateY(0%)') {
        panel.style.transform = 'translateY(100%)'; // Close
    } else {
        // Simple Auth Check
        const pass = prompt("Enter Admin Access Code (Use 'admin'):");
        if (pass === "admin" || pass === "1234") {
            loadCurrentSettings();
            panel.style.transform = 'translateY(0%)'; // Open
        } else if (pass !== null) {
            alert("Access Denied.");
        }
    }
}

function loadCurrentSettings() {
    const nameInput = document.getElementById('admin-brand-name');
    const taglineInput = document.getElementById('admin-tagline');
    
    if (nameInput && taglineInput) {
        const currentSettings = JSON.parse(localStorage.getItem('oyange_brand')) || { name: "OYANGE", tagline: "Visual Archive" };
        nameInput.value = currentSettings.name;
        taglineInput.value = currentSettings.tagline;
    }
}

function saveBrandSettings() {
    const name = document.getElementById('admin-brand-name').value;
    const tagline = document.getElementById('admin-tagline').value;
    
    const settings = { name, tagline };
    localStorage.setItem('oyange_brand', JSON.stringify(settings));
    
    // Refresh page to see changes
    location.reload();
}

function addGalleryItem() {
    const src = document.getElementById('admin-img-url').value;
    const title = document.getElementById('admin-img-title').value;
    const cat = document.getElementById('admin-img-cat').value;
    const client = document.getElementById('admin-img-client').value;

    if(!src) { alert("Image URL is required."); return; }

    let currentGallery = JSON.parse(localStorage.getItem('oyange_gallery'));
    
    // If no gallery exists in storage, we can't push to null, so reload default first or create new array
    if (!currentGallery) {
        currentGallery = []; // Or grab defaultGallery from main.js if accessible
    }

    // Add to top of list
    currentGallery.unshift({ src, title, cat, client });
    localStorage.setItem('oyange_gallery', JSON.stringify(currentGallery));
    
    // Clear inputs
    document.getElementById('admin-img-url').value = "";
    document.getElementById('admin-img-title').value = "";
    
    location.reload();
}

function resetDemo() {
    if(confirm("Reset all content to original defaults?")) {
        localStorage.removeItem('oyange_gallery');
        localStorage.removeItem('oyange_brand');
        location.reload();
    }
}
