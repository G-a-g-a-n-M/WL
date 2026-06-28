document.addEventListener("DOMContentLoaded", () => {
    const wallContainer = document.getElementById('wall-container');
    
    reasons.forEach((reason, index) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        // Stagger the fade-in animation by a fraction of a second based on column basically
        card.style.animationDelay = `${(index % 15) * 0.05}s`; 
        
        let titleText = `❤️ Reason ${index + 1}`;
        let bodyText = reason;
        
        const splitIndex = reason.indexOf(':');
        if (splitIndex !== -1 && splitIndex < 15) {
            titleText = `❤️ ` + reason.substring(0, splitIndex).trim();
            bodyText = reason.substring(splitIndex + 1).trim();
        }
        
        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = titleText;
        
        const text = document.createElement('p');
        text.textContent = bodyText;
        
        card.appendChild(title);
        card.appendChild(text);
        
        wallContainer.appendChild(card);
    });
});
