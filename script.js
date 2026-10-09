// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initScrollAnimations();
    initNavigation();
    initMenuFiltering();
    initMenuCtaLightbox();
    initHeaderScroll();
    initSmoothScrolling();
}

// ===== ANIMACIONES AL SCROLL =====
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });
}

// ===== NAVEGACIÓN =====
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('navMobile');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');

    if (!hamburger || !navMobile) return;

    function setMenuOpen(open) {
        hamburger.classList.toggle('active', open);
        navMobile.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', open);
        hamburger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        document.body.style.overflow = open ? 'hidden' : '';
    }

    // Toggle menú móvil
    hamburger.addEventListener('click', function() {
        setMenuOpen(!navMobile.classList.contains('active'));
    });

    // Cerrar menú al hacer click en enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMobile.classList.contains('active')) setMenuOpen(false);
        });
    });

    // Cerrar menú con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMobile.classList.contains('active')) setMenuOpen(false);
    });

    // Indicador de navegación para desktop
    if (navIndicator) {
        updateNavIndicator();
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                updateNavIndicator(this);
            });
        });
        
        document.querySelector('.nav-desktop').addEventListener('mouseleave', function() {
            updateNavIndicator();
        });
    }
}

// Actualizar indicador de navegación
function updateNavIndicator(activeLink = null) {
    const navIndicator = document.querySelector('.nav-indicator');
    const navDesktop = document.querySelector('.nav-desktop');
    
    if (!navIndicator || !navDesktop) return;
    
    if (activeLink) {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = navDesktop.getBoundingClientRect();
        
        navIndicator.style.width = `${linkRect.width}px`;
        navIndicator.style.left = `${linkRect.left - navRect.left}px`;
    } else {
        // Encuentra el enlace activo basado en la posición de scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        const activeNavLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
        
        if (activeNavLink) {
            const linkRect = activeNavLink.getBoundingClientRect();
            const navRect = navDesktop.getBoundingClientRect();
            
            navIndicator.style.width = `${linkRect.width}px`;
            navIndicator.style.left = `${linkRect.left - navRect.left}px`;
            navIndicator.style.opacity = '1';
        } else {
            navIndicator.style.opacity = '0';
        }
    }
}

// ===== FILTRADO DEL MENÚ =====
function initMenuFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const menuCards = document.querySelectorAll('.menu-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Actualizar botones activos
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // Filtrar cards
            menuCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// ===== LIGHTBOX PARA CARTA =====
function initMenuCtaLightbox() {
    const cards = Array.from(document.querySelectorAll('.menu-cta-card'));
    const lightbox = document.getElementById('menuLightbox');

    if (!cards.length || !lightbox) return;

    const image = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const backdrop = lightbox.querySelector('[data-lightbox-close]');
    let currentIndex = 0;

    function updateLightbox(index) {
        const card = cards[index];
        const fullSrc = card.getAttribute('data-full');
        const text = card.getAttribute('data-caption') || '';
        image.src = fullSrc;
        image.alt = text || 'Carta del restaurante';
        caption.textContent = text;
    }

    function openLightbox(index) {
        currentIndex = index;
        updateLightbox(currentIndex);
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateLightbox(currentIndex);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateLightbox(currentIndex);
    }

    cards.forEach((card, index) => {
        card.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('active')) return;

        if (event.key === 'Escape') {
            closeLightbox();
        }

        if (event.key === 'ArrowLeft') {
            showPrev();
        }

        if (event.key === 'ArrowRight') {
            showNext();
        }
    });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        updateNavIndicator();
    });
}

// ===== SCROLL SUAVE =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Enlaces vacíos ("#") no apuntan a ninguna sección
            if (href.length < 2) {
                e.preventDefault();
                return;
            }
            const target = document.getElementById(href.slice(1));
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMACIÓN DE TEXTO HERO =====
function initHeroAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroDescription.style.transition = 'opacity 1s ease 0.5s, transform 1s ease 0.5s';
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 300);
    }
}
// Intersection Observer para pausar animaciones cuando no son visibles
function initHeroPerformance() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (!hero || !heroBackground) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reanudar animación cuando es visible
                heroBackground.style.animationPlayState = 'running';
            } else {
                // Pausar animación cuando no es visible (mejora performance)
                heroBackground.style.animationPlayState = 'paused';
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(hero);
}

// Inicializar optimizaciones de performance
document.addEventListener('DOMContentLoaded', initHeroPerformance);

// Inicializar animación del hero al cargar
window.addEventListener('load', initHeroAnimation);

