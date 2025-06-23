/**
 * Initializes the scroll-triggered animation for the Projects section.
 */
function initProjectsAnimation() {
    const section = document.querySelector('.projects-section');
    if (!section) return;

    // Reset initial states
    gsap.set('.projects-section .section-title, .project-card', { 
        y: 60, 
        opacity: 0,
        willChange: 'transform, opacity'
    });

    // Create a master timeline for the section
    const masterTl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 20%',
            toggleActions: 'play none none reset',
            onEnter: () => {
                masterTl.restart();
            }
        },
        defaults: { ease: 'power3.out' }
    });

    // Animate section title
    masterTl.fromTo('.projects-section .section-title', 
        { y: 60, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 1.2,
            ease: 'power3.out'
        },
        '>0.2'
    );

    // Animate project cards with stagger
    const cards = gsap.utils.toArray('.project-card');
    masterTl.fromTo(cards, 
        { y: 60, opacity: 0 },
        { 
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: {
                amount: 0.8,
                from: 'random'
            },
            ease: 'back.out(1.2)'
        },
        '-=0.8'
    );
} 