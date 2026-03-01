// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

    // Hide loader
    setTimeout(() => {
        document.getElementById('loader')?.classList.add('hidden');
        initAnimations();
    }, 2000);

    initCursor();
    initMagneticButtons();
    initSmoothScroll();
    initNavigation();
    initParallax();
    initFormHandling();
});

// Custom Cursor
function initCursor() {
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document
        .querySelectorAll('a, button, .service-card, input, select, textarea')
        .forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
}

// Magnetic Buttons
function initMagneticButtons() {
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Scroll Animations
function initAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                if (entry.target.classList.contains('reveal-text')) {
                    entry.target.querySelectorAll('span').forEach((span, i) => {
                        span.style.transitionDelay = `${i * 0.1}s`;
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document
        .querySelectorAll('.reveal-text, .img-reveal, .line-draw')
        .forEach(el => observer.observe(el));
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            document
                .querySelector(anchor.getAttribute('href'))
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ===============================
// NAVIGATION (LÓGICA CORRETA)
// ===============================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const transform = document.getElementById('transform');

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function applyLightNav() {
        navbar.classList.remove('bg-black', 'text-white');
        navbar.classList.add('text-black');
        navbar.classList.remove('mix-blend-difference');
    }

    function applyDarkNav() {
        navbar.classList.add('bg-black', 'text-white');
        navbar.classList.remove('text-black');
        navbar.classList.remove('mix-blend-difference');
    }

    function updateNavbar() {
        const scrollY = window.scrollY;
        const triggerPoint = transform.offsetTop;

        if (scrollY < triggerPoint) {
            // ACIMA do texto "TRANSFORMANDO"
            applyLightNav();
        } else {
            // ABAIXO do texto "TRANSFORMANDO"
            applyDarkNav();
        }
    }

    // Estado inicial
    updateNavbar();

    // Atualiza no scroll
    window.addEventListener('scroll', updateNavbar);

    // Mobile menu
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.textContent = '☰';
        });
    });
}

// Parallax
function initParallax() {
    const items = document.querySelectorAll('.img-reveal img, .floating');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        items.forEach((el, i) => {
            el.style.transform = `translateY(${-(scrolled * (0.5 + i * 0.1))}px)`;
        });
    });
}

// Forms
function initFormHandling() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const text = btn.innerHTML;

            btn.innerHTML = 'Enviado com sucesso! ✓';
            btn.style.background = '#10b981';

            setTimeout(() => {
                btn.innerHTML = text;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    });
}

// Video Modal
document.getElementById('video-trigger')?.addEventListener('click', () => {
    alert('Vídeo do processo de instalação seria reproduzido aqui.');
});

// Project hover
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        document.querySelectorAll('.project-item').forEach(o => {
            if (o !== item) o.style.opacity = '0.2';
        });
    });

    item.addEventListener('mouseleave', () => {
        document.querySelectorAll('.project-item').forEach(o => {
            o.style.opacity = '';
        });
    });
});