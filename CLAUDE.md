# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Nexus3**, a Shopify theme built on the Dawn theme framework (version 15.3.0). It's an electronics e-commerce theme specifically designed for selling laptops, gaming equipment, and tech accessories. The theme features modern UI components including image hotspots, dual image sliders, text marquees, testimonials, and newsletter popups.

## Architecture & Structure

### Core Theme Structure
- **`layout/theme.liquid`** - Main HTML template that wraps all pages
- **`sections/`** - Reusable page sections (header, footer, product pages, etc.)
- **`snippets/`** - Small reusable template components
- **`templates/`** - Page-specific templates using JSON format to compose sections
- **`blocks/`** - Custom blocks for enhanced functionality (image-hotspots, newsletter-popup, testimonials)

### Key Custom Components
- **Image Hotspots Section** (`blocks/image-hotspots-section.liquid`) - Interactive product showcases with clickable hotspots
- **Dual Image Slider** - Compare product finishes with slide interaction
- **Text Marquee Banner** - Animated scrolling text with gradient effects
- **Newsletter Popup** - Timed popup with subscription functionality
- **Testimonial Section** - Customer reviews with statistics and ratings

### JavaScript Architecture
- **`assets/global.js`** - Core utilities including `HTMLUpdateUtility` for DOM updates, `SectionId` for section management, and focus management helpers
- **`assets/product-form.js`** - Product add-to-cart functionality with cart panel integration
- **Custom Elements Pattern** - Uses Web Components (customElements.define) for modular JavaScript components
- **Section-based Updates** - AJAX-powered section refreshes without full page reloads

### CSS Architecture
- **Component-based CSS** - Each component has its own CSS file (e.g., `component-card.css`, `component-slider.css`)
- **Section-specific CSS** - Styles for individual sections (e.g., `section-main-product.css`)
- **Responsive Design** - Mobile-first approach with desktop breakpoints at 750px

## Development Workflow

### Theme Development
Since this is a Shopify theme, development typically involves:
1. **Local Development**: Use Shopify CLI (`shopify theme dev`) to sync with Shopify store
2. **File Editing**: Modify Liquid templates, CSS, and JavaScript files locally
3. **Live Preview**: Changes reflect immediately in the development store
4. **Deploy**: Push changes to live theme using `shopify theme push`

### Common Development Commands
```bash
# Start local development server
shopify theme dev

# Push theme to Shopify store
shopify theme push

# Pull latest theme changes
shopify theme pull

# Create new theme on store
shopify theme push --unpublished
```

### Key Configuration Files
- **`config/settings_schema.json`** - Theme customization options in Shopify admin
- **`config/settings_data.json`** - Current theme setting values
- **`templates/*.json`** - Page templates defining section composition

## Important Development Notes

### Liquid Template Engine
- Uses Shopify's Liquid templating language for dynamic content
- Global objects available: `product`, `collection`, `shop`, `customer`, etc.
- Template includes use `{% render 'snippet-name' %}` syntax

### Custom JavaScript Patterns
- Heavy use of custom elements (Web Components)
- Event-driven architecture with `addEventListener`
- AJAX form submissions with section updates
- DOM utilities in `global.js` for consistent HTML updates

### Section-based Architecture
- Pages are composed of sections defined in JSON templates
- Sections are reusable and configurable through Shopify admin
- Custom blocks extend section functionality

### Asset Management
- CSS/JS files in `assets/` folder are automatically minified by Shopify
- Use `{{ 'filename.css' | asset_url | stylesheet_tag }}` for CSS includes
- Use `{{ 'filename.js' | asset_url | script_tag }}` for JS includes

### Internationalization
- Translation files in `locales/` folder
- Use `t:` prefix for translatable strings in Liquid templates
- Multiple language support with schema files for admin interface

## Custom Features Implementation

### Image Hotspots
- Implemented as custom block in `blocks/image-hotspots-section.liquid`
- Uses absolute positioning for hotspot placement
- Tooltip system with customizable styling and content

### Newsletter Integration
- Popup timing controlled via JavaScript
- Cookie-based display frequency control
- Form submissions integrate with Shopify customer data

### Product Showcase
- Dual image slider for product comparisons
- Media gallery with zoom functionality
- Variant picker integration with inventory updates