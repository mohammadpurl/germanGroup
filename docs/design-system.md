# German Group — Premium Automotive Design System

## Brand Identity

German Group is not a typical repair shop.

The brand should feel:

* engineered
* premium
* cinematic
* modern
* minimal
* precise
* trustworthy
* technical
* calm and confident

Visual inspiration:

* Tesla
* Porsche
* Apple
* Uber
* Linear
* Nothing

Avoid:

* generic AI website look
* crowded layouts
* cheap gradients
* heavy shadows
* flashy UI
* template-style sections
* too many colors
* old Iranian website aesthetics

---

# Core Design Principles

## 1. Minimal Luxury

Every section must feel intentional.
Use fewer elements with stronger composition.

## 2. Cinematic Composition

The layout should feel like luxury automotive advertising.

Use:

* dramatic lighting
* strong contrast
* large imagery
* premium spacing
* clean typography

## 3. Engineering Precision

Everything should align perfectly.
Spacing consistency is critical.

Use:

* 8px spacing system
* clean grid structure
* strong alignment
* balanced whitespace

## 4. Motion With Purpose

Animations should feel engineered, not playful.

Motion must:

* guide attention
* enhance luxury feel
* improve flow
* never distract

---

# Color System

## Primary Background

Near Black:

```css
#060606
```

Secondary Background:

```css
#0f0f10
```

Elevated Surface:

```css
rgba(255,255,255,0.04)
```

Glass Surface:

```css
rgba(255,255,255,0.06)
```

Glass Border:

```css
rgba(255,255,255,0.08)
```

Primary Text:

```css
#ffffff
```

Muted Text:

```css
#9ca3af
```

Accent:

```css
#7dd3fc
```

Optional Metallic Accent:

```css
#d1d5db
```

---

# Typography System

## Typography Feel

Typography should feel:

* premium
* expensive
* modern
* clean
* confident

Use:

* large headlines
* tight spacing
* strong hierarchy
* short paragraphs

Avoid:

* long text blocks
* tiny fonts
* decorative fonts

---

# Typography Scale

Hero Headline:

```css
72px desktop
42px mobile
font-weight: 700
line-height: 0.95
letter-spacing: -0.04em
```

Section Title:

```css
48px desktop
32px mobile
font-weight: 600
```

Card Title:

```css
20px
font-weight: 600
```

Body:

```css
16px
line-height: 1.7
```

Muted Text:

```css
14px
opacity: 0.7
```

---

# Layout System

## Container Width

```css
max-width: 1440px
```

## Section Spacing

Desktop:

```css
padding-top: 140px
padding-bottom: 140px
```

Mobile:

```css
padding-top: 80px
padding-bottom: 80px
```

## Grid System

Desktop:

* 12-column grid

Mobile:

* single column
* stacked layout

---

# Hero Section Rules

Hero must:

* feel cinematic
* feel fullscreen
* create emotional impact immediately

Requirements:

* fullscreen height
* luxury automotive imagery
* dramatic lighting
* strong typography
* floating glass cards
* premium CTA
* smooth motion

Avoid:

* clutter
* too much text
* too many buttons

### RTL Hero Image (Persian)

When `lang="fa"`:

* Use **`/Images/Hero-fa.png`** — car composed on the **left**, negative space on the **right** for copy.
* `object-position`: left (~`object-[left_42%]`) so the Porsche stays visible on the left edge.
* Overlay: **`.hero-vignette-fa`** — stronger gradient on the **right** (text side), lighter on the left (car side).
* Text block aligns to the **right** (`justify-start` in RTL flex = inline-start = right).

English (`en`) uses `/Images/Hero.png` with `.hero-vignette` and centered crop.

---

# Floating Glass Cards

Glass cards are critical.

Style:

```css
backdrop-blur: 20px
background: rgba(255,255,255,0.06)
border: 1px solid rgba(255,255,255,0.08)
border-radius: 24px
```

Cards should:

* float softly
* have subtle glow
* feel lightweight
* never overpower content

Use for:

* stats
* services
* trust indicators
* floating UI overlays

---

# Mobile Navigation System

IMPORTANT:
Do NOT use traditional hamburger navigation.

Use:

* floating bottom navigation
* glassmorphism dock
* iOS-inspired navigation

Navigation should:

* be fixed at bottom
* have blur background
* rounded-full container
* floating appearance
* subtle motion
* active state glow

Style:

```css
background: rgba(15,15,16,0.7)
backdrop-filter: blur(20px)
border: 1px solid rgba(255,255,255,0.08)
border-radius: 999px
```

Navigation Items:

* Home
* Services
* Booking
* Gallery
* Contact

Icons:
Use minimal outline icons only.

---

# Motion Design System

Use Framer Motion everywhere.

Motion style:

* smooth
* premium
* subtle
* cinematic

Avoid:

* exaggerated animation
* bouncy effects
* playful motion

---

# Animation Rules

## Scroll Reveal

* fade in
* slight upward motion
* stagger children

## Hover

* subtle scale
* soft glow
* smooth transitions

## Timing

```css
duration: 0.6s–1s
ease: cubic-bezier(0.22, 1, 0.36, 1)
```

---

# Buttons

Buttons should feel:

* premium
* minimal
* tactile

Primary Button:

```css
background: white
color: black
border-radius: 999px
padding: 16px 28px
```

Secondary Button:

```css
background: rgba(255,255,255,0.06)
backdrop-blur
border: 1px solid rgba(255,255,255,0.08)
```

Avoid:

* square buttons
* heavy gradients
* neon styles

---

# Service Cards

Cards must:

* feel clean
* minimal
* technical

Structure:

* icon
* title
* short description
* optional hover motion

Spacing is more important than decoration.

---

# Imagery Direction

Images should feel:

* cinematic
* dark
* premium
* realistic
* technical

Use:

* BMW
* Porsche
* Audi
* Mercedes-Benz

Lighting:

* studio lighting
* dramatic shadows
* metallic reflections
* low-key cinematic light

Avoid:

* stock-like images
* overly saturated images
* bright workshop photos

---

# Before / After Section

This section is important for conversion.

Use:

* slider comparison
* dramatic improvement
* premium framing

Focus:

* detailing
* PDR
* engine restoration
* luxury finish quality

---

# Trust Section

Trust should come from:

* precision
* expertise
* visuals
* atmosphere

Avoid:

* fake counters
* generic testimonials

Use:

* workshop visuals
* process visuals
* real technical atmosphere

---

# SEO Rules

Requirements:

* semantic HTML
* proper heading hierarchy
* fast loading
* image optimization
* WebP images
* lazy loading
* clean metadata

Target:
Lighthouse 90+

---

# Mobile UX Rules

Mobile-first is mandatory.

Requirements:

* thumb-friendly
* large touch targets
* floating bottom navigation
* sticky CTA
* smooth scrolling
* no clutter

The website should feel like a luxury mobile app.

---

# Final Emotional Goal

The website should make users feel:

“These people are elite specialists for premium automobiles.”

The website must feel closer to:

* a luxury automotive experience
* a premium technology brand
* a cinematic product showcase

NOT:

* a normal repair shop website
* a crowded corporate site
* a template
* a cheap automotive UI
