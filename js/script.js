const images = Array.from({length: 66}, (_, i) => `images/${i + 1}.jpg`);

document.addEventListener("DOMContentLoaded", () => {
    initSlideshow();
    initHearts();
});

function initSlideshow() {
    const container = document.createElement('div');
    container.className = 'bg-slideshow';
    document.body.prepend(container);
    
    // Create 2 slots for left and right
    const slots = [1, 2].map(() => {
        const img = document.createElement('img');
        container.appendChild(img);
        return img;
    });

    function updateImages() {
        // Fade out existing images
        slots.forEach(img => { img.classList.remove('active'); });
        
        setTimeout(() => {
            // Assign 4 new random images and fade in
            slots.forEach(img => {
                const randomImg = images[Math.floor(Math.random() * images.length)];
                img.src = randomImg;
                img.classList.add('active');
            });
        }, 1500);
    }
    
    updateImages();
    // Swap images every 5 seconds
    setInterval(updateImages, 5000);
}

function initHearts() {
    const container = document.createElement('div');
    container.className = 'heart-container';
    document.body.appendChild(container);

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        const size = Math.random() * 15 + 10;
        heart.style.setProperty('--size', size + 'px');
        heart.style.left = Math.random() * 100 + 'vw';
        
        const duration = Math.random() * 5 + 5;
        heart.style.animationDuration = duration + 's';
        
        const opacity = Math.random() * 0.4 + 0.3;
        heart.style.opacity = opacity;
        
        container.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000);
    }, 800);
}
