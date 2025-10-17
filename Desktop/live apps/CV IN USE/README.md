# RPG CV Portfolio

A retro RPG-themed portfolio website built with Next.js 14, featuring smooth animations, parallax effects, and an interactive carousel.

## Features

- 🎮 **5-second RPG loading screen** with smooth transition to homepage
- 🌟 **Parallax hero section** with layered background elements
- 🔄 **Section orientation changes** on scroll with smooth transitions
- 🔍 **Zoom-in section transitions** with CSS variables for timing
- ✨ **Floating/scrolling letter background** until Projects section
- 🎠 **Rotating center-highlight carousel** for Projects with Embla
- 🖱️ **Retro RPG cursor** with custom SVG assets
- ♿ **Full accessibility compliance** with focus outlines, landmarks, and reduced motion
- 📱 **Mobile-first responsive design** with desktop polish

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** for animations
- **Lenis** for smooth scrolling
- **Embla Carousel** for project showcase
- **Lucide React** for icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with CSS variables
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components (PixelBorder, ProgressBar)
│   ├── LoadingScreen.tsx # RPG loading screen
│   ├── Hero.tsx          # Parallax hero section
│   ├── Portfolio.tsx     # Carousel project showcase
│   ├── FloatingLetters.tsx # Animated background letters
│   ├── RetroCursor.tsx   # Custom cursor component
│   └── SectionWrapper.tsx # Section transition wrapper
├── lib/                  # Utility libraries
│   └── lenis-provider.tsx # Smooth scrolling provider
├── public/               # Static assets
│   └── cursors/          # Custom cursor SVGs
└── data/                 # Data files
    └── userData.ts       # Portfolio data
```

## Animation Features

- **CSS Variables**: All timing and easing controlled via CSS custom properties
- **Reduced Motion**: Respects `prefers-reduced-motion` for accessibility
- **Micro/Macro Animations**: 60-120ms micro, 300-800ms macro transitions
- **Smooth Scrolling**: Lenis integration with reduced motion support
- **Parallax Effects**: Multi-layer background with mouse interaction
- **3D Transforms**: Section orientation changes with perspective

## Accessibility

- Semantic HTML landmarks
- Focus-visible outlines
- Alt text for images
- Skip links for keyboard navigation
- Reduced motion support
- High contrast ratios (AA+)

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- ES6+ JavaScript features
- CSS Custom Properties support

## License

MIT License - feel free to use this as a template for your own portfolio!



