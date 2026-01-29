/**
 * AI UX Engine
 * Rule-based AI system for intent detection and behavior tracking
 * Dr. Cenik Medical Website
 */

class UXEngine {
    constructor() {
        // User state
        this.state = {
            intent: null,           // 'urgent', 'curious', 'passive'
            language: this.detectLanguage(),
            confidence: 0.5,        // 0-1 scale
            engagement: 0,          // Engagement score
            simplified: false,      // Simplified mode
            scrollSpeed: 'normal',  // 'fast', 'normal', 'slow'
            timeOnPage: 0,
            sectionsViewed: [],
            hoverDurations: {},
            lastInteraction: Date.now()
        };

        // Behavior tracking
        this.tracking = {
            scrollPositions: [],
            scrollTimestamps: [],
            hoverStart: null,
            hoverElement: null
        };

        // Initialize
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startTimeTracking();
        this.loadSavedState();
    }

    // ============================================
    // Language Detection
    // ============================================
    detectLanguage() {
        // Check saved preference
        const saved = localStorage.getItem('drcenik-language');
        if (saved) return saved;

        // Check browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('de')) return 'de';
        if (browserLang.startsWith('tr')) return 'tr';
        if (browserLang.startsWith('en')) return 'en';

        // Default to German
        return 'de';
    }

    setLanguage(lang) {
        this.state.language = lang;
        localStorage.setItem('drcenik-language', lang);
        document.documentElement.lang = lang;
        
        // Dispatch event for translation system
        window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
    }

    // ============================================
    // Intent Detection
    // ============================================
    setIntent(intent) {
        this.state.intent = intent;
        document.body.setAttribute('data-intent', intent);
        localStorage.setItem('drcenik-intent', intent);

        // Adjust UI based on intent
        this.adjustUIForIntent(intent);

        // Dispatch event
        window.dispatchEvent(new CustomEvent('intentSet', { detail: { intent } }));
    }

    adjustUIForIntent(intent) {
        const adjustments = {
            urgent: {
                animationSpeed: 'fast',
                textLength: 'short',
                ctaStyle: 'prominent',
                tone: 'direct'
            },
            curious: {
                animationSpeed: 'normal',
                textLength: 'medium',
                ctaStyle: 'balanced',
                tone: 'informative'
            },
            passive: {
                animationSpeed: 'slow',
                textLength: 'detailed',
                ctaStyle: 'subtle',
                tone: 'gentle'
            }
        };

        this.state.adjustments = adjustments[intent];
    }

    // ============================================
    // Behavior Tracking
    // ============================================
    setupEventListeners() {
        // Scroll tracking
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => this.analyzeScroll(), 100);
        }, { passive: true });

        // Hover tracking
        document.addEventListener('mouseover', (e) => this.trackHoverStart(e));
        document.addEventListener('mouseout', (e) => this.trackHoverEnd(e));

        // Click tracking
        document.addEventListener('click', (e) => this.trackClick(e));

        // Visibility tracking
        this.setupIntersectionObserver();
    }

    analyzeScroll() {
        const now = Date.now();
        const scrollY = window.scrollY;

        this.tracking.scrollPositions.push(scrollY);
        this.tracking.scrollTimestamps.push(now);

        // Keep only last 10 scroll events
        if (this.tracking.scrollPositions.length > 10) {
            this.tracking.scrollPositions.shift();
            this.tracking.scrollTimestamps.shift();
        }

        // Calculate scroll speed
        if (this.tracking.scrollPositions.length >= 2) {
            const positions = this.tracking.scrollPositions;
            const timestamps = this.tracking.scrollTimestamps;
            const len = positions.length;

            const distance = Math.abs(positions[len - 1] - positions[len - 2]);
            const time = timestamps[len - 1] - timestamps[len - 2];
            const speed = distance / time; // pixels per ms

            if (speed > 2) {
                this.state.scrollSpeed = 'fast';
            } else if (speed < 0.5) {
                this.state.scrollSpeed = 'slow';
            } else {
                this.state.scrollSpeed = 'normal';
            }

            // Adjust confidence based on scroll behavior
            this.updateConfidence();
        }
    }

    trackHoverStart(e) {
        const target = e.target.closest('[data-track-hover]');
        if (target) {
            this.tracking.hoverStart = Date.now();
            this.tracking.hoverElement = target.dataset.trackHover;
        }
    }

    trackHoverEnd(e) {
        if (this.tracking.hoverStart && this.tracking.hoverElement) {
            const duration = Date.now() - this.tracking.hoverStart;
            const element = this.tracking.hoverElement;

            if (!this.state.hoverDurations[element]) {
                this.state.hoverDurations[element] = [];
            }
            this.state.hoverDurations[element].push(duration);

            // Long hover = high interest
            if (duration > 2000) {
                this.state.engagement += 0.1;
            }

            this.tracking.hoverStart = null;
            this.tracking.hoverElement = null;
        }
    }

    trackClick(e) {
        this.state.lastInteraction = Date.now();
        this.state.engagement += 0.05;
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (sectionId && !this.state.sectionsViewed.includes(sectionId)) {
                        this.state.sectionsViewed.push(sectionId);
                        this.state.engagement += 0.1;

                        // Make section visible
                        entry.target.classList.add('visible');
                    }
                }
            });
        }, {
            threshold: 0.3
        });

        // Observe all content modules
        document.querySelectorAll('.content-module').forEach(module => {
            observer.observe(module);
        });
    }

    // ============================================
    // Confidence & Engagement
    // ============================================
    updateConfidence() {
        // Fast scrolling = lower confidence (user is scanning)
        // Slow scrolling = higher confidence (user is reading)
        if (this.state.scrollSpeed === 'fast') {
            this.state.confidence = Math.max(0, this.state.confidence - 0.05);
        } else if (this.state.scrollSpeed === 'slow') {
            this.state.confidence = Math.min(1, this.state.confidence + 0.02);
        }

        // Dispatch confidence update
        window.dispatchEvent(new CustomEvent('confidenceUpdate', {
            detail: { confidence: this.state.confidence }
        }));
    }

    startTimeTracking() {
        setInterval(() => {
            this.state.timeOnPage += 1;

            // Increase engagement over time
            if (this.state.timeOnPage % 30 === 0) {
                this.state.engagement = Math.min(1, this.state.engagement + 0.05);
            }
        }, 1000);
    }

    // ============================================
    // Dynamic Content Adjustment
    // ============================================
    getTextLength() {
        if (!this.state.intent) return 'medium';
        return this.state.adjustments?.textLength || 'medium';
    }

    getTone() {
        // Combine language tone with intent tone
        const languageTones = {
            de: 'structured',
            tr: 'warm',
            en: 'minimal'
        };

        const intentTones = {
            urgent: 'direct',
            curious: 'informative',
            passive: 'gentle'
        };

        return {
            language: languageTones[this.state.language],
            intent: intentTones[this.state.intent] || 'informative'
        };
    }

    getCTAText() {
        const ctaVariants = {
            urgent: {
                de: 'Jetzt Termin vereinbaren',
                tr: 'Hemen randevu alın',
                en: 'Book now'
            },
            curious: {
                de: 'Mehr erfahren',
                tr: 'Daha fazla bilgi alın',
                en: 'Learn more'
            },
            passive: {
                de: 'Wenn Sie bereit sind',
                tr: 'Hazır olduğunuzda',
                en: 'When you\'re ready'
            }
        };

        const intent = this.state.intent || 'curious';
        const lang = this.state.language;

        return ctaVariants[intent][lang];
    }

    // ============================================
    // Simplified Mode
    // ============================================
    toggleSimplified(enabled) {
        this.state.simplified = enabled;
        document.body.setAttribute('data-simplified', enabled);

        window.dispatchEvent(new CustomEvent('simplifiedModeChange', {
            detail: { simplified: enabled }
        }));
    }

    // ============================================
    // State Persistence
    // ============================================
    loadSavedState() {
        const savedIntent = localStorage.getItem('drcenik-intent');
        if (savedIntent) {
            this.state.intent = savedIntent;
            document.body.setAttribute('data-intent', savedIntent);
        }
    }

    saveState() {
        localStorage.setItem('drcenik-state', JSON.stringify({
            intent: this.state.intent,
            language: this.state.language,
            simplified: this.state.simplified
        }));
    }

    // ============================================
    // Reset
    // ============================================
    reset() {
        localStorage.removeItem('drcenik-intent');
        localStorage.removeItem('drcenik-state');
        this.state.intent = null;
        this.state.confidence = 0.5;
        this.state.engagement = 0;
        this.state.sectionsViewed = [];
        document.body.removeAttribute('data-intent');

        window.dispatchEvent(new CustomEvent('uxReset'));
    }
}

// Initialize and export
window.uxEngine = new UXEngine();
