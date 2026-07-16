/**
 * DEYSYANE KATARINA - Main JS
 * Intersection Observer for scroll animations
 */

document.addEventListener("DOMContentLoaded", () => {
    // Elements to animate
    const elementsToAnimate = document.querySelectorAll(
        '.title-section, .text-body, .subtitle, .values-image, .creator-image, ' +
        '.impact-image, .audience-image, .cta-image, .metric-card, .service-card, ' +
        '.step-item, .demo-item, .gallery-item'
    );

    // Add base reveal class
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('reveal');
        // Add staggered delay for grid items
        if (el.classList.contains('metric-card') || el.classList.contains('service-card') || el.classList.contains('step-item')) {
            const delay = (index % 3) * 100; // 0, 100, 200ms
            el.style.transitionDelay = `${delay}ms`;
        }
    });

    // Scroll Reveal Animation
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    elementsToAnimate.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Lógica para esconder o indicador de rolagem do celular interativo
    const phoneScrollArea = document.querySelector('.phone-scroll-area');
    const scrollHint = document.getElementById('scrollHint');
    
    if (phoneScrollArea && scrollHint) {
        phoneScrollArea.addEventListener('scroll', () => {
            // Se rolar mais de 20px para baixo, esconde o indicador
            if (phoneScrollArea.scrollTop > 20) {
                scrollHint.style.opacity = '0';
                scrollHint.style.visibility = 'hidden';
            } else {
                scrollHint.style.opacity = '1';
                scrollHint.style.visibility = 'visible';
            }
        });
    }
});
