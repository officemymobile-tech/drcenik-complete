/* ============================================
   DR. FADIME CENIK - MAIN JAVASCRIPT
   ============================================ */

// Current language state
let currentLanguage = 'de';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeCookies();
    initializeEventListeners();
    initializeScrollEffects();
    console.log('Dr. Fadime Cenik - Website initialized');
});

// ============================================
// LANGUAGE MANAGEMENT
// ============================================

function initializeLanguage() {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['de', 'tr', 'en'].includes(savedLanguage)) {
        currentLanguage = savedLanguage;
    } else {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0].toLowerCase();
        if (['de', 'tr', 'en'].includes(browserLang)) {
            currentLanguage = browserLang;
        } else {
            currentLanguage = 'de'; // Default to German
        }
    }
    
    updateLanguageUI();
}

function updateLanguageUI() {
    // Update all language-specific elements
    const elements = document.querySelectorAll('[class*="de"], [class*="tr"], [class*="en"]');
    
    elements.forEach(element => {
        if (element.classList.contains(currentLanguage)) {
            element.style.display = '';
        } else if (element.classList.contains('de') || element.classList.contains('tr') || element.classList.contains('en')) {
            element.style.display = 'none';
        }
    });
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        }
    });
    
    // Update page title
    updatePageTitle();
    
    // Save preference
    localStorage.setItem('language', currentLanguage);
}

function updatePageTitle() {
    const titles = {
        de: 'Dr. Fadime Cenik - Physikalische Medizin & Rehabilitation Wien',
        tr: 'Dr. Fadime Cenik - Fizik Tıp ve Rehabilitasyon Wien',
        en: 'Dr. Fadime Cenik - Physical Medicine & Rehabilitation Vienna'
    };
    document.title = titles[currentLanguage] || titles['de'];
}

// Language button click handlers
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('lang-btn')) {
        const lang = e.target.dataset.lang;
        if (lang && ['de', 'tr', 'en'].includes(lang)) {
            currentLanguage = lang;
            updateLanguageUI();
        }
    }
});

// ============================================
// COOKIE MANAGEMENT
// ============================================

function initializeCookies() {
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        cookieBanner.classList.remove('hidden');
    } else {
        cookieBanner.classList.add('hidden');
    }
    
    // Cookie accept button
    const acceptBtn = document.getElementById('cookie-accept');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'all');
            cookieBanner.classList.add('hidden');
            initializeAnalytics();
            trackEvent('cookies_accepted', { consent_type: 'all' });
        });
    }
    
    // Cookie reject button
    const rejectBtn = document.getElementById('cookie-reject');
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'none');
            cookieBanner.classList.add('hidden');
            trackEvent('cookies_rejected', { consent_type: 'none' });
        });
    }
    
    // Cookie settings button
    const settingsBtn = document.getElementById('cookie-settings');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            // Open cookie settings modal (can be expanded)
            const message = currentLanguage === 'de' 
                ? 'Cookie-Einstellungen: Diese Website verwendet nur notwendige Cookies.'
                : currentLanguage === 'tr'
                ? 'Çerez Ayarları: Bu web sitesi yalnızca gerekli çerezleri kullanır.'
                : 'Cookie Settings: This website uses only necessary cookies.';
            alert(message);
        });
    }
}

// Analytics placeholder
function initializeAnalytics() {
    console.log('Analytics initialized');
    // Add your analytics code here (Google Analytics, Matomo, etc.)
}

// ============================================
// EVENT LISTENERS
// ============================================

function initializeEventListeners() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Navigation section buttons
    document.querySelectorAll('[data-section]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            const target = document.getElementById(section);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Phone and email links - allow default behavior
    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('tel:')) {
                trackEvent('phone_click', { phone: href });
            } else if (href.startsWith('mailto:')) {
                trackEvent('email_click', { email: href });
            }
        });
    });
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            trackEvent('button_click', { button_text: text });
        });
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================

function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.therapy-card, .news-card, .hours-box, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    
    // Add timestamp
    const eventWithTimestamp = {
        ...eventData,
        timestamp: new Date().toISOString(),
        language: currentLanguage,
        userAgent: navigator.userAgent
    };
    
    // Store in localStorage for analytics
    try {
        const events = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
        events.push({
            name: eventName,
            data: eventWithTimestamp
        });
        
        // Keep only last 100 events
        if (events.length > 100) {
            events.shift();
        }
        
        localStorage.setItem('analyticsEvents', JSON.stringify(events));
    } catch (e) {
        console.error('Error tracking event:', e);
    }
}

function formatPhoneNumber(phone) {
    return phone.replace(/(\d{2})(\d{4})(\d{5})/, '$1 / $2 $3');
}

function getTranslation(key) {
    const translations = {
        de: {
            'contact': 'Kontakt',
            'phone': 'Telefon',
            'email': 'E-Mail',
            'address': 'Adresse',
            'hours': 'Ordinationszeiten',
            'therapies': 'Therapieangebot'
        },
        tr: {
            'contact': 'İletişim',
            'phone': 'Telefon',
            'email': 'E-Posta',
            'address': 'Adres',
            'hours': 'Muayenehane Saatleri',
            'therapies': 'Tedavi Seçenekleri'
        },
        en: {
            'contact': 'Contact',
            'phone': 'Phone',
            'email': 'Email',
            'address': 'Address',
            'hours': 'Consultation Hours',
            'therapies': 'Therapies'
        }
    };
    
    return translations[currentLanguage][key] || key;
}

// ============================================
// RESPONSIVE NAVIGATION
// ============================================

function handleResponsiveNav() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.navbar-menu');
    
    if (window.innerWidth < 768) {
        // Mobile-specific code
        if (navMenu) {
            navMenu.style.flexDirection = 'column';
        }
    } else {
        // Desktop-specific code
        if (navMenu) {
            navMenu.style.flexDirection = 'row';
        }
    }
}

window.addEventListener('resize', function() {
    handleResponsiveNav();
});

// Call on initial load
handleResponsiveNav();

// ============================================
// EXPORT PUBLIC API
// ============================================

window.drcenik = {
    // Language functions
    changeLanguage: function(lang) {
        if (['de', 'tr', 'en'].includes(lang)) {
            currentLanguage = lang;
            updateLanguageUI();
            return true;
        }
        return false;
    },
    
    getCurrentLanguage: function() {
        return currentLanguage;
    },
    
    getTranslation: getTranslation,
    
    // Analytics functions
    trackEvent: trackEvent,
    
    getAnalyticsEvents: function() {
        try {
            return JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
        } catch (e) {
            return [];
        }
    },
    
    clearAnalyticsEvents: function() {
        localStorage.removeItem('analyticsEvents');
        return true;
    },
    
    // Cookie functions
    getCookieConsent: function() {
        return localStorage.getItem('cookieConsent');
    },
    
    setCookieConsent: function(consent) {
        localStorage.setItem('cookieConsent', consent);
        return true;
    },
    
    // Utility functions
    formatPhoneNumber: formatPhoneNumber,
    
    // Version info
    version: '1.0.0',
    author: 'Dr. Fadime Cenik',
    created: '2026-01-29'
};

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    trackEvent('error', {
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    trackEvent('unhandled_rejection', {
        reason: event.reason ? event.reason.toString() : 'Unknown'
    });
});

console.log('Dr. Fadime Cenik - All scripts loaded successfully');
