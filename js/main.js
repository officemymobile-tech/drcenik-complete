// ============================================
// Dr. Fadime Cenik - Main Application
// Clean Code Architecture
// ============================================

// ============================================
// HAMBURGER MENU FUNCTIONALITY
// ============================================
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('mobile-open');
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('mobile-open');
    });
});

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SERVICE CARD ACCORDION
// ============================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    const header = card.querySelector('.service-header');
    
    header.addEventListener('click', () => {
        // Close other cards
        serviceCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('active');
            }
        });
        
        // Toggle current card
        card.classList.toggle('active');
    });
});

// ============================================
// FAQ ACCORDION
// ============================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// ============================================
// SCROLL INDICATOR
// ============================================
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update any scroll indicator if needed
    // This can be used for progress bars or other indicators
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add keyboard navigation for accordion items
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target;
        
        if (target.classList.contains('service-header')) {
            e.preventDefault();
            target.click();
        }
        
        if (target.classList.contains('faq-question')) {
            e.preventDefault();
            target.click();
        }
    }
});

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
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dr. Fadime Cenik - Website loaded successfully');
    
    // Ensure first service card is open by default
    const firstServiceCard = document.querySelector('.service-card');
    if (firstServiceCard) {
        firstServiceCard.classList.add('active');
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector of target element
 * @param {number} offset - Offset in pixels
 */
function smoothScrollTo(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (element) {
        const top = element.offsetTop - offset;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

/**
 * Toggle element visibility
 * @param {string} selector - CSS selector of target element
 */
function toggleElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.toggle('hidden');
    }
}

/**
 * Add active class to element
 * @param {string} selector - CSS selector of target element
 */
function setActive(selector) {
    document.querySelectorAll(selector).forEach(el => {
        el.classList.remove('active');
    });
    document.querySelector(selector).classList.add('active');
}

// Export functions for external use if needed
window.DrCenik = {
    smoothScrollTo,
    toggleElement,
    setActive
};
