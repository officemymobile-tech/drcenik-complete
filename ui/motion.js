/**
 * Motion System
 * Animations and visual effects for Dr. Cenik AI Website
 */

class MotionSystem {
    constructor() {
        this.typingSpeed = 50; // ms per character
        this.init();
    }

    init() {
        // Listen for intent changes to adjust animation speed
        window.addEventListener('intentSet', (e) => {
            this.adjustSpeed(e.detail.intent);
        });
    }

    // ============================================
    // Typing Effect
    // ============================================
    async typeText(element, text, speed = this.typingSpeed) {
        element.innerHTML = '';
        
        // Add cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        element.appendChild(cursor);

        for (let i = 0; i < text.length; i++) {
            const char = document.createTextNode(text[i]);
            element.insertBefore(char, cursor);
            await this.delay(speed);
        }

        // Remove cursor after typing
        setTimeout(() => {
            cursor.remove();
        }, 1000);
    }

    // ============================================
    // Fade Effects
    // ============================================
    fadeIn(element, duration = 500) {
        element.style.opacity = '0';
        element.style.display = 'block';
        element.style.transition = `opacity ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });

        return new Promise(resolve => setTimeout(resolve, duration));
    }

    fadeOut(element, duration = 500) {
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = '0';

        return new Promise(resolve => {
            setTimeout(() => {
                element.style.display = 'none';
                resolve();
            }, duration);
        });
    }

    // ============================================
    // Slide Effects
    // ============================================
    slideUp(element, duration = 500) {
        element.style.transform = 'translateY(30px)';
        element.style.opacity = '0';
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        });

        return new Promise(resolve => setTimeout(resolve, duration));
    }

    slideDown(element, duration = 500) {
        element.style.transform = 'translateY(-30px)';
        element.style.opacity = '0';
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        });

        return new Promise(resolve => setTimeout(resolve, duration));
    }

    // ============================================
    // Scale Effects
    // ============================================
    scaleIn(element, duration = 400) {
        element.style.transform = 'scale(0.9)';
        element.style.opacity = '0';
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });

        return new Promise(resolve => setTimeout(resolve, duration));
    }

    // ============================================
    // Stagger Animation
    // ============================================
    async staggerIn(elements, delay = 100, animation = 'slideUp') {
        const elemArray = Array.from(elements);
        
        for (let i = 0; i < elemArray.length; i++) {
            const el = elemArray[i];
            el.style.opacity = '0';
        }

        for (let i = 0; i < elemArray.length; i++) {
            const el = elemArray[i];
            await this.delay(delay);
            this[animation](el);
        }
    }

    // ============================================
    // Breathing Animation Control
    // ============================================
    setBreathingSpeed(speed) {
        const root = document.documentElement;
        const speeds = {
            fast: '2s',
            normal: '4s',
            slow: '6s'
        };
        root.style.setProperty('--transition-breathing', `${speeds[speed]} ease-in-out infinite`);
    }

    // ============================================
    // Orb Pulse
    // ============================================
    pulseOrb(element, intensity = 1) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = `orbPulse ${2 / intensity}s ease-in-out infinite`;
    }

    // ============================================
    // Speed Adjustment
    // ============================================
    adjustSpeed(intent) {
        const speeds = {
            urgent: 30,
            curious: 50,
            passive: 70
        };
        this.typingSpeed = speeds[intent] || 50;

        // Adjust breathing animation
        const breathingSpeeds = {
            urgent: 'fast',
            curious: 'normal',
            passive: 'slow'
        };
        this.setBreathingSpeed(breathingSpeeds[intent] || 'normal');
    }

    // ============================================
    // Utility
    // ============================================
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ============================================
    // Page Transitions
    // ============================================
    async transitionToExperience() {
        const entry = document.getElementById('entry');
        const experience = document.getElementById('experience');

        // Fade out entry
        await this.fadeOut(entry, 800);
        entry.classList.remove('active');

        // Show experience
        experience.classList.add('active');
        experience.style.display = 'block';
        await this.fadeIn(experience, 800);

        // Animate modules
        const modules = document.querySelectorAll('.content-module');
        this.staggerIn(modules, 200, 'slideUp');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async transitionToEntry() {
        const entry = document.getElementById('entry');
        const experience = document.getElementById('experience');

        // Fade out experience
        await this.fadeOut(experience, 800);
        experience.classList.remove('active');

        // Show entry
        entry.classList.add('active');
        entry.style.display = 'flex';
        await this.fadeIn(entry, 800);

        // Re-type greeting
        const typingText = document.querySelector('.typing-text');
        const greeting = window.i18n?.get('entry.greeting') || 'Wie kann ich Ihnen helfen?';
        this.typeText(typingText, greeting);
    }

    // ============================================
    // Modal Animations
    // ============================================
    openModal(modal) {
        modal.classList.add('active');
        const content = modal.querySelector('.modal-content');
        if (content) {
            this.scaleIn(content, 300);
        }
    }

    closeModal(modal) {
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.transform = 'scale(0.95)';
            content.style.opacity = '0';
        }
        setTimeout(() => {
            modal.classList.remove('active');
        }, 300);
    }
}

// Initialize and export
window.motion = new MotionSystem();
