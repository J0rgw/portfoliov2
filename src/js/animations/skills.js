/**
 * Initializes the scroll-triggered animations for all Skills sections.
 */
function initSkillsAnimation() {
    const skillsSections = document.querySelectorAll('.skills-section');
    if (!skillsSections.length) return;

    skillsSections.forEach((section) => {
        const title = section.querySelector('.section-title, .category-title');
        const cards = section.querySelectorAll('.skill-card');

        // Animate the title
        if (title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 90%',
                    toggleActions: 'play none none reset'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            });
        }

        // Animate each card and its progress bar
        cards.forEach((card) => {
            const progressBar = card.querySelector('.skill-progress');
            const icon = card.querySelector('.skill-icon');

            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reset',
                    onEnter: () => {
                        if (progressBar) {
                            gsap.to(progressBar, {
                                width: progressBar.dataset.level + '%',
                                duration: 1.5,
                                ease: 'power3.out',
                                delay: 0.2
                            });
                        }
                    },
                    onLeaveBack: () => {
                         if (progressBar) {
                            gsap.to(progressBar, {
                                width: '0%',
                                duration: 0.5,
                                ease: 'power3.in'
                            });
                        }
                    }
                },
                opacity: 0,
                y: 40,
                scale: 0.95,
                duration: 0.6,
                ease: 'power3.out'
            });

            if (icon) {
                gsap.from(icon, {
                     scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                    },
                    y: -3,
                    duration: 2,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                });
            }
        });
    });
}

document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--glow-x', `${x}px`);
        card.style.setProperty('--glow-y', `${y}px`);
    });
    card.addEventListener('mouseleave', function() {
        card.style.setProperty('--glow-x', `50%`);
        card.style.setProperty('--glow-y', `50%`);
    });
}); 