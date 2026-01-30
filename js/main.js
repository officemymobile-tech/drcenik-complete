// ============================================
// Dr. Fadime Cenik - Vanilla JavaScript
// Framework-free interactions
// "Quiet Luxury Medical Design" philosophy
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initServiceCards();
    initFAQItems();
    initSmoothScroll();
    initHeaderScroll();
    initHamburgerMenu();
    updateAriaAttributes();
});

// ============================================
// Service Cards - Accordion functionality
// ============================================
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const header = card.querySelector('h3');
        
        if (!header) return;
        
        header.style.cursor = 'pointer';
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        
        const toggleHandler = function() {
            // Close other cards
            serviceCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                    const otherIcon = otherCard.querySelector('.toggle-icon');
                    if (otherIcon) otherIcon.textContent = '+';
                }
            });
            
            // Toggle current card
            card.classList.toggle('active');
            const icon = header.querySelector('.toggle-icon');
            if (icon) {
                icon.textContent = card.classList.contains('active') ? '−' : '+';
            }
        };
        
        header.addEventListener('click', toggleHandler);
        header.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleHandler();
            }
        });
    });
}

// ============================================
// FAQ Items - Accordion functionality
// ============================================
function initFAQItems() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (!question) return;
        
        question.style.cursor = 'pointer';
        
        const toggleHandler = function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    if (otherQuestion) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        const otherIcon = otherQuestion.querySelector('.faq-toggle');
                        if (otherIcon) otherIcon.textContent = '+';
                    }
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const isActive = item.classList.contains('active');
            question.setAttribute('aria-expanded', isActive);
            const icon = question.querySelector('.faq-toggle');
            if (icon) {
                icon.textContent = isActive ? '−' : '+';
            }
        };
        
        question.addEventListener('click', toggleHandler);
        question.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleHandler();
            }
        });
    });
}

// ============================================
// Smooth scroll for anchor links
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                // Close mobile menu if open
                const hamburger = document.getElementById('hamburger');
                const nav = document.getElementById('main-nav');
                if (hamburger && nav) {
                    hamburger.setAttribute('aria-expanded', 'false');
                    nav.classList.remove('active');
                }
                
                // Smooth scroll with offset for sticky header
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Header scroll effects
// ============================================
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        
        // Add blur effect when scrolled
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }, false);
}

// ============================================
// Hamburger menu toggle
// ============================================
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');
    
    if (!hamburger || !nav) return;
    
    hamburger.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
            hamburger.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
        }
    });
}

// ============================================
// Update aria attributes for better accessibility
// ============================================
function updateAriaAttributes() {
    // Update service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const header = card.querySelector('h3');
        if (header) {
            header.setAttribute('role', 'button');
            header.setAttribute('tabindex', '0');
        }
    });
    
    // Update FAQ questions
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        if (!question.hasAttribute('aria-expanded')) {
            question.setAttribute('aria-expanded', 'false');
        }
    });
}

// ============================================
// Keyboard accessibility - Escape key
// ============================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close all active accordions
        document.querySelectorAll('.service-card.active, .faq-item.active').forEach(item => {
            item.classList.remove('active');
            const icon = item.querySelector('.toggle-icon, .faq-toggle');
            if (icon) icon.textContent = '+';
            const question = item.querySelector('.faq-question');
            if (question) question.setAttribute('aria-expanded', 'false');
        });
        
        // Close mobile menu
        const hamburger = document.getElementById('hamburger');
        const nav = document.getElementById('main-nav');
        if (hamburger && nav) {
            hamburger.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
        }
    }
});

// ============================================
// Initialization complete
// ============================================
console.log('✓ Dr. Fadime Cenik - Website initialized');
console.log('✓ Quiet Luxury Medical Design - All systems ready');
