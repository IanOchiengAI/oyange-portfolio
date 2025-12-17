/**
 * OYANGE PROTOCOL: CLOUDINARY OPTIMIZER
 */

const CLOUD_NAME = 'demo'; // Replace 'demo' with your real cloud name when ready

function getOptimizedUrl(url, width = 800) {
    if (!url) return '';
    if (url.includes('http') && !url.includes('cloudinary')) return url;
    const transforms = `f_auto,q_auto,w_${width},c_limit`;
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${url}`;
}

function getSrcSet(publicId) {
    if (!publicId || publicId.includes('http')) return '';
    const sizes = [400, 800, 1200];
    return sizes.map(w => `${getOptimizedUrl(publicId, w)} ${w}w`).join(', ');
}
