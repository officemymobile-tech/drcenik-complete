// Dr. Fadime Cenik - Main JavaScript
// Standalone, Independent JS

(function() {
    'use strict';

    // ============================================
    // LANGUAGE MANAGEMENT
    // ============================================
    
    const DEFAULT_LANG = 'de';
    let currentLang = localStorage.getItem('drcenik-lang') || DEFAULT_LANG;

    function setLanguage(lang) {
        if (!translations[lang]) {
            console.warn(`Language "${lang}" not found, falling back to ${DEFAULT_LANG}`);
            lang = DEFAULT_LANG;
        }
        
        currentLang = lang;
        localStorage.setItem('drcenik-lang', lang);
        
        // Update all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update active states on language buttons
        document.querySelectorAll('.lang-btn, .footer-lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    // ============================================
    // MOBILE MENU
    // ============================================
    
    function initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const nav = document.getElementById('nav');
        
        if (!menuBtn) return;
        
        // Create mobile nav if it doesn't exist
        let mobileNav = document.querySelector('.mobile-nav');
        if (!mobileNav) {
            mobileNav = document.createElement('nav');
            mobileNav.className = 'mobile-nav';
            mobileNav.innerHTML = `
                <ul class="mobile-nav-list">
                    <li><a href="#hero" class="mobile-nav-link" data-i18n="footer.home">Startseite</a></li>
                    <li><a href="#services" class="mobile-nav-link" data-i18n="nav.therapies">Therapieangebot</a></li>
                    <li><a href="#news" class="mobile-nav-link" data-i18n="nav.news">Wissen & News</a></li>
                    <li><a href="#vouchers" class="mobile-nav-link">Gutscheine</a></li>
                    <li><a href="#hours" class="mobile-nav-link" data-i18n="hours.title">Ordinationszeiten</a></li>
                    <li><a href="#contact" class="mobile-nav-link" data-i18n="nav.contact">Kontakt</a></li>
                </ul>
            `;
            document.body.appendChild(mobileNav);
        }
        
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // COOKIE BANNER
    // ============================================
    
    function initCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('cookie-accept');
        const rejectBtn = document.getElementById('cookie-reject');
        
        if (!banner) return;
        
        // Check if user has already made a choice
        const cookieChoice = localStorage.getItem('drcenik-cookies');
        
        if (!cookieChoice) {
            // Show banner after a short delay
            setTimeout(() => {
                banner.classList.add('show');
            }, 1000);
        }
        
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('drcenik-cookies', 'accepted');
                banner.classList.remove('show');
            });
        }
        
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => {
                localStorage.setItem('drcenik-cookies', 'rejected');
                banner.classList.remove('show');
            });
        }
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    
    function initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        });
    }

    // ============================================
    // ANIMATIONS ON SCROLL
    // ============================================
    
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate
        document.querySelectorAll('.service-card, .news-card, .hours-card, .vouchers-content').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // ============================================
    // LANGUAGE BUTTON HANDLERS
    // ============================================
    
    function initLanguageButtons() {
        document.querySelectorAll('.lang-btn, .footer-lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                if (lang) {
                    setLanguage(lang);
                }
            });
        });
    }

    // ============================================
    // DROPDOWN MENU (KEYBOARD ACCESSIBILITY)
    // ============================================
    
    function initDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!toggle || !menu) return;
            
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
                    menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
                }
            });
        });
    }

    // ============================================
    // INITIALIZE
    // ============================================
    
    function init() {
        // Set initial language
        setLanguage(currentLang);
        
        // Initialize all components
        initMobileMenu();
        initCookieBanner();
        initSmoothScroll();
        initHeaderScroll();
        initScrollAnimations();
        initLanguageButtons();
        initDropdowns();
        
        console.log('Dr. Fadime Cenik Website initialized');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
