/**
 * Initializes the scroll-triggered animation for the About section.
 */
function initAboutScrollAnimation() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;
    
    const content = aboutSection.querySelector('.about-content');
    const aboutText = aboutSection.querySelector('.about-text');
    const isMobile = window.innerWidth <= 768;

    // Set initial states (hidden but taking space)
    gsap.set(content, {
        visibility: 'visible',
        opacity: 0,
        x: isMobile ? '50px' : '100px',
        y: 0
    });
    
    if (aboutText) {
        gsap.set(aboutText, {
            visibility: 'visible',
            opacity: 0,
            y: '20px'
        });
    }
    
    // Create timeline for the animation
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: aboutSection,
            start: 'top 50%',
            end: 'top 5%',
            toggleActions: 'play none none none',
            onEnterBack: () => {
                // Ensure content is visible when scrolling back up
                gsap.set([content, aboutText], { 
                    x: 0, 
                    y: 0, 
                    opacity: 1 
                });
            },
            // Improve performance
            fastScrollEnd: true,
            fastScrollEase: 'power3.inOut',
            fastScrollDuration: 0.4
        }
    });
    
    // Slide in content from right
    tl.to(content, {
        x: 0,
        opacity: 1,
        duration: isMobile ? 0.6 : 0.8,
        ease: 'power3.out'
    });
    
    // Fade in text with slight delay
    if (aboutText) {
        tl.to(aboutText, {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.5 : 0.7,
            ease: 'power3.out'
        }, isMobile ? '-=0.3' : '-=0.4');
    }
    
    // Handle window resize
    let resizeTimer;
    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Update initial position for mobile/desktop
            gsap.set(content, {
                x: window.innerWidth <= 768 ? '50px' : '100px'
            });
            ScrollTrigger.refresh();
        }, 250);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    ScrollTrigger.addEventListener('kill', () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimer);
    });
} 