# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for Adla Mendes, a social media specialist based in Recife, Brazil. The site showcases her services, testimonials, and portfolio for potential clients looking for social media management, content creation, and digital marketing services.

## Architecture & Technology Stack

**Frontend:**
- Pure HTML5, CSS3, and vanilla JavaScript (no frameworks)
- Bootstrap 5.3.6 for responsive grid system
- Font Awesome 6.4.0 for icons
- Custom fonts: Montserrat, Playfair Display, and TheSilverEditorial

**Structure:**
- Single-page application with smooth scrolling navigation
- Modular CSS architecture with separate files for different sections
- Component-based JavaScript for interactive features

## File Structure & Organization

```
/
├── index.html                 # Main HTML file
├── css/                      # Stylesheets directory
│   ├── styles.css           # Main stylesheet with fonts, base styles, and sections
│   ├── hero-styles.css      # Hero section specific styles
│   ├── new-sections.css     # Additional sections styling
│   ├── services-cta.css     # Services and CTA sections
│   ├── testimonials.css     # Testimonials carousel styles
│   └── why-choose.css       # "Why choose" section styles
├── js/                      # JavaScript directory
│   ├── main.js             # Core functionality (navigation, animations, scroll effects)
│   └── testimonials.js     # Testimonials carousel component
├── images/                  # Image assets
├── Logos/                   # Client logos and brand assets
└── fontes/                  # Custom font files
```

## Key Components & Features

**Navigation System (`main.js`):**
- Fixed transparent navbar with blur effect
- Mobile hamburger menu with overlay
- Smooth scrolling and active section highlighting
- Logo animation effects

**Testimonials Carousel (`testimonials.js`):**
- Custom-built carousel component
- Touch/swipe support for mobile
- Responsive design (3 items on desktop, 1 on mobile)
- Keyboard navigation support

**Animations & Interactions:**
- Intersection Observer for scroll-triggered animations
- Logo slider with infinite scroll
- Hover effects and transitions
- Mobile-optimized touch interactions

## Development Workflow

**No Build Process:**
This is a static website with no build tools, package managers, or compilation steps. Simply:
1. Edit files directly
2. Open `index.html` in a browser to test
3. Use a local server for development (e.g., `python -m http.server` or VS Code Live Server)

**Testing:**
- Manual testing across devices and browsers
- Test responsive breakpoints: mobile (≤576px), tablet (≤768px), desktop (≥992px)
- Verify touch interactions on mobile devices

## Responsive Design Breakpoints

- **Mobile small:** ≤576px
- **Mobile:** ≤768px  
- **Tablet:** ≤992px
- **Desktop:** ≥992px

Each CSS file contains comprehensive media queries for all breakpoints.

## Color Scheme & Branding

- **Primary Blue:** #000B39 (backgrounds, text)
- **Accent Green:** #C9E165 (highlights, buttons, CTAs)
- **Light Background:** #E0E3DF (section backgrounds)
- **Text Colors:** #202B18 (body text), #fff (on dark backgrounds)

## Font Usage Guidelines

- **Headers:** TheSilverEditorial (elegant serif for titles)
- **Body Text:** Montserrat (clean sans-serif for readability)  
- **Accent Text:** Playfair Display (sophisticated serif for emphasis)

## Content Sections

1. **Hero Section:** Main banner with animated background
2. **Partners/Logos:** Animated logo slider
3. **Services:** Grid of services offered
4. **Plans:** Pricing cards with WhatsApp integration
5. **Testimonials:** Interactive carousel
6. **About:** Personal information and statistics
7. **Contact:** Contact form and information

## External Integrations

- **WhatsApp:** Direct messaging links in pricing cards
- **Calendly:** Meeting scheduling integration
- **Bootstrap CDN:** Responsive framework
- **Font Awesome CDN:** Icon library

## Performance Considerations

- Optimized images in WebP format where possible
- Efficient CSS with mobile-first approach
- Minimal JavaScript with event delegation
- Smooth animations using CSS transforms and opacity

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Fallbacks for older browsers where needed