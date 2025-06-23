/**
 * Animates the hero section text on page load.
 */
function initHeroTextAnimation() {
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (!heroTitle || !heroSubtitle) return;

    // Split text into characters
    const titleChars = new SplitText(heroTitle, { type: 'chars' }).chars;
    const subtitleChars = new SplitText(heroSubtitle, { type: 'chars' }).chars;

    // Set initial states
    gsap.set([titleChars, subtitleChars], { 
        opacity: 0, 
        y: 20, 
        rotationX: -45,
        transformOrigin: 'bottom center' 
    });

    const tl = gsap.timeline({ delay: 1.2 }); // Delay to start after header animation

    tl.to(titleChars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power3.out'
    }).to(subtitleChars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power3.out'
    }, "-=0.6");
}

/**
 * Animates the section dividers on scroll.
 */
function initDividerAnimation() {
    const dividers = document.querySelectorAll('.section-divider');
    
    dividers.forEach(divider => {
        gsap.to(divider, {
            scrollTrigger: {
                trigger: divider,
                start: 'top bottom',
                end: 'top 30%',
                scrub: true,
                onUpdate: (self) => {
                    const scale = 0.5 + (self.progress * 2.5);
                    const opacity = 0.6 + (self.progress * 0.4);
                    gsap.set(divider, {
                        scaleX: scale,
                        opacity: opacity,
                        transformOrigin: 'center center'
                    });
                },
                onEnterBack: () => {
                    gsap.to(divider, {
                        scaleX: 0.5,
                        opacity: 0.6,
                        duration: 0.5
                    });
                }
            }
        });
    });
}

// Scroll Down Indicator Animation (Mobile Only)
document.addEventListener('DOMContentLoaded', function () {
    var indicator = document.getElementById('scrollIndicator');
    if (indicator && window.innerWidth <= 768) {
        gsap.to('.scroll-arrow', {
            y: 18,
            repeat: -1,
            yoyo: true,
            duration: 1.1,
            ease: 'power1.inOut',
        });
    }
});

// Scroll Animation Integration (adapted from provided script.js)
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const scrollContainer = document.getElementById('scroll-animation-container');
if (scrollContainer) {
    // Example: Add a bouncing scroll indicator (replace with more complex animation as needed)
    scrollContainer.innerHTML = `<div class="scroll-pointer" style="font-size:3rem;color:#ef233c;">☟</div>`;
    gsap.fromTo('.scroll-pointer', {
        y: 0
    }, {
        y: 24,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'power1.inOut'
    });
}

// Wait for fonts to load before running SplitText animations
if (document.fonts) {
    document.fonts.ready.then(() => {
        initHeroTextAnimation();
    });
} else {
    window.addEventListener('load', initHeroTextAnimation);
}

// Simple lazy loader for images with class 'lazy'
document.addEventListener('DOMContentLoaded', function () {
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});

// (Scroll animation initialization will be added here if needed) 