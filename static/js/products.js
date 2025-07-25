
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Custom cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
});

// Animated shapes in hero section
const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape, index) => {
    // Calculate base delay for original and duplicate shapes
    const baseDelay = index % 3 * 0.5;
    // Add extra delay for duplicate shapes (index 3-5)
    const extraDelay = index >= 3 ? 0.25 : 0;
    
    gsap.to(shape, {
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        rotation: 'random(-180, 180)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'none',
        delay: baseDelay + extraDelay
    });
});

// Parallax effect for hero section
gsap.to(".hero-section", {
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1
    },
    y: 200,
    scale: 1.1,
    ease: "none"
});


// New Background Effects
const heroSection = document.querySelector('.hero-section');

// 1. Add grain texture and gradient overlay
const grainOverlay = document.createElement('div');
grainOverlay.className = 'grain-overlay';
heroSection.appendChild(grainOverlay);


// 2. Floating particles with connecting lines
const particleContainer = document.createElement('canvas');
particleContainer.className = 'particle-network';
heroSection.insertBefore(particleContainer, heroSection.firstChild);

const ctx = particleContainer.getContext('2d');
let particles = [];

function initParticles() {
    particleContainer.width = window.innerWidth;
    particleContainer.height = window.innerHeight;
    
    for(let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * particleContainer.width,
            y: Math.random() * particleContainer.height,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1,
            radius: Math.random() * 2 + 1
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, particleContainer.width, particleContainer.height);
    
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if(particle.x < 0 || particle.x > particleContainer.width) particle.vx *= -1;
        if(particle.y < 0 || particle.y > particleContainer.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
        ctx.fill();
        
        particles.forEach(otherParticle => {
            const distance = Math.sqrt(
                Math.pow(particle.x - otherParticle.x, 2) +
                Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if(distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = `rgba(255, 215, 0, ${0.4 * (1 - distance/100)})`;
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(animateParticles);
}

// Initialize particles
initParticles();
animateParticles();

// Hero Content Layout Animations
const heroContent = document.querySelector('.container');

// Initial animations
gsap.from(["#heroTitle", "#heroSubtitle", "#heroCTA"], {
    opacity: 0,
    y: 50,
    scale: 0.9,
    duration: 1,
    stagger: 0.2,
    ease: "back.out(1.7)"
});

// 3D perspective tilt on mouse move
heroSection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPercentage = (clientX / innerWidth - 0.5) * 2;
    const yPercentage = (clientY / innerHeight - 0.5) * 2;
    
    gsap.to(heroContent, {
        duration: 0.5,
        rotateX: -yPercentage * 5,
        rotateY: xPercentage * 5,
        transformPerspective: 1000,
        ease: "power2.out"
    });
});
// Function to initialize particles for a specific container
function initParticlesForSection(container) {
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-network';
    container.insertBefore(canvas, container.firstChild);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function initParticles() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        particles = [];
        for(let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                radius: Math.random() * 2.5 + 1
            });
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if(particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if(particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
            ctx.fill();
            
            particles.forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) +
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if(distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 215, 0, ${0.2 * (1 - distance/150)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    initParticles();
    animate();
    
    // Handle resize
    window.addEventListener('resize', initParticles);
}

// Initialize animations for all sections
document.querySelectorAll('section').forEach((section, index) => {
    // Add particle effects
    initParticlesForSection(section);
    
    // Add hover effect for sections
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width - 0.5) * 2;
        const yPercent = (y / rect.height - 0.5) * 2;
        
        gsap.to(section.querySelector('.container'), {
            duration: 0.5,
            rotateX: -yPercent * 3,
            rotateY: xPercent * 3,
            transformPerspective: 1000,
            ease: "power2.out"
        });
    });
    
    // Add scroll animations
    gsap.from(section.children, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
});

// Add styles
const newStyles = `
        .custom-cursor {
        width: 20px;
        height: 20px;
        background: var(--color-gold);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        mix-blend-mode: difference;
        z-index: 9999;
        transform: translate(-50%, -50%);
    }

    .cursor-ripple {
        position: fixed;
        width: 50px;
        height: 50px;
        border: 2px solid var(--color-gold);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        animation: ripple 1s ease-out forwards;
    }

    

    /* Grain texture animation */
    .grain-overlay {
        position: absolute;
        inset: 0;
        z-index: 2;
        opacity: 0.25;
        pointer-events: none;
        background: url('data:image/png;base64,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');
        animation: grain 0.8s steps(1) infinite;
    }

    @keyframes grain {
        0%, 100% { transform: translate(0, 0); }
        10% { transform: translate(-5%, -5%); }
        20% { transform: translate(5%, 5%); }
        30% { transform: translate(-5%, 5%); }
        40% { transform: translate(5%, -5%); }
        50% { transform: translate(-5%, 0%); }
        60% { transform: translate(5%, 0%); }
        70% { transform: translate(0, 5%); }
        80% { transform: translate(0, -5%); }
        90% { transform: translate(-2%, 2%); }
    }

    /* Gradient overlay animation */
    .animate-gradient {
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
    }

    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }



    .background-elements-container {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
    }

    .background-element {
        position: absolute;
        border-radius: 50%;
        opacity: 0.1;
        filter: blur(50px);
        mix-blend-mode: screen;
    }

    /* Floating Gradient Blob 1 */
    .blob-1 {
        top: 10%;
        left: 15%;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, var(--color-gold), transparent);
        animation: floatBlob1 20s ease-in-out infinite;
    }

    /* Floating Gradient Blob 2 */
    .blob-2 {
        bottom: 15%;
        right: 20%;
        width: 250px;
        height: 250px;
        background: radial-gradient(circle, #FFD700, transparent);
        animation: floatBlob2 22s ease-in-out infinite;
    }

    /* Glowing Ring */
    .ring-1 {
        top: 40%;
        left: 50%;
        width: 200px;
        height: 200px;
        border: 2px solid var(--color-gold);
        border-radius: 50%;
        animation: pulseRing 6s infinite ease-in-out;
        transform: translate(-50%, -50%);
        opacity: 0.2;
        filter: none;
    }

    /* Animations */
    @keyframes floatBlob1 {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-40px) scale(1.05); }
    }

    @keyframes floatBlob2 {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(50px) scale(1.08); }
    }

    @keyframes pulseRing {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.05; }
    }
    :root {
        --color-gold: #FFD700;
    }
    .background-element {
        opacity: 0.3; /* For visibility check */
        filter: blur(20px); /* Less blur for test */
    }




    @keyframes ripple {
        0% {
            width: 0px;
            height: 0px;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    .hero-section {
        perspective: 1000px;
    }

    /* Grain texture animation */
    .grain-overlay {
        position: absolute;
        inset: 0;
        z-index: 2;
        opacity: 0.25;
        pointer-events: none;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9VQce3TVClFCQrSTfoiYkVJQBmpbq2L6iZavPnAPcoU0dSw0SUTqz/GtrGuXfbyyBniKykOWQWGqwwMA7QiYAxi+IlPdqo+hYHnUt5ZPfnsHJyNiDtnpJyayNBkF6cWoYGAMY92U2hXHF/C1M8uP/ZtYdiuj26UdAdQQSXQErwSOMzt/XWRWAz5GuSBIkwG1H3FabJ2OsUOUhGC6tK4EMtJO0ttC6IBD3kM0ve0tJwMdSfjZo+EEISaeTr9P3wYrGjXqyC1krcKdhMpxEnt5JetoulscpyzhXN5FRpuPHvbeQaKxFAEB6EN+cYN6xD7RYGpXpNndMmZgM5Dcs3YSNFDHUo2LGfZuukSWyUYirJAdYbF3MfqEKmjM+I2EfhA94iG3L7uKrR+GdWD73ydlIB+6hgref1QTlmgmbM3/LeX5GI1Ux1RWpgxpLuZ2+I+IjzZ8wqE4nilvQdkUdfhzI5QDWy+kw5Wgg2pGpeEVeCCA7b85BO3F9DzxB3cdqvBzWcmzbyMiqhzuYqtHRVG2y4x+KOlnyqla8AoWWpuBoYRxzXrfKuILl6SfiWCbjxoZJUaCBj1CjH7GIaDbc9kqBY3W/Rgjda1iqQcOJu2WW+76pZC9QG7M00dffe9hNnseupFL53r8F7YHSwJWUKP2q+k7RdsxyOB11n0xtOvnW4irMMFNV4H0uqwS5ExsmP9AxbDTc9JwgneAT5vTiUSm1E7BSflSt3bfa1tv8Di3R8n3Af7MNWzs49hmauE2wP+ttrq+AsWpFG2awvsuOqbipWHgtuvuaAE+A1Z/7gC9hesnr+7wqCwG8c5yAg3AL1fm8T9AZtp/bbJGwl1pNrE7RuOX7PeMRUERVaPpEs+yqeoSmuOlokqw49pgomjLeh7icHNlG19yjs6XXOMedYm5xH2YxpV2tc0Ro2jJfxC50ApuxGob7lMsxfTbeUv07TyYxpeLucEH1gNd4IKH2LAg5TdVhlCafZvpskfncCfx8pOhJzd76bJWeYFnFciwcYfubRc12Ip/ppIhA1/mSZ/RxjFDrJC5xifFjJpY2Xl5zXdguFqYyTR1zSp1Y9p+tktDYYSNflcxI0iyO4TPBdlRcpeqjK/piF5bklq77VSEaA+z8qmJTFzIWiitbnzR794USKBUaT0NTEsVjZqLaFVqJoPN9ODG70IPbfBHKK+/q/AWR0tJzYHRULOa4MP+W/HfGadZUbfw177G7j/OGbIs8TahLyynl4X4RinF793Oz+BU0saXtUHrVBFT/DnA3ctNPoGbs4hRIjTok8i+algT1lTHi4SxFvONKNrgQFAq2/gFnWMXgwffgYMJpiKYkmW3tTg3ZQ9Jq+f8XN+A5eeUKHWvJWJ2sgJ1Sop+wwhqFVijqWaJhwtD8MNlSBeWNNWTa5Z5kPZw5+LbVT99wqTdx29lMUH4OIG/D86ruKEauBjvH5xy6um/Sfj7ei6UUVk4AIl3MyD4MSSTOFgSwsH/QJWaQ5as7ZcmgBZkzjjU1UrQ74ci1gWBCSGHtuV1H2mhSnO3Wp/3fEV5a+4wz//6qy8JxjZsmxxy5+4w9CDNJY09T072iKG0EnOS0arEYgXqYnXcYHwjTtUNAcMelOd4xpkoqiTYICWFq0JSiPfPDQdnt+4/wuqcXY47QILbgAAAABJRU5ErkJggg==');
        animation: grain 0.8s steps(1) infinite;
    }

    @keyframes grain {
        0%, 100% { transform: translate(0, 0); }
        10% { transform: translate(-5%, -5%); }
        20% { transform: translate(5%, 5%); }
        30% { transform: translate(-5%, 5%); }
        40% { transform: translate(5%, -5%); }
        50% { transform: translate(-5%, 0%); }
        60% { transform: translate(5%, 0%); }
        70% { transform: translate(0, 5%); }
        80% { transform: translate(0, -5%); }
        90% { transform: translate(-2%, 2%); }
    }

    /* Gradient overlay animation */
    .animate-gradient {
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
    }

    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    /* Particle network canvas */
    .particle-network {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
        opacity: 0.8;
        animation: twinkle 4s infinite alternate;
    }
    /* Enhance gradient overlay visibility */
    .hero-bg .animate-gradient {
        opacity: 0.4; /* Increased visibility */
    }
    @keyframes twinkle {
    0% { opacity: 0.3; }
    50% { opacity: 0.6; }
    100% { opacity: 0.3; }
}
`;

const additionalStyles = document.createElement("style");
additionalStyles.textContent = newStyles;
document.head.appendChild(additionalStyles);
