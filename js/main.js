// Header state on scroll, floating WhatsApp button, and a gentle reveal for sections.
document.addEventListener('DOMContentLoaded', () => {
    const SCROLL_THRESHOLD_PX = 8;
    const header = document.querySelector('.header');

    const updateHeader = () => {
        header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD_PX);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    // Floating WhatsApp button appears once the hero leaves the screen
    const fab = document.querySelector('.fab');
    const hero = document.querySelector('.hero');
    if (fab && hero && 'IntersectionObserver' in window) {
        new IntersectionObserver(([entry]) => {
            fab.classList.toggle('is-visible', !entry.isIntersecting);
        }).observe(hero);
    }

    // Service cards: feed the pointer position to the hover spotlight
    document.querySelectorAll('.service-card').forEach((card) => {
        card.addEventListener('pointermove', (event) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
            card.style.setProperty('--my', `${event.clientY - rect.top}px`);
        }, { passive: true });
    });

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
