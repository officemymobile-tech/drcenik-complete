/**
 * Main Application Script
 * Dr. Cenik AI-Driven Medical Website
 */

// ============================================
// i18n System
// ============================================
class I18n {
    constructor() {
        this.translations = {};
        this.currentLang = 'de';
    }

    async init() {
        // Load all translations
        const langs = ['de', 'tr', 'en'];
        for (const lang of langs) {
            try {
                const response = await fetch(`i18n/${lang}.json`);
                this.translations[lang] = await response.json();
            } catch (e) {
                console.error(`Failed to load ${lang} translations:`, e);
            }
        }

        // Set initial language from UX engine
        this.currentLang = window.uxEngine?.state.language || 'de';
        this.applyTranslations();

        // Listen for language changes
        window.addEventListener('languageChange', (e) => {
            this.currentLang = e.detail.language;
            this.applyTranslations();
        });
    }

    get(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }
        
        return value;
    }

    applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const translation = this.get(key);
            if (translation && translation !== key) {
                el.textContent = translation;
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;

        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        window.uxEngine?.setLanguage(lang);
        this.applyTranslations();
    }
}

// ============================================
// App Controller
// ============================================
class App {
    constructor() {
        this.i18n = new I18n();
        this.init();
    }

    async init() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
        }

        // Initialize i18n
        await this.i18n.init();

        // Setup entry experience
        this.setupEntry();

        // Setup AI Orb
        this.setupOrb();

        // Setup modals
        this.setupModals();

        // Setup expertise cards
        this.setupExpertiseCards();

        // Start typing effect
        this.startTypingEffect();

        // Make i18n globally available
        window.i18n = this.i18n;
    }

    // ============================================
    // Entry Experience
    // ============================================
    setupEntry() {
        const choiceCards = document.querySelectorAll('.choice-card');
        
        choiceCards.forEach(card => {
            card.addEventListener('click', () => {
                const intent = card.dataset.intent;
                this.handleIntentChoice(intent);
            });
        });
    }

    handleIntentChoice(intent) {
        // Set intent in UX engine
        window.uxEngine?.setIntent(intent);

        // Transition to experience
        window.motion?.transitionToExperience();
    }

    async startTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        // Wait a bit for translations to load
        await new Promise(resolve => setTimeout(resolve, 500));

        const greeting = this.i18n.get('entry.greeting');
        window.motion?.typeText(typingText, greeting);
    }

    // ============================================
    // AI Orb
    // ============================================
    setupOrb() {
        const orb = document.getElementById('ai-orb');
        const orbCore = orb?.querySelector('.orb-core');
        const orbOptions = orb?.querySelectorAll('.orb-option');

        if (!orb || !orbCore) return;

        // Toggle menu on click
        orbCore.addEventListener('click', () => {
            orb.classList.toggle('open');
        });

        // Handle option clicks
        orbOptions?.forEach(option => {
            option.addEventListener('click', () => {
                const action = option.dataset.action;
                this.handleOrbAction(action);
                orb.classList.remove('open');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!orb.contains(e.target)) {
                orb.classList.remove('open');
            }
        });
    }

    handleOrbAction(action) {
        switch (action) {
            case 'guide':
                this.showGuide();
                break;
            case 'question':
                this.openModal('question-modal');
                break;
            case 'simplify':
                this.toggleSimplified();
                break;
            case 'language':
                this.openModal('language-modal');
                break;
        }
    }

    showGuide() {
        // Scroll to first unviewed section
        const modules = document.querySelectorAll('.content-module');
        for (const module of modules) {
            if (!module.classList.contains('visible')) {
                module.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
        }

        // If all viewed, go to action
        document.getElementById('action-module')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }

    toggleSimplified() {
        const isSimplified = document.body.getAttribute('data-simplified') === 'true';
        window.uxEngine?.toggleSimplified(!isSimplified);
    }

    // ============================================
    // Modals
    // ============================================
    setupModals() {
        // Language modal
        const langModal = document.getElementById('language-modal');
        const langBtns = langModal?.querySelectorAll('.lang-btn');

        langBtns?.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.i18n.setLanguage(lang);
                this.closeModal('language-modal');
                
                // Re-type greeting if on entry screen
                const entry = document.getElementById('entry');
                if (entry?.classList.contains('active')) {
                    const typingText = document.querySelector('.typing-text');
                    const greeting = this.i18n.get('entry.greeting');
                    window.motion?.typeText(typingText, greeting);
                }
            });
        });

        // Close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                if (modal) {
                    window.motion?.closeModal(modal);
                }
            });
        });

        // Close on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', () => {
                const modal = overlay.closest('.modal');
                if (modal) {
                    window.motion?.closeModal(modal);
                }
            });
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            window.motion?.openModal(modal);
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            window.motion?.closeModal(modal);
        }
    }

    // ============================================
    // Expertise Cards
    // ============================================
    setupExpertiseCards() {
        const cards = document.querySelectorAll('.expertise-card');

        cards.forEach(card => {
            const header = card.querySelector('.expertise-header');
            
            header?.addEventListener('click', () => {
                // Close other cards
                cards.forEach(c => {
                    if (c !== card) {
                        c.classList.remove('expanded');
                    }
                });

                // Toggle current card
                card.classList.toggle('expanded');
            });
        });
    }
}

// ============================================
// Initialize App
// ============================================
const app = new App();
