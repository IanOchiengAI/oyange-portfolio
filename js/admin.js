/**
 * OYANGE: Admin Module
 * Handles administrative functions for the portfolio
 */

const Admin = {
  // Toggle admin panel
  togglePanel: function() {
    const panel = document.getElementById('admin-panel');
    if (!panel) return;

    if (panel.style.transform === 'translateY(0%)') {
      panel.style.transform = 'translateY(100%)'; // Close
    } else {
      this.authenticate();
    }
  },
  
  // Authenticate admin
  authenticate: function() {
    const pass = prompt("Enter Admin Access Code:");
    
    if (pass === null) return; // User cancelled
    
    // Simple hash for better security (still not production-ready)
    const hashedPass = this.simpleHash(pass);
    const correctHash = this.simpleHash(OYANGE.config.adminPassword);
    
    if (hashedPass === correctHash) {
      OYANGE.state.isAuthenticated = true;
      this.loadCurrentSettings();
      this.showAdminPanel();
    } else {
      this.showNotification("Access Denied. Please try again.", "error");
    }
  },
  
  // Show admin panel
  showAdminPanel: function() {
    const panel = document.getElementById('admin-panel');
    panel.style.transform = 'translateY(0%)';
  },
  
  // Simple hash function (not for production, use bcrypt in real apps)
  simpleHash: function(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  },
  
  // Load current settings
  loadCurrentSettings: function() {
    const nameInput = document.getElementById('admin-brand-name');
    const taglineInput = document.getElementById('admin-tagline');
    
    if (nameInput && taglineInput) {
      nameInput.value = OYANGE.state.brandSettings.name;
      taglineInput.value = OYANGE.state.brandSettings.tagline;
    }
  },
  
  // Save brand settings
  saveBrandSettings: function() {
    if (!OYANGE.state.isAuthenticated) {
      this.showNotification("Authentication required", "error");
      return;
    }
    
    const nameInput = document.getElementById('admin-brand-name');
    const taglineInput = document.getElementById('admin-tagline');
    
    if (!nameInput || !taglineInput) {
      this.showNotification("Form elements not found", "error");
      return;
    }
    
    const settings = { 
      name: nameInput.value.trim(), 
      tagline: taglineInput.value.trim() 
    };
    
    try {
      localStorage.setItem(OYANGE.config.brandStorageKey, JSON.stringify(settings));
      OYANGE.state.brandSettings = settings;
      this.showNotification("Settings saved successfully", "success");
      this.updateBrandElements(settings);
    } catch (error) {
      console.error('Error saving settings:', error);
      this.showNotification("Error saving settings", "error");
    }
  },
  
  // Update brand elements on the page
  updateBrandElements: function(settings) {
    const brandElements = document.querySelectorAll('.brand-name');
    brandElements.forEach(el => {
      el.textContent = settings.name;
    });
    
    const taglineElements = document.querySelectorAll('.brand-tagline');
    taglineElements.forEach(el => {
      el.textContent = settings.tagline;
    });
  },
  
  // Add gallery item
  addGalleryItem: function() {
    if (!OYANGE.state.isAuthenticated) {
      this.showNotification("Authentication required", "error");
      return;
    }
    
    const srcInput = document.getElementById('admin-img-url');
    const titleInput = document.getElementById('admin-img-title');
    const catInput = document.getElementById('admin-img-cat');
    const clientInput = document.getElementById('admin-img-client');
    
    if (!srcInput || !titleInput || !catInput) {
      this.showNotification("Form elements not found", "error");
      return;
    }
    
    const src = srcInput.value.trim();
    const title = titleInput.value.trim();
    const cat = catInput.value.trim();
    const client = clientInput ? clientInput.value.trim() : '';
    
    if (!src) {
      this.showNotification("Image URL is required", "error");
      return;
    }
    
    try {
      const newItem = { src, title, cat, client };
      OYANGE.state.galleryData.unshift(newItem);
      
      localStorage.setItem(
        OYANGE.config.galleryStorageKey, 
        JSON.stringify(OYANGE.state.galleryData)
      );
      
      // Clear inputs
      srcInput.value = "";
      titleInput.value = "";
      if (clientInput) clientInput.value = "";
      
      this.showNotification("Image added successfully", "success");
      
      // Refresh gallery without page reload
      OYANGE.renderGallery();
    } catch (error) {
      console.error('Error adding gallery item:', error);
      this.showNotification("Error adding image", "error");
    }
  },
  
  // Reset demo
  resetDemo: function() {
    if (!OYANGE.state.isAuthenticated) {
      this.showNotification("Authentication required", "error");
      return;
    }
    
    if (!confirm("Reset all content to original defaults? This cannot be undone.")) {
      return;
    }
    
    try {
      localStorage.removeItem(OYANGE.config.galleryStorageKey);
      localStorage.removeItem(OYANGE.config.brandStorageKey);
      
      OYANGE.state.galleryData = OYANGE.defaultGallery;
      OYANGE.state.brandSettings = OYANGE.config.defaultBrand;
      
      this.showNotification("Content reset successfully", "success");
      
      // Update UI without reload
      this.updateBrandElements(OYANGE.state.brandSettings);
      OYANGE.renderGallery();
    } catch (error) {
      console.error('Error resetting demo:', error);
      this.showNotification("Error resetting content", "error");
    }
  },
  
  // Show notification
  showNotification: function(message, type = 'info') {
    // Remove existing notifications
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
      existingNotif.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 px-6 py-3 rounded-md shadow-lg z-50 transform transition-all duration-300 translate-x-full`;
    
    // Style based on type
    if (type === 'success') {
      notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
      notification.classList.add('bg-red-500', 'text-white');
    } else {
      notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
};

// Make admin functions globally accessible
window.toggleAdmin = () => Admin.togglePanel();
window.saveBrandSettings = () => Admin.saveBrandSettings();
window.addGalleryItem = () => Admin.addGalleryItem();
window.resetDemo = () => Admin.resetDemo();
