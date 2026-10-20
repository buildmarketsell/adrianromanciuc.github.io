// Header hairline once the page scrolls, and a gentle reveal for sections.
document.addEventListener('DOMContentLoaded', () => {
    const SCROLL_THRESHOLD_PX = 8;
    const header = document.querySelector('.header');

    const updateHeader = () => {
        header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD_PX);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    const revealTargets = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        revealTargets.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    document.documentElement.classList.add('reveal-ready');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -10% 0px' });

    revealTargets.forEach((el) => observer.observe(el));
});
