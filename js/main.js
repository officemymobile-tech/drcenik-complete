// Dr. Fadime Cenik - SPA Main Application

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupScreenTransitions();
    setupHamburgerMenu();
    setupAccordions();
    setupSmoothScroll();
}

// Screen Transitions
function setupScreenTransitions() {
    const choiceCards = document.querySelectorAll('.choice-card');
    const entryScreen = document.getElementById('entry-screen');
    const experienceScreen = document.getElementById('experience-screen');

    choiceCards.forEach(card => {
        card.addEventListener('click', () => {
            const intent = card.dataset.intent;
            transitionToExperience(intent);
        });
    });

    // Back to entry from logo
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            entryScreen.classList.add('active');
            experienceScreen.classList.remove('active');
            window.scrollTo(0, 0);
        });
    }
}

function transitionToExperience(intent) {
    const entryScreen = document.getElementById('entry-screen');
    const experienceScreen = document.getElementById('experience-screen');

    entryScreen.classList.remove('active');
    experienceScreen.classList.add('active');

    // Scroll to relevant section based on intent
    setTimeout(() => {
        if (intent === 'urgent') {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        } else if (intent === 'curious') {
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
        } else {
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        }
    }, 300);
}

// Hamburger Menu
function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('mobile-open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('mobile-open');
        });
    });
}

// Accordions
function setupAccordions() {
    setupServiceAccordions();
    setupFAQAccordions();
}

function setupServiceAccordions() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card, index) => {
        const header = card.querySelector('.service-header');

        header.addEventListener('click', () => {
            // Close all other cards
            serviceCards.forEach((otherCard, otherIndex) => {
                if (otherIndex !== index) {
                    otherCard.classList.remove('active');
                }
            });

            // Toggle current card
            card.classList.toggle('active');
        });
    });

    // Open first card by default
    if (serviceCards.length > 0) {
        serviceCards[0].classList.add('active');
    }
}

function setupFAQAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Don't prevent default for entry screen link
            if (href === '#entry-screen') {
                return;
            }

            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();

                const target = document.querySelector(href);
                const headerHeight = document.querySelector('.sticky-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Keyboard Accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target;

        if (target.classList.contains('service-header') || target.classList.contains('faq-question')) {
            e.preventDefault();
            target.click();
        }
    }
});

// Intersection Observer for animations
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

document.querySelectorAll('.content-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

console.log('Dr. Fadime Cenik - SPA loaded successfully');
