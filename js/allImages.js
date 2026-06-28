document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById('gallery-container');
    
    // Utilize the `images` array already populated by script.js
    images.forEach((src, index) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        // Give it a staggered wave effect like the memory wall
        card.style.animationDelay = `${(index % 12) * 0.05}s`; 
        
        const img = document.createElement('img');
        img.src = src;
        // Apply lazy loading so not all 66 load their giant native format concurrently
        img.loading = 'lazy';
        
        card.appendChild(img);
        galleryContainer.appendChild(card);
    });
});
