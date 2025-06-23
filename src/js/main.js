$(document).ready(function () {
    // Register GSAP plugins
    gsap.registerPlugin(SplitText, ScrollTrigger);

    // Initialize all animations
    initIntroAnimation();
    initNavHoverAnimation();
    initFullWidthMenu();
    initFloatingMenuButton();
    initSmoothScrolling();
    initHeroTextAnimation();
    initDividerAnimation();
    initAboutScrollAnimation();
    initProjectsAnimation();
    initSkillsAnimation();
    initFooterAnimation();
});
