# Hinstantt Website

Marketing site for Hinstantt, ported from the approved standalone design to a Vite + React 18 app.

## Stack
- Vite 5 + React 18
- Self-hosted fonts: Instrument Serif, Inter, JetBrains Mono (`public/fonts/`)
- Single-page app, no router (one long landing page)

## Local development
```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build
```bash
npm run build      # outputs to dist/
npm run preview    # serve the built dist/ locally
```

## Project structure
```
index.html              app shell + #root + .grain overlay
src/main.jsx            React entry, mounts <App/>
src/App.jsx             all components (Nav, Hero, PlatformLayers, etc.)
src/styles.css          design system (tokens, @font-face, animations)
src/assets/             wordmark PNGs (dark + white)
public/fonts/           17 self-hosted woff2 files (served at /fonts/...)
```

## Notes
- Viewport is locked to `width=1280` (matches the approved design, which is desktop-first with no mobile breakpoints). Mobile scales the desktop layout down, same as the source.
- The hero uses a canvas plasma/globe effect (`PlasmaCanvas`) and an intro `Loader` animation.
- Headings call for `General Sans`; it is not bundled and falls back to Inter, exactly as in the approved file. To add it later, drop the woff2 into `public/fonts/` and add an `@font-face` in `styles.css`.

## Deployment
This is a static site. `npm run build` produces `dist/`, which can be served from any static host (AWS S3 + CloudFront, etc.). See the deploy commands provided alongside this repo.
