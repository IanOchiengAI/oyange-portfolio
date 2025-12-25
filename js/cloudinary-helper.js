/**
 * OYANGE: Cloudinary Image Optimization
 * Handles image optimization through Cloudinary
 */

const Cloudinary = {
  // Get optimized image URL
  getOptimizedUrl: function(url, width = 800, height = null, crop = 'limit') {
    if (!url) return '';
    
    // Return as-is if not a Cloudinary image
    if (url.includes('http') && !url.includes('cloudinary')) {
      return url;
    }
    
    // Build transformation string
    let transforms = `f_auto,q_auto,w_${width}`;
    
    if (height) {
      transforms += `,h_${height}`;
    }
    
    transforms += `,c_${crop}`;
    
    return `https://res.cloudinary.com/${OYANGE.config.cloudName}/image/upload/${transforms}/${url}`;
  },
  
  // Get responsive srcset for images
  getSrcSet: function(publicId, widths = [400, 800, 1200, 1600]) {
    if (!publicId || publicId.includes('http')) return '';
    
    return widths.map(width => 
      `${this.getOptimizedUrl(publicId, width)} ${width}w`
    ).join(', ');
  },
  
  // Get placeholder image
  getPlaceholder: function(width = 400, height = 300) {
    return `https://res.cloudinary.com/${OYANGE.config.cloudName}/image/upload/w_${width},h_${height},c_fill,g_auto:subject,f_auto,q_auto/placeholder.jpg`;
  }
};

// Make functions globally accessible
window.getOptimizedUrl = (url, width, height, crop) => 
  Cloudinary.getOptimizedUrl(url, width, height, crop);

window.getSrcSet = (publicId, widths) => 
  Cloudinary.getSrcSet(publicId, widths);
