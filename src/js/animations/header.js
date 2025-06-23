/**
 * Animates the intro sequence for the header.
 */
function initIntroAnimation() {
    const $header = $('header');
    const $headerElements = $header.find('.logo, nav ul, .menu-toggle');

    gsap.set($headerElements, { visibility: 'hidden' });

    const mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
        const tlIntroMobile = gsap.timeline({ delay: 0.5 });
        tlIntroMobile.to($header, { width: '96%', duration: 1.2, ease: 'power3.out' });
        tlIntroMobile.fromTo(
            $headerElements,
            { opacity: 0, visibility: 'visible' },
            { opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15 },
            '<0.5'
        );
    });

    mm.add("(min-width: 769px)", () => {
        const tlIntroDesktop = gsap.timeline({ delay: 0.5 });
        tlIntroDesktop.to($header, { width: '80%', duration: 1.2, ease: 'power3.out' });
        tlIntroDesktop.fromTo(
            $headerElements,
            { opacity: 0, visibility: 'visible' },
            { opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15 },
            '<0.5'
        );
    });
}

/**
 * Initializes the hover effect for the desktop navigation menu.
 */
function initNavHoverAnimation() {
    const $navMenu = $('header nav ul');
    if (!$navMenu.length) return;

    $navMenu.css('position', 'relative');
    if (!$navMenu.children('.nav-links-hover-block').length) {
        $navMenu.prepend('<div class="nav-links-hover-block"></div>');
    }

    const $hoverElement = $navMenu.children('.nav-links-hover-block');

    $navMenu.on('mouseenter', 'li a', function () {
        const $link = $(this);
        const left = $link.offset().left - $navMenu.offset().left;
        const top = $link.offset().top - $navMenu.offset().top;
        gsap.to($hoverElement, {
            width: $link.outerWidth(),
            height: $link.outerHeight(),
            x: left,
            y: top,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
        });
    });

    $navMenu.on('mouseleave', () => {
        gsap.to($hoverElement, { opacity: 0, duration: 0.5, ease: 'power3.in' });
    });
}

/**
 * Initializes smooth scrolling for navigation links.
 */
function initSmoothScrolling() {
    // Handle both main nav and overlay menu links
    $('nav a, .overlay-nav-list a').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this).attr('href');
        
        // Close overlay menu if open
        const $fullWidthMenu = $('#fullWidthMenu');
        if ($fullWidthMenu.hasClass('is-active')) {
            $fullWidthMenu.removeClass('is-active');
            $('body').removeClass('overlay-active');
        }
        
        // Handle home link (scroll to top) or specific section
        if (target === '#' || target === '') {
            // Scroll to top of page using native method
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Only try to find target section if it's not the home link
            const $targetSection = $(target);
            if ($targetSection.length) {
                // Adjust offset for mobile devices
                const isMobile = window.innerWidth <= 768;
                const scrollOffset = isMobile ? 80 : 100; // Smaller offset on mobile
                
                // Smooth scroll to target section
                $('html, body').animate({
                    scrollTop: $targetSection.offset().top - scrollOffset
                }, 1000, 'swing');
            }
        }
    });
}

/**
 * Manages the full-width overlay menu animations and interactions.
 */
