/**
 * Initializes animations for the footer, including scroll-triggered
 * reveals and the interactive spotlight effect.
 */
function initFooterAnimation() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    const title = footer.querySelector('.footer-title');
    const subtitle = footer.querySelector('.footer-subtitle');
    const cards = gsap.utils.toArray('.contact-card');
    const bottomBar = footer.querySelector('.footer-bottom-bar');

    // Scroll-triggered animations
    gsap.set([title, subtitle, ...cards, bottomBar], {
        opacity: 0,
        y: 50,
        willChange: 'transform, opacity'
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none reset'
        }
    });

    tl.to(title, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .to(subtitle, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.8')
      .to(cards, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }, '-=0.8')
      .to(bottomBar, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5');

    // Spotlight hover effect for contact cards
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
} 