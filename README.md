# श्रीमद्भगवद्गीता - Bhagavad Gita & Mahabharata Website

A stunning, interactive website dedicated to the timeless wisdom of the Bhagavad Gita and the epic Mahabharata. Built with Next.js (App Router), Tailwind CSS, and GSAP animations.

## Features

### 🏠 Home Page
- Full-screen parallax Kurukshetra battlefield background
- Interactive hotspots revealing key Mahabharata events
- Animated Sanskrit verses appearing word by word
- Modal popups with Sanskrit shlokas and English meanings
- Background music toggle (play/mute)

### 📖 About Page
- Comprehensive story of Mahabharata and Bhagavad Gita
- Scroll-triggered animations for each section
- Beautiful royal-themed cards with icons
- Statistics counter showcasing epic facts

### 📚 Geeta Gyan (Knowledge)
- All 18 chapters of the Bhagavad Gita
- Chapter navigation with animated transitions
- Daily random verse widget with share functionality
- Sanskrit shlokas with transliteration and English meanings
- Audio recitation option (placeholder for future integration)

### 👑 Characters Page
- 8+ major characters from the Mahabharata
- Interactive character cards with hover effects
- Modal biographies with detailed information
- AI-generated character images (using Pexels stock photos)
- Voice narration option (coming soon)

### 🖼️ Gallery
- Animated image grid with category filters
- Lightbox view with GSAP zoom effects
- Categories: Divine, Characters, Events, Places
- Beautiful royal-themed image presentations

### 📅 Timeline & Map
- Horizontal scrollable timeline of key events
- Interactive Kurukshetra map with clickable hotspots
- Event details with context and historical significance
- Animated markers with hover effects

### 🎯 Quiz
- 10 interactive quiz questions
- Animated progress bar
- Instant feedback with explanations
- Beautiful result card with score breakdown
- Retry functionality

### 📧 Contact & Feedback
- Elegant contact form with validation
- Success animation on submission
- Quick links to all pages
- Royal footer with project information
- Privacy and terms links

## Design Theme

### Colors
- **Royal Blue**: #0a1929 (background)
- **Deep Blue**: #1a2332 (cards)
- **Gold**: #d4af37 (accents)
- **Light Gold**: #f4e4b7 (highlights)

### Fonts
- **Headings**: Cinzel / Playfair Display
- **Body**: Inter / Lora
- **Sanskrit**: Noto Serif Devanagari

### Animations (GSAP)
- Full-page intro animation with golden light sweep
- Scroll-triggered section fade/slide animations
- Word-by-word Sanskrit verse animations
- Smooth page transitions
- Hover glow and zoom effects
- Background parallax on home page
- Modal entrance/exit animations

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React
- **Fonts**: Google Fonts
- **Language**: JavaScript (no TypeScript)
- **Images**: Pexels stock photos

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build

```bash
npm run build
```

## Project Structure

```
├── app/
│   ├── page.js              # Home page
│   ├── about/page.js        # About page
│   ├── geeta-gyan/page.js   # Geeta Gyan page
│   ├── characters/page.js   # Characters page
│   ├── gallery/page.js      # Gallery page
│   ├── timeline/page.js     # Timeline page
│   ├── quiz/page.js         # Quiz page
│   ├── contact/page.js      # Contact page
│   ├── layout.js            # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── Navigation.js        # Main navigation
│   └── LoadingAnimation.js  # Intro animation
└── public/                  # Static assets
```

## Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## Future Enhancements

- Audio recitation for Sanskrit verses
- AI voice narration for character stories
- User authentication for saving progress
- More quiz categories and difficulty levels
- Downloadable content (PDFs, wallpapers)
- Multi-language support
- Dark/Light mode toggle

## License

This project is created for educational and spiritual purposes. All content related to Bhagavad Gita and Mahabharata is in the public domain.

---

**ॐ धर्मो रक्षति रक्षितः**

*Dharma protects those who protect dharma*
