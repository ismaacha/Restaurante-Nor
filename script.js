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
        
        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
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