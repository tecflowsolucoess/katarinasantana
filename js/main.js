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

/* Modal Casa na Árvore */
function openCasaNaArvoreModal() {
    const modal = document.getElementById("casaNaArvoreModal");
    if(modal) {
        modal.classList.add("active");
        const v = document.getElementById("casaNaArvoreVideo");
        if(v) { v.play(); }
    }
}

function closeCasaNaArvoreModal() {
    const modal = document.getElementById("casaNaArvoreModal");
    if(modal) {
        modal.classList.remove("active");
        const v = document.getElementById("casaNaArvoreVideo");
        if(v) { v.pause(); v.currentTime = 0; }
    }
}

function toggleMuteCasaNaArvoreVideo() {
    const v = document.getElementById("casaNaArvoreVideo");
    const btn = document.getElementById("unmuteCasaNaArvoreBtn");
    if(v && btn) {
        v.muted = !v.muted;
        if (!v.muted) {
            v.volume = 1.0;
        }
        btn.textContent = v.muted ? "Ativar Som" : "Desativar Som";
    }
}

/* Modal Rancho Navarro */
function openRanchoNavarroModal() {
    const modal = document.getElementById("ranchoNavarroModal");
    if(modal) {
        modal.classList.add("active");
        const v = document.getElementById("ranchoNavarroVideo");
        if(v) { v.play(); }
    }
}

function closeRanchoNavarroModal() {
    const modal = document.getElementById("ranchoNavarroModal");
    if(modal) {
        modal.classList.remove("active");
        const v = document.getElementById("ranchoNavarroVideo");
        if(v) { v.pause(); v.currentTime = 0; }
    }
}

function toggleMuteRanchoNavarroVideo() {
    const v = document.getElementById("ranchoNavarroVideo");
    const btn = document.getElementById("unmuteRanchoNavarroBtn");
    if(v && btn) {
        v.muted = !v.muted;
        if (!v.muted) {
            v.volume = 1.0;
        }
        btn.textContent = v.muted ? "Ativar Som" : "Desativar Som";
    }
}

// Fechar modais ao pressionar ESC
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeFentyModal();
        closeCasaNaArvoreModal();
        closeRanchoNavarroModal();
    }
});



/* Video Performance & Category Filter */
document.addEventListener('DOMContentLoaded', () => {
    const videoItems = document.querySelectorAll('.video-item');
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Em dispositivos com mouse (Desktop): play instantâneo no hover (economiza GPU e CPU no scroll)
    if (hasHover) {
        videoItems.forEach(item => {
            const video = item.querySelector('.video-preview');
            if (!video) return;

            item.addEventListener('mouseenter', () => {
                if (!item.classList.contains('is-hidden')) {
                    video.play().catch(() => {});
                }
            });

            item.addEventListener('mouseleave', () => {
                video.pause();
            });
        });
    }

    // Intersection Observer leve (apenas para mobile ou para pausar fora da tela)
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            const parent = video.closest('.video-item');
            if (entry.isIntersecting && parent && !parent.classList.contains('is-hidden')) {
                if (!hasHover) {
                    // Mobile: toca apenas se tiver 50%+ visível
                    video.play().catch(() => {});
                }
            } else {
                video.pause();
            }
        });
    }, { threshold: hasHover ? 0.1 : 0.6 });

    document.querySelectorAll('.video-preview').forEach(v => videoObserver.observe(v));

    // Filtros de Categoria (Lifestyle, Moda, Beleza)
    const filterButtons = document.querySelectorAll('.video-filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Atualiza estado ativo dos botões
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filtra os itens
            videoItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const videoEl = item.querySelector('video');

                if (filter === 'all' || category === filter) {
                    item.classList.remove('is-hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('is-hidden');
                    if (videoEl) {
                        videoEl.pause();
                    }
                }
            });
        });
    });
});

