// ============================================
// Dr. Fadime Cenik - Vanilla JavaScript
// Framework-free interactions
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initServiceCards();
    initFAQItems();
    initSmoothScroll();
});

// Service Cards - Accordion functionality
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const header = card.querySelector('.service-header');
        header.addEventListener('click', function() {
            serviceCards.forEach(otherCard => {
                if (otherCard !== card) otherCard.classList.remove('active');
            });
            card.classList.toggle('active');
        });
    });
}

// FAQ Items - Accordion functionality
function initFAQItems() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.service-card.active, .faq-item.active').forEach(item => {
            item.classList.remove('active');
        });
    }
});

console.log('Dr. Fadime Cenik - Website initialized');
