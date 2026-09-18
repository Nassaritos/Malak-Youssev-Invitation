# Youssef & Malak — A Digital Invitation

A premium, editorial engagement invitation. Ivory and soft pastels, Cormorant
Garamond typography, a felucca drifting across the Nile, and sparse botanical
framing — built to feel like opening a physical luxury invitation.

**Youssef & Malak · Friday, 16 October · 6:00 PM · Taracina Wedding Venue**

## Stack

- **React 18 + Vite 6** — fast, tiny, no framework overhead
- **Framer Motion** — subtle fades, slow reveals, gentle floral sway
- **Modular CSS** — one stylesheet per component, design tokens in `src/styles/index.css`
- **Google Fonts** — Cormorant Garamond (display serif) + Montserrat (sans)

No UI libraries, no CSS framework, no tracking. Mobile-first and fully responsive.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  App.jsx                     section order: Hero → Journey → Details → RSVP → Closing
  data/
    event.js                  single source of truth for names / date / venue / countdown target
    flowers.js                floral asset manifest (see "Swapping the flowers" below)
  hooks/useCountdown.js       live countdown to the event
  components/
    Navigation.jsx            minimal floating nav (word-list on desktop, sheet on mobile)
    Hero.jsx                  the opening — names, date, venue, floral corners
    Journey.jsx               "A little journey to us" + the Nile + arrival steps
    NileScene.jsx             atmospheric river band with a drifting felucca
    Details.jsx               editorial event details + woven-in countdown
    Rsvp.jsx                  elegant RSVP form
    Closing.jsx               final "We can't wait to celebrate with you"
    Flora.jsx                 reusable placed-flower element (entrance + endless sway)
public/images/flowers/        the botanical assets
```

## Editing the event details

Everything textual lives in `src/data/event.js` — names, day, date, time, venue,
and the `datetime` the countdown targets. Change it once, it updates everywhere.

## Swapping the flowers

Every flower is referenced through **`src/data/flowers.js`**, so the artwork can be
replaced without touching any component.

The site ships with soft, hand-drawn botanical **SVGs** as placeholders. To use real
**transparent-background photographic PNGs** instead (recommended for maximum realism):

1. Drop your cut-out PNGs into `public/images/flowers/`
   (e.g. `pink-rose-01.png`, `white-rose-01.png`, `lavender-flower-01.png`).
   Use flowers photographed individually and isolated on a **transparent** background —
   no white boxes, no rectangular edges.
2. Point the manifest at them:

   ```js
   export const FLOWERS = {
     roseBlush:   '/images/flowers/pink-rose-01.png',
     roseWhite:   '/images/flowers/white-rose-01.png',
     rosebud:     '/images/flowers/rosebud-01.png',
     eucalyptus:  '/images/flowers/eucalyptus-01.png',
     lavender:    '/images/flowers/lavender-flower-01.png',
     babysBreath: '/images/flowers/white-baby-breath-01.png',
     petal:       '/images/flowers/petal-01.png',
   }
   ```

All positioning, sizing, layering and animation keep working — each flower is placed
absolutely with a soft entrance and a slow sway, framing the composition rather than
filling it.

## The RSVP form

The RSVP is intentionally not wired to a backend: submissions are saved to the
visitor's `localStorage` and a graceful thank-you is shown. To collect responses for
real, replace the marked block in `src/components/Rsvp.jsx` (`onSubmit`) with a `fetch`
POST to your endpoint (Formspree, a Google Apps Script, Airtable, a serverless
function, etc.).

## Accessibility & motion

- Semantic landmarks, labelled form controls, visible focus states.
- All motion respects `prefers-reduced-motion` — animations reduce to instant.
- No horizontal scroll at any width; decorative florals bleed off-edge safely.
# Malak-Youssev-Invitation
