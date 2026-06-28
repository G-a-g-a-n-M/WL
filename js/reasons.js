document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById('envelope-wrapper');
    const actionBtn = document.getElementById('action-btn');
    const countDisplay = document.getElementById('count');
    const typewriterText = document.getElementById('typewriter-text');
    const cursor = document.getElementById('cursor');

    let state = 'closed'; // closed -> open -> read -> closed
    let seenIndices = JSON.parse(localStorage.getItem('love_seen_reasons')) || [];
    
    // Update count display on load
    countDisplay.textContent = seenIndices.length;

    actionBtn.addEventListener('click', handleAction);
    wrapper.addEventListener('click', () => {
        if (state === 'read') handleAction();
    });

    function handleAction() {
        if (state === 'closed') {
            openEnvelope();
        } else if (state === 'read') {
            closeEnvelope();
        }
    }

    function generateRandomReason() {
        if (seenIndices.length >= reasons.length) {
            // Reset if all seen
            seenIndices = [];
            localStorage.setItem('love_seen_reasons', JSON.stringify(seenIndices));
        }

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * reasons.length);
        } while (seenIndices.includes(randomIndex));

        seenIndices.push(randomIndex);
        localStorage.setItem('love_seen_reasons', JSON.stringify(seenIndices));
        countDisplay.textContent = seenIndices.length;

        return reasons[randomIndex];
    }

    function openEnvelope() {
        state = 'animating';
        actionBtn.style.opacity = '0';
        actionBtn.style.pointerEvents = 'none';

        const rawMessage = "I love you because...\n\n" + generateRandomReason();
        typewriterText.textContent = "";
        cursor.style.display = "inline";

        // Step 1: Lift
        wrapper.classList.add('lifted');
        
        setTimeout(() => {
            // Step 2: Open flap
            wrapper.classList.add('open');
            
            setTimeout(() => {
                // Step 3 & 4: Slide up and unfold
                wrapper.classList.add('unfolded');
                
                setTimeout(() => {
                    // Step 5 & 6: Typewriter effect
                    startTypewriter(rawMessage);
                }, 800);
            }, 600);
        }, 300);
    }

    function startTypewriter(text) {
        let i = 0;
        cursor.style.display = "inline-block";
        const speed = 50; 

        function typeWriter() {
            if (i < text.length) {
                typewriterText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                state = 'read';
                actionBtn.textContent = "Close Letter 💌";
                actionBtn.style.opacity = '1';
                actionBtn.style.pointerEvents = 'auto';
            }
        }
        typeWriter();
    }

    function closeEnvelope() {
        state = 'animating';
        actionBtn.style.opacity = '0';
        actionBtn.style.pointerEvents = 'none';
        
        // Step 8: Fold back
        wrapper.classList.remove('unfolded');
        
        setTimeout(() => {
            // Close flap
            wrapper.classList.remove('open');
            
            setTimeout(() => {
                // Drop down
                wrapper.classList.remove('lifted');
                typewriterText.textContent = "";
                
                setTimeout(() => {
                    state = 'closed';
                    actionBtn.textContent = "Open Next Letter 💌";
                    actionBtn.style.opacity = '1';
                    actionBtn.style.pointerEvents = 'auto';
                }, 300);
            }, 600);
        }, 800);
    }
});
