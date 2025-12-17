/**
 * OYANGE: CLIENT-SIDE CMS
 */

function toggleAdmin() {
    const panel = document.getElementById('admin-panel');
    if (!panel) return;

    if (panel.classList.contains('closed')) {
        const pass = prompt("Enter Admin Access Code (Use 'admin'):");
        if (pass === "admin" || pass === "1234") {
            const nameInput = document.getElementById('admin-brand-name');
            const taglineInput = document.getElementById('admin-tagline');
            if (nameInput && taglineInput) {
                const currentSettings = JSON.parse(localStorage.getItem('oyange_brand')) || { name: "OYANGE", tagline: "Visual Archive" };
                nameInput.value = currentSettings.name;
                taglineInput.value = currentSettings.tagline;
            }
            panel.classList.remove('closed');
            panel.classList.add('open');
        } else if (pass !== null) {
            alert("Access Denied.");
        }
    } else {
        panel.classList.remove('open');
        panel.classList.add('closed');
    }
}

function saveBrandSettings() {
    const name = document.getElementById('admin-brand-name').value;
    const tagline = document.getElementById('admin-tagline').value;
    
    const settings = { name, tagline };
    localStorage.setItem('oyange_brand', JSON.stringify(settings));
    
    if (typeof applyBrandSettings === 'function') {
        applyBrandSettings();
    } else {
        location.reload(); 
    }
    
    alert("Brand settings updated successfully.");
}

function addGalleryItem() {
    const src = document.getElementById('admin-img-url').value;
    const title = document.getElementById('admin-img-title').value;
    const cat = document.getElementById('admin-img-cat').value;
    const client = document.getElementById('admin-img-client').value;

    if(!src) { alert("Image URL is required."); return; }

    let currentGallery = JSON.parse(localStorage.getItem('oyange_gallery'));
    if (!currentGallery) {
        currentGallery = [];
    }

    currentGallery.unshift({ src, title, cat, client });
    localStorage.setItem('oyange_gallery', JSON.stringify(currentGallery));
    
    document.getElementById('admin-img-url').value = "";
    document.getElementById('admin-img-title').value = "";
    
    location.reload();
    
    alert("Image added to gallery.");
}

function resetDemo() {
    if(confirm("Reset all changes to default? This cannot be undone.")) {
        localStorage.removeItem('oyange_gallery');
        localStorage.removeItem('oyange_brand');
        location.reload();
    }
}