function initFullWidthMenu() {
    const $menuToggle = $('#menuToggle');
    const $fullWidthMenu = $('#fullWidthMenu');
    if (!$fullWidthMenu.length || !$menuToggle.length) {
        console.warn('Full-width menu or toggle not found. Skipping menu animation.');
        return;
    }
    
    const $overlayMenuContent = $fullWidthMenu.find('.overlay-menu-content');
    const $overlayLinks = $fullWidthMenu.find('.overlay-nav-list li a');
    const $lineMiddle = $menuToggle.find('line:nth-child(1)');
    const $lineTop = $menuToggle.find('line:nth-child(2)');
    const $lineBottom = $menuToggle.find('line:nth-child(3)');

    gsap.set($fullWidthMenu, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        visibility: 'hidden',
        opacity: 0,
        zIndex: 999,
        pointerEvents: 'none',
        height: 0,
    });
    gsap.set($overlayMenuContent, { opacity: 0, y: 20 });

    let currentSplitInstances = [];

    $menuToggle.on('click', () => {
        $('body').toggleClass('overlay-active');
        $fullWidthMenu.toggleClass('is-active');
    });

    const createSplitTextForLinks = () => {
        currentSplitInstances.forEach((split) => split.revert());
        currentSplitInstances = [];
        $overlayLinks.each(function () {
            const $link = $(this);
            const split = new SplitText(this, { type: 'lines' });
            currentSplitInstances.push(split);
            $link.empty();
            split.lines.forEach((line) => {
                const mask = document.createElement('div');
                mask.className = 'mask';
                mask.style.overflow = 'hidden';
                mask.style.display = 'block';
                mask.style.position = 'relative';

                const inner = document.createElement('div');
                inner.className = 'line-inner';
                inner.textContent = line.textContent;

                const hoverInner = document.createElement('div');
                hoverInner.className = 'line-inner hover';
                hoverInner.textContent = line.textContent;

                mask.appendChild(inner);
                mask.appendChild(hoverInner);
                $link[0].appendChild(mask);

                gsap.set(hoverInner, {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    yPercent: 100,
                    opacity: 0,
                    pointerEvents: 'none',
                });
            });
        });
    };

    const animateToggleToX = () => {
        const tl = gsap.timeline();
        tl.to($lineMiddle, { opacity: 0, duration: 0.15, ease: 'power2.out' });
        tl.to($lineTop, { rotation: 45, x: 5, y: 0, duration: 0.3, ease: 'power2.out' }, '<0.1');
        tl.to($lineBottom, { rotation: -45, x: 5, y: 0, duration: 0.3, ease: 'power2.out' }, '<0.3');
    };

    const animateToggleToHamburger = (timeline) => {
        timeline.to($lineMiddle, { opacity: 1, duration: 0.15, ease: 'power2.in' }, '>-0.4');
        timeline.to($lineTop, { rotation: 0, x: 0, y: 0, duration: 0.3, ease: 'power2.in' }, '<0.1');
        timeline.to($lineBottom, { rotation: 0, x: 0, y: 0, duration: 0.3, ease: 'power2.in' }, '<0.3');
    };

    const $overlayImages = $fullWidthMenu.find('.overlay-menu-image');
    gsap.set($overlayImages, { autoAlpha: 0, scale: 1.05 });

    let lastActiveImageIndex = 0;
    let overlayMenuAnimated = false;
    const timelinesMap = new Map();

    $overlayMenuContent.on('mouseenter', '.overlay-nav-list li a', function () {
        const $link = $(this);
        const index = $link.data('image-index');
        lastActiveImageIndex = index;

        if (timelinesMap.has(this)) {
            timelinesMap.get(this).kill();
        }

        const tl = gsap.timeline();
        tl.to($link.find('.mask .line-inner:not(.hover)'), {
            yPercent: -100,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
        }, 0);
        tl.to($link.find('.mask .line-inner.hover'), {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
        }, 0);

        $overlayImages.each(function (i) {
            tl.to(this, {
                autoAlpha: i === index ? 1 : 0,
                scale: i === index ? 1 : 1.05,
                duration: i === index ? 0.7 : 0.6,
                ease: 'power3.out',
            }, 0);
        });

        timelinesMap.set(this, tl);
    });

    $overlayMenuContent.on('mouseleave', '.overlay-nav-list li a', function () {
        const $link = $(this);
        if (timelinesMap.has(this)) {
            timelinesMap.get(this).kill();
            timelinesMap.delete(this);
        }

        const tl = gsap.timeline();
        tl.to($link.find('.mask .line-inner:not(.hover)'), {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.inOut',
        }, 0);
        tl.to($link.find('.mask .line-inner.hover'), {
            yPercent: 100,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.inOut',
        }, 0);

        gsap.to($overlayImages, {
            autoAlpha: (i) => (i == lastActiveImageIndex ? 1 : 0),
            scale: (i) => (i == lastActiveImageIndex ? 1 : 1.05),
            duration: 0.6,
            ease: 'power3.inOut',
        });
    });

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if ($fullWidthMenu.hasClass('is-active')) {
                    if (!overlayMenuAnimated) {
                        createSplitTextForLinks();
                        const tlMenuIn = gsap.timeline({
                            onStart: () => gsap.set($fullWidthMenu, { visibility: 'visible' }),
                        });
                        tlMenuIn
                            .to($fullWidthMenu, {
                                height: '100vh',
                                opacity: 1,
                                pointerEvents: 'auto',
                                duration: 0.6,
                                ease: 'power2.out',
                            })
                            .to(
                                $overlayMenuContent,
                                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                                '<0.2'
                            )
                            .from(
                                $overlayMenuContent.find('.mask .line-inner:not(.hover)'),
                                {
                                    yPercent: 100,
                                    opacity: 0,
                                    duration: 0.8,
                                    ease: 'power3.out',
                                    stagger: 0.15,
                                    delay: 0.1,
                                },
                                '<0.1'
                            );
                        overlayMenuAnimated = true;
                    }
                    animateToggleToX();
                } else {
                    overlayMenuAnimated = false;
                    const tlReverseLinks = gsap.timeline();
                    tlReverseLinks
                        .to($overlayMenuContent.find('.mask .line-inner:not(.hover)'), {
                            opacity: 0,
                            yPercent: -100,
                            duration: 0.5,
                            ease: 'power2.in',
                            stagger: { each: 0.1, from: 'end' },
                        })
                        .to($overlayMenuContent, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.in' }, '<0.2')
                        .to(
                            $fullWidthMenu,
                            {
                                height: 0,
                                opacity: 0,
                                pointerEvents: 'none',
                                duration: 0.6,
                                ease: 'power2.in',
                                onComplete: () => {
                                    gsap.set($fullWidthMenu, { visibility: 'hidden' });
                                    currentSplitInstances.forEach((split) => split.revert());
                                    currentSplitInstances = [];
                                    gsap.set($overlayMenuContent, { clearProps: 'all' });
                                },
                            },
                            '>0.2'
                        );
                    animateToggleToHamburger(tlReverseLinks);
                }
            }
        });
    });

    observer.observe($fullWidthMenu[0], { attributes: true });

    const originalCallback = observer.takeRecords;
    observer.takeRecords = function() {
        if ($fullWidthMenu.hasClass('is-active')) {
            lastActiveImageIndex = 0;
            gsap.to($overlayImages, {
                autoAlpha: (i) => (i == 0 ? 1 : 0),
                scale: (i) => (i == 0 ? 1 : 1.05),
                duration: 0.6,
                ease: 'power3.inOut',
            });
        }
        return originalCallback.apply(this, arguments);
    };
}

