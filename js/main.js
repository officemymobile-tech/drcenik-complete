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
    initBookingWizard();
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
// 3-Step Booking Wizard
// ============================================
function initBookingWizard() {
    const form = document.getElementById('booking-form');
    if (!form) return;
    
    const nextButtons = form.querySelectorAll('.next-step');
    const prevButtons = form.querySelectorAll('.prev-step');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const currentStep = form.querySelector('.form-step.active');
            const currentStepNum = parseInt(currentStep.getAttribute('data-step'));
            
            if (!validateStep(currentStep)) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            if (currentStepNum === 2) {
                updateConfirmationSummary();
            }
            
            if (currentStepNum < 3) {
                currentStep.classList.remove('active');
                const nextStep = form.querySelector(`.form-step[data-step="${currentStepNum + 1}"]`);
                nextStep.classList.add('active');
                updateStepIndicator(currentStepNum + 1);
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const currentStep = form.querySelector('.form-step.active');
            const currentStepNum = parseInt(currentStep.getAttribute('data-step'));
            
            if (currentStepNum > 1) {
                currentStep.classList.remove('active');
                const prevStep = form.querySelector(`.form-step[data-step="${currentStepNum - 1}"]`);
                prevStep.classList.add('active');
                updateStepIndicator(currentStepNum - 1);
            }
        });
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.querySelector('input[name="service"]:checked')?.value
        };
        console.log('Booking request:', formData);
        showToast('Thank you! We will contact you shortly to confirm your appointment.', 'success');
        setTimeout(() => {
            form.reset();
            form.querySelector('.form-step.active').classList.remove('active');
            form.querySelector('.form-step[data-step="1"]').classList.add('active');
            updateStepIndicator(1);
        }, 2000);
    });
}

function validateStep(step) {
    const inputs = step.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff6b6b';
        } else {
            input.style.borderColor = '';
        }
    });
    return isValid;
}

function updateStepIndicator(stepNum) {
    const stepNumbers = document.querySelectorAll('.step-number');
    stepNumbers.forEach((step, index) => {
        if (index + 1 <= stepNum) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function updateConfirmationSummary() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.querySelector('input[name="service"]:checked')?.value || '';
    
    document.getElementById('confirm-name').textContent = name;
    document.getElementById('confirm-email').textContent = email;
    document.getElementById('confirm-phone').textContent = phone;
    
    const serviceLabels = {
        'massage': 'Massage Therapy',
        'movement': 'Movement Therapy',
        'electro': 'Electrotherapy',
        'consultation': 'Consultation & Examination'
    };
    document.getElementById('confirm-service').textContent = serviceLabels[service] || service;
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 2px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInUp 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// Initialization complete
// ============================================
console.log('✓ Dr. Fadime Cenik - Website initialized');
console.log('✓ Quiet Luxury Medical Design - All systems ready');
