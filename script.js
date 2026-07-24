// ==========================================
// SECTION SWITCHING LOGIC (NAVIGATION)
// ==========================================
function switchSection(targetId) {
    // Find targets
    const targetSection = document.getElementById(targetId);
    const targetNavItem = document.querySelector(`.nav-item[data-target="${targetId}"]`);
    
    if (!targetSection) return;

    // Remove active state from all sections and nav items
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Activate selected section
    targetSection.classList.add('active');
    
    // Activate selected nav item (if exists)
    if (targetNavItem) {
        targetNavItem.classList.add('active');
    }
    
    // Smooth scroll to top of content area on mobile
    if (window.innerWidth <= 768) {
        document.querySelector('.content-area').scrollIntoView({ behavior: 'smooth' });
    }
}

// Bind navigation clicks
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            switchSection(targetId);
        });
    });
    
    // Initialize Typewriter Effect
    initTypewriter();
});


// ==========================================
// TYPING EFFECT LOGIC
// ==========================================
const words = ["Vibe Coder", "UI Designer", "Web Creator", "Aesthetics Lover"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function initTypewriter() {
    const targetSpan = document.querySelector('.typing-text');
    if (!targetSpan) return;

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Remove character
        targetSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add character
        targetSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Determine typing speed
    let typingSpeed = isDeleting ? 40 : 100;

    // Word state changes
    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at full word
        typingSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Move to next word
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 300;
    }

    typeTimeout = setTimeout(initTypewriter, typingSpeed);
}