/**
 * Initializes the floating menu button functionality.
 */
function initFloatingMenuButton() {
    const $floatingBtn = $('#floatingMenuBtn');
    const $fullWidthMenu = $('#fullWidthMenu');
    const $menuToggle = $('#menuToggle');
    
    if (!$floatingBtn.length) return;
    
    // Get the line elements for animation (same as main toggle)
    const $lineMiddle = $floatingBtn.find('line:nth-child(1)');
    const $lineTop = $floatingBtn.find('line:nth-child(2)');
    const $lineBottom = $floatingBtn.find('line:nth-child(3)');
    
    let scrollThreshold = 300; // Show button after scrolling 300px
    let isVisible = false;
    
    // Show/hide floating button based on scroll position
    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop > scrollThreshold && !isVisible) {
            $floatingBtn.addClass('is-visible');
            isVisible = true;
        } else if (scrollTop <= scrollThreshold && isVisible) {
            $floatingBtn.removeClass('is-visible');
            isVisible = false;
        }
    });
    
    // Use the exact same animation functions as main toggle
    const animateFloatingToX = () => {
        const tl = gsap.timeline();
        tl.to($lineMiddle, { opacity: 0, duration: 0.15, ease: 'power2.out' });
        tl.to($lineTop, { rotation: 45, x: 5, y: 0, duration: 0.3, ease: 'power2.out' }, '<0.1');
        tl.to($lineBottom, { rotation: -45, x: 5, y: 0, duration: 0.3, ease: 'power2.out' }, '<0.3');
    };
    
    const animateFloatingToHamburger = (timeline) => {
        timeline.to($lineMiddle, { opacity: 1, duration: 0.15, ease: 'power2.in' }, '>-0.4');
        timeline.to($lineTop, { rotation: 0, x: 0, y: 0, duration: 0.3, ease: 'power2.in' }, '<0.1');
        timeline.to($lineBottom, { rotation: 0, x: 0, y: 0, duration: 0.3, ease: 'power2.in' }, '<0.3');
    };
    
    // Handle floating button click - trigger main menu toggle
    $floatingBtn.on('click', function() {
        // Trigger the main menu toggle instead of duplicating logic
        $menuToggle.trigger('click');
    });
    
    // Sync floating button state with main menu toggle
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if ($fullWidthMenu.hasClass('is-active')) {
                    $floatingBtn.removeClass('is-visible');
                    // Animate floating button to X when menu opens
                    animateFloatingToX();
                } else {
                    // Animate floating button back to hamburger when menu closes
                    const tl = gsap.timeline();
                    animateFloatingToHamburger(tl);
                    
                    // Show floating button again if we're scrolled down
                    if ($(window).scrollTop() > scrollThreshold) {
                        $floatingBtn.addClass('is-visible');
                    }
                }
            }
        });
    });
    
    observer.observe($fullWidthMenu[0], { attributes: true });
} 