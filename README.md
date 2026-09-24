# FRIZZAVITA™ — La Vita Frizzante
> *"Assapora la vita frizzante."*

**FRIZZAVITA™** is a modern Italian sparkling soda brand inspired by Italian summer, Mediterranean lifestyle, Milanese fashion, vintage soda advertising, citrus orchards, elegance, and youthful energy.

This repository contains a **production-ready frontend application** built with **React**, **Vite**, **Three.js / React Three Fiber**, and modern CSS. It is designed to deploy directly to **GitHub Pages**.

---

## ✦ Key Features

- **Interactive 3D Can Experience**: Real-time 3D aluminum soda can rendered in WebGL with realistic brushed metallic specularity, pull-tab geometry, rim detail, cold condensation bump maps, floating carbonation sparkles, and 360° orbit drag.
- **Dynamic Flavor Switching**: Real-time texture synthesis for all 4 signature Italian flavors:
  - `01` — **Arancia Rossa** (Sicilian Blood Orange)
  - `02` — **Limone** (Amalfi Coast Lemon)
  - `03` — **Pompelmo** (Calabrian Pink Grapefruit)
  - `04` — **Pesca Bianca** (Romagna White Peach)
- **Procedural Web Audio Engine**: Realistic synthesized soda tab opening, gas release, and effervescent fizz sound without external audio files.
- **Motion Poster Gallery**: Vintage & futurist Italian advertising campaign posters with film grain, dynamic badges, and parallax.
- **Sensory Dossier & Ingredients**: Complete taste radar profiles, gastronomic pairing notes, and 100% IGP certified origin breakdowns.
- **Responsive & Accessible**: Fully optimized from 320px mobile screens to 4K displays, with `prefers-reduced-motion` compliance and WebGL fallbacks.

---

## ✦ Tech Stack

- **Framework**: React 18
- **Bundler / Dev Server**: Vite
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Audio Engine**: Web Audio API (zero external mp3 dependencies)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti

---

## ✦ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/`.

### 3. Build Production Bundle
```bash
npm run build
```
The optimized static output will be generated inside the `dist/` directory.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## ✦ GitHub Pages Deployment

The Vite configuration is pre-configured with `base: './'` so that all relative assets, scripts, and CSS files resolve seamlessly on GitHub Pages subpaths:
`https://<USERNAME>.github.io/<REPOSITORY-NAME>/`

### Method 1: Automatic Deployment via GitHub Actions (Recommended)

Create a workflow file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

1. Push your repository to GitHub.
2. In your repository on GitHub, go to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. Your website will be automatically built and published!

### Method 2: Manual Deployment via `gh-pages` Branch

```bash
# 1. Build the project
npm run build

# 2. Deploy dist directory to gh-pages branch
npx -y gh-pages -d dist
```

---

## ✦ Project Structure

```
├── public/
│   ├── icons/            # Brand icons & Favicon
│   └── robots.txt        # SEO robot directives
├── src/
│   ├── components/
│   │   ├── AudioToggle.jsx          # Ambient sound controller
│   │   ├── Can3D.jsx                # Three.js 3D Aluminum Can
│   │   ├── CustomCursor.jsx         # Luxury desktop cursor
│   │   ├── FizzBurstCanvas.jsx      # Effervescent particles
│   │   ├── FlavorCard.jsx           # Product cards with taste radar
│   │   ├── FlavorModal.jsx          # Sensory dossier modal
│   │   ├── Navbar.jsx               # Sticky header with mobile drawer
│   │   └── VipModal.jsx             # Tasting Club registration
│   ├── data/
│   │   ├── brandContent.js          # Posters, manifesto, accolades
│   │   └── flavors.js               # 4 signatures & tasting notes
│   ├── sections/
│   │   ├── Hero.jsx                 # "LA VITA. FRIZZANTE."
│   │   ├── BrandIntro.jsx           # "MADE FOR SUNNY DAYS."
│   │   ├── CanExperienceSection.jsx # 3D Studio & Controls
│   │   ├── FlavorCollection.jsx     # Master 4 Flavors Grid
│   │   ├── MotionPosters.jsx        # Italian Poster Series
│   │   ├── IngredientStory.jsx      # "THE SECRET IS SIMPLE."
│   │   ├── LifestyleSection.jsx     # "FROM MILANO TO THE MEDITERRANEO."
│   │   ├── ProductShowcase.jsx      # "OPEN. POUR. VIVI."
│   │   ├── BrandStory.jsx           # "UNA STORIA DI GUSTO."
│   │   ├── CTASection.jsx           # "READY TO FRIZZARE?"
│   │   └── Footer.jsx               # Luxury Minimal Footer
│   ├── styles/
│   │   └── index.css                # Luxury Italian Design System
│   ├── utils/
│   │   ├── sound.js                 # Web Audio API Synth Engine
│   │   └── textureGenerator.js      # Procedural 3D Label & Bump Generator
│   ├── App.jsx                      # Main Component
│   └── main.jsx                     # Application Root
├── index.html                       # HTML5 Template with Typography
├── vite.config.js                   # Vite config with relative base path
└── package.json                     # Scripts & Dependencies
```

---

## ✦ Brand Manifesto

> *"Frizzavita è nata per celebrare quei momenti che non hanno bisogno di un'occasione speciale. Dal primo raggio di sole che bacia i tetti di Milano, alle calde serate estive sulla scogliera di Capri: ogni sorso è un invito a vivere frizzante."*

---

## ✦ License & Credits

© 2026 FRIZZAVITA™ S.r.l. Milano, Italia. All rights reserved.
