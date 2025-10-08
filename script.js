// Scroll animations
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };
        
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('appear');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);
        
        fadeElements.forEach(fader => {
            appearOnScroll.observe(fader);
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        /* ---------------------------
        Mobile hamburger / panel
        --------------------------- */
        const hamburgerBtn = document.getElementById('hamburger');
        const mobileNav = document.getElementById('mobile-nav');
        const bodyEl = document.body;

        // Toggle open/close panel + animación X
        function toggleMobileNav(open) {
        const isOpen = typeof open === 'boolean' ? open : !mobileNav.classList.contains('open');
        hamburgerBtn.classList.toggle('active', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileNav.classList.toggle('open', isOpen);
        mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        bodyEl.classList.toggle('no-scroll', isOpen);

        // create overlay to close when click outside
        if (isOpen) {
            let overlay = document.createElement('div');
            overlay.id = 'mobile-overlay';
            overlay.style.position = 'fixed';
            overlay.style.inset = `${getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '68px'} 0 0 0`;
            overlay.style.zIndex = 1100;
            overlay.style.background = 'transparent';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', () => toggleMobileNav(false), { once: true });
        } else {
            const ov = document.getElementById('mobile-overlay');
            if (ov) ov.remove();
        }
        }

        hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileNav();
        });

        // cerrar con ESC
        window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) toggleMobileNav(false);
        });

        // cerrar si se hace click fuera del nav (tap en overlay lo maneja; esto es extra safety)
        document.addEventListener('click', (e) => {
        if (!mobileNav.classList.contains('open')) return;
        if (!mobileNav.contains(e.target) && !hamburgerBtn.contains(e.target)) toggleMobileNav(false);
        });

        /* Submenu accordion toggles (si no tienes submenus, no afecta) */
        document.querySelectorAll('.submenu-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.closest('.has-submenu');
            const opened = parent.classList.toggle('open');
            btn.setAttribute('aria-expanded', opened ? 'true' : 'false');
        });
        });

        // Si usas scroll-to anchors: cerrar menú tras click en enlace móvil
        document.querySelectorAll('#mobile-nav a[href^="#"]').forEach(a=>{
        a.addEventListener('click', () => toggleMobileNav(false));
        });

        
        // Form submission
        const reservationForm = document.querySelector('form');
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu reserva! Te hemos enviado un correo de confirmación.');
            reservationForm.reset();
        });
        
        // Reserve button in header
        const reserveBtn = document.querySelector('.reserve-btn');
        reserveBtn.addEventListener('click', () => {
            document.getElementById('reservas').scrollIntoView({
                behavior: 'smooth'
            });
        });