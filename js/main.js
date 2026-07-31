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

    // LÃ³gica para esconder o indicador de rolagem do celular interativo
    const phoneScrollArea = document.querySelector('.phone-scroll-area');
    const scrollHint = document.getElementById('scrollHint');
    
    if (phoneScrollArea && scrollHint) {
        // Atrasa a leitura do scroll para evitar que o carregamento da pÃ¡gina esconda o botÃ£o sem querer
        setTimeout(() => {
            phoneScrollArea.addEventListener('scroll', () => {
                // Se rolar mais de 80px para baixo, esconde o indicador
                if (phoneScrollArea.scrollTop > 80) {
                    scrollHint.style.opacity = '0';
                    scrollHint.style.visibility = 'hidden';
                } else {
                    scrollHint.style.opacity = '1';
                    scrollHint.style.visibility = 'visible';
                }
            });
        }, 1000);
    }
});

/* ==========================================================================
   Marcas e Modais
   ========================================================================== */

function openFentyModal() {
    const modal = document.getElementById("fentyModal");
    if(modal) {
        modal.classList.add("active");
        
        // Inicia a reprodução dos vídeos
        const v1 = document.getElementById("fentyVideo1");
        const v2 = document.getElementById("fentyVideo2");
        if(v1) { v1.play(); }
        if(v2) { v2.play(); }
    }
}

function closeFentyModal() {
    const modal = document.getElementById("fentyModal");
    if(modal) {
        modal.classList.remove("active");
        
        // Pausa os vídeos e volta ao início
        const v1 = document.getElementById("fentyVideo1");
        const v2 = document.getElementById("fentyVideo2");
        if(v1) { v1.pause(); v1.currentTime = 0; }
        if(v2) { v2.pause(); v2.currentTime = 0; }
    }
}

function toggleMuteFentyVideos() {
    const v1 = document.getElementById("fentyVideo1");
    const v2 = document.getElementById("fentyVideo2");
    const btn = document.getElementById("unmuteVideosBtn");
    
    let isMuted = true;
    
    if(v1) {
        isMuted = v1.muted;
        v1.muted = !isMuted;
    }
    if(v2) {
        v2.muted = !isMuted;
    }
    
    if (isMuted) {
        btn.textContent = "Desativar Som";
    } else {
        btn.textContent = "Ativar Som";
    }
}

// Fechar modal ao pressionar ESC
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeFentyModal();
    }
});



/* Video Intersection Observer */
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.video-preview');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(e => console.log('Autoplay prevented:', e));
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.2 });
    
    videos.forEach(video => {
        videoObserver.observe(video);
    });
});
