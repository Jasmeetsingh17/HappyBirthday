// Cursor following effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Typing effect for greeting
const greetingText = "Happy Birthday Sis❤️! Thank you for being the person who fills our lives with laughter, chaos, and unforgettable memories. 💖";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 100);
    }
}

// Create floating elements
const floatingElements = ['💖', '✨', '🌸', '💫', '💕'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

function createConfettiPiece(x, y) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    const size = Math.random() * 10 + 6;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size * 0.35}px`;
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.backgroundColor = ['#ff4da6', '#ffd24d', '#4de4ff', '#ff7fe4', '#7bff9c'][Math.floor(Math.random() * 5)];
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(confetti);

    gsap.to(confetti, {
        x: (Math.random() - 0.5) * 320,
        y: -Math.random() * 420 - 120,
        rotation: Math.random() * 720,
        opacity: 0,
        duration: 1.4 + Math.random() * 0.6,
        ease: "power3.out",
        onComplete: () => confetti.remove()
    });
}

function burstConfetti(x, y, count = 40, spread = 320) {
    for (let i = 0; i < count; i++) {
        const offsetX = (Math.random() - 0.5) * spread;
        const offsetY = (Math.random() - 0.5) * (spread / 2);
        createConfettiPiece(x + offsetX, y + offsetY);
    }
}

function launchConfetti(x, y) {
    burstConfetti(x, y, 70, 420);
    setTimeout(() => burstConfetti(x, y, 40, 260), 150);
    setTimeout(() => burstConfetti(x, y, 30, 180), 300);
}

// Initialize animations
window.addEventListener('load', () => {
    // Title animation
    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "bounce.out"
    });

    // Button animation
    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -20,
        ease: "back.out"
    });

    // Start typing effect
    typeGreeting();

    // Create floating elements periodically
    setInterval(createFloating, 1000);

    // Soft confetti burst on page open
    const button = document.querySelector('.cta-button');
    if (button) {
        const rect = button.getBoundingClientRect();
        setTimeout(() => launchConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2), 600);
    }
});

// Hover effects
       // Hover effects
       document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.1,
                duration: 0.3
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3
            });
        });

        // Smooth page transition with confetti burst on click
        button.addEventListener('click', (event) => {
            const rect = button.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            launchConfetti(x, y);

            gsap.to(button, {
                scale: 1.2,
                duration: 0.15,
                yoyo: true,
                repeat: 1
            });

            gsap.to('body', {
                opacity: 0,
                duration: 1,
                delay: 1.3,
                onComplete: () => {
                    window.location.href = 'cause.html';
                }
            });
        });
    });