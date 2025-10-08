// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initScrollAnimations();
    initNavigation();
    initMenuFiltering();
    initGalleryHover();
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

    // Toggle menú móvil
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMobile.classList.toggle('active');
        document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });

    // Cerrar menú al hacer click en enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMobile.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMobile.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Cerrar menú con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMobile.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        }
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

// ===== EFECTOS DE GALERÍA =====
function initGalleryHover() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
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
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
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

// Inicializar animación del hero al cargar
window.addEventListener('load', initHeroAnimation);