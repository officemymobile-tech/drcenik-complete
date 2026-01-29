# Dr. Fadime Cenik - Website

Standalone, fully responsive website for Dr. Fadime Cenik's medical practice in Vienna.

## 📋 Features

- **Multilingual Support**: German (DE), Turkish (TR), English (EN)
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Modern UI/UX**: Dark theme with gold accents
- **Fully Standalone**: No external dependencies, works offline
- **GDPR Compliant**: Cookie banner and privacy policy included
- **Fast Loading**: Optimized CSS and JavaScript
- **Professional Design**: Medical practice branding

## 📁 Project Structure

```
drcenik-complete/
├── index.html              # Main page (all sections, all languages)
├── css/
│   └── style.css          # Complete stylesheet
├── js/
│   └── main.js            # JavaScript (language switching, analytics)
├── pages/
│   ├── impressum.html     # Legal page (Imprint)
│   ├── datenschutz.html   # Privacy policy
│   └── agb.html           # Terms and conditions
├── img/                   # Images folder (empty - uses emoji)
├── fonts/                 # Fonts folder (uses Google Fonts CDN)
├── .gitignore             # Git ignore file
├── CNAME                  # GitHub Pages custom domain
└── README.md              # This file
```

## 🚀 Quick Start

### Local Development

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/officemymobile-tech/drcenik-complete.git
   cd drcenik-complete
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No server required

3. **Test locally**
   - All features work offline
   - Language switching works with localStorage
   - Cookie banner functions properly

### Deploy to GitHub Pages

1. **Create GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Dr. Cenik website"
   git remote add origin https://github.com/YOUR-USERNAME/drcenik-complete.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to Repository Settings
   - Navigate to Pages section
   - Select `main` branch as source
   - Choose root directory `/`

3. **Set custom domain**
   - In Pages settings, enter custom domain: `drcenik.at`
   - Update DNS records (A records or CNAME)
   - GitHub will automatically provision HTTPS

## 🌐 DNS Configuration

For custom domain `drcenik.at`:

### Option 1: A Records (Recommended)
```
drcenik.at    A    185.199.108.153
drcenik.at    A    185.199.109.153
drcenik.at    A    185.199.110.153
drcenik.at    A    185.199.111.153
www.drcenik.at CNAME officemymobile-tech.github.io
```

### Option 2: CNAME Records
```
drcenik.at    CNAME    officemymobile-tech.github.io
www.drcenik.at CNAME    officemymobile-tech.github.io
```

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #D4AF37;      /* Gold */
    --secondary-color: #2A2A3E;    /* Dark Blue */
    --dark-bg: #1a1a2e;            /* Dark Background */
    /* ... more colors ... */
}
```

### Fonts
Change fonts in `css/style.css`:
```css
--font-display: 'Playfair Display', serif;
--font-body: 'Montserrat', sans-serif;
```

### Content
Edit text in `index.html`:
- German: `.de` class
- Turkish: `.tr` class
- English: `.en` class

### Add New Language
1. Add new language code (e.g., `fr` for French)
2. Add text elements with `class="fr"`
3. Update `main.js` to include new language in array: `['de', 'tr', 'en', 'fr']`

## 🔧 JavaScript Features

### Language Switching
```javascript
// Change language programmatically
window.drcenik.changeLanguage('tr'); // Switch to Turkish
```

### Event Tracking
```javascript
// Track custom events
window.drcenik.trackEvent('button_click', { button_text: 'Termin buchen' });
```

### Get Analytics
```javascript
// Retrieve all tracked events
const events = window.drcenik.getAnalyticsEvents();
console.log(events);
```

### Cookie Management
```javascript
// Check cookie consent
const consent = window.drcenik.getCookieConsent();
console.log(consent); // 'all', 'none', or null
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## ♿ Accessibility

- Semantic HTML5 structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast colors (WCAG AA compliant)
- Readable font sizes

## 🔒 Security & Privacy

- **No external trackers**: All analytics stored locally
- **GDPR Compliant**: Cookie banner and privacy policy
- **No data collection**: Unless explicitly provided
- **SSL/TLS**: Automatic with GitHub Pages
- **No cookies by default**: Only with user consent

## 📊 Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Language not switching
- Clear browser cache and localStorage
- Check browser console for errors
- Verify `.de`, `.tr`, `.en` classes exist

### Styles not loading
- Check CSS file path in HTML
- Verify file permissions
- Clear browser cache

### Links not working
- Ensure relative paths are correct
- Check file names for typos
- Verify pages folder exists

## 📞 Contact

**Dr. med. univ. Fadime Cenik**
- Phone: 01 / 769 29 91
- Email: office@drcenik.at
- Address: Kaiser-Ebersdorfer-Straße 328, 1110 Wien, Austria

## 📄 Legal

- [Impressum](pages/impressum.html)
- [Datenschutzerklärung](pages/datenschutz.html)
- [AGB](pages/agb.html)

## 📝 License

This website and all its content are the property of Dr. Fadime Cenik. All rights reserved.

## 🎯 Version

- **Version**: 1.0.0
- **Created**: 2026-01-29
- **Last Updated**: 2026-01-29

---

**Built with ❤️ for Dr. Fadime Cenik**
