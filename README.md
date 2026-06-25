# ZORO — Money Exchange Landing Page

A pixel-faithful React recreation of the ZORO money-exchange landing page, with live hover/focus interactions on every button, link, card, and input.

## What's inside
- **Navbar** — animated underline on hover, active link state, Login / Sign Up buttons
- **Hero** — headline, CTA buttons with arrow-slide hover, customer rating + avatars
- **Exchange card** — live USD → INR conversion (type a number, the result updates), rotating swap button
- **Features strip** — 5 cards that lift and recolor their icon on hover
- **Popular Exchange Rates** — table with row highlight + trend sparklines
- **Send Money panel** — dark gradient CTA panel with stats
- **Trust bar** — payment partner logos that brighten on hover
- Fully responsive (desktop / tablet / mobile) and respects reduced-motion.

## Requirements
- [Node.js](https://nodejs.org/) version 18 or higher (includes npm)

## How to start the project

```bash
# 1. Open a terminal inside this folder
cd zoro-exchange

# 2. Install dependencies (first time only)
npm install

# 3. Start the development server
npm run dev
```

Then open the URL shown in the terminal (usually **http://localhost:5173**) in your browser.

## Other commands
```bash
npm run build     # create an optimized production build in /dist
npm run preview   # preview the production build locally
```

## Project structure
```
zoro-exchange/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          # app entry
    ├── App.jsx           # page composition
    ├── index.css         # all styling + hover animations
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── ExchangeCard.jsx
        ├── Features.jsx
        ├── RatesAndSend.jsx
        └── TrustBar.jsx
```

## Customizing
- **Colors / fonts** → edit the `:root` tokens at the top of `src/index.css`.
- **Exchange rate** → change the `RATE` constant in `src/components/ExchangeCard.jsx`.
- **Nav links, features, rates** → edit the arrays at the top of each component file.

## Tip: instant preview without setup
Open `preview.html` directly in your browser to see the page immediately — no install needed. (The Vite project above is the real, editable version.)
