// Font loading detection
function checkFontsLoaded() {
    // Check if fonts are loaded using FontFaceSet API
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('1em Montserrat'),
            document.fonts.load('1em Playfair Display')
        ]).then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    } else {
        // Fallback for browsers that don't support FontFaceSet
        document.documentElement.classList.add('fonts-loaded');
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Smart header behavior on scroll
function initSmartHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    let ticking = false;
    const headerHeight = header.offsetHeight;
    const scrollThreshold = 50; // Минимальное расстояние прокрутки для срабатывания
    
    // Функция для обновления состояния шапки
    const updateHeader = () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Добавляем класс при скролле
        if (currentScroll > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Определяем направление скролла
        const isScrollingDown = currentScroll > lastScroll && currentScroll > headerHeight;
        const isAtTop = currentScroll <= 0;
        
        // Управляем видимостью шапки
        if (isAtTop) {
            // В самом верху страницы всегда показываем шапку
            header.classList.remove('hide');
            header.classList.add('show');
        } else if (isScrollingDown && header.classList.contains('show')) {
            // Прокрутка вниз - скрываем шапку
            header.classList.remove('show');
            header.classList.add('hide');
        } else if (!isScrollingDown && header.classList.contains('hide')) {
            // Прокрутка вверх - показываем шапку
            header.classList.remove('hide');
            header.classList.add('show');
        }
        
        lastScroll = currentScroll;
        ticking = false;
    };
    
    // Оптимизация производительности с помощью requestAnimationFrame
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });
    
    // Инициализация при загрузке
    updateHeader();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    checkFontsLoaded();
    initMobileMenu();
    initSmoothScrolling();
    initSmartHeader();
    
    // Add fonts-loaded class to body for better font loading handling
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    } else {
        // Fallback for browsers that don't support FontFaceSet
        document.documentElement.classList.add('fonts-loaded');
    }
});

// Form validation for contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        contactForm.reset();
    });
}
