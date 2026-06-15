# AlesSanna Ilusalong — landing page (Three.js)

An improved, modern rebuild of the landing page for **AlesSanna Ilusalong**,
a beauty/hair salon in Pärnu, Estonia. Inspired by
[alessannailu.com](https://alessannailu.com/).

## Highlights

- **Three.js animated background** — a calm, flowing domain-warped gradient
  shader (warm nude / champagne / rose palette) with drifting "dust-in-light"
  particles and gentle mouse parallax. Matches the brand idea *"a space where
  beauty breathes calmly."*
- **Trilingual** — ET / RU / EN toggle (the original supports the same three
  languages). Choice is remembered in `localStorage`.
- **Fully responsive** with a mobile menu and an accessible nav.
- **Graceful degradation** — if WebGL is unavailable, or the visitor prefers
  reduced motion, the page falls back to a static CSS gradient and skips the
  animation entirely.
- **Performance-minded** — capped pixel ratio, lower particle count on mobile,
  and rendering pauses when the tab is hidden.
- **No build step** — plain HTML/CSS/JS. Three.js is loaded from a CDN via an
  ES-module import map.

## Sections

Hero · Services · Masters · About · Products · Gift card · Contact (with a
mailto booking form, since online booking on the original is currently paused).

## Run locally

Because it uses ES modules, serve it over HTTP (don't open the file directly):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Files

```
├── index.html        # markup + import map
├── css/style.css     # styles, palette, responsive, reveal animations
├── js/scene.js       # Three.js shader background + particles (ES module)
└── js/app.js         # i18n, nav, scroll-reveal, mobile menu, form
```

## Notes / customisation

- Prices are intentionally not hardcoded (the original quotes per
  consultation); the Services section explains pricing is given on a free
  consultation.
- Master photos use elegant initial avatars as placeholders — drop real
  images into `assets/` and swap the `.master__photo` markup when available.
- Contact details (address, phone, email, hours, Instagram) are taken from the
  original site and live in `index.html`.

## Contact data used

- Härma Keskus, Tallinna mnt 70, Pärnu 80034, Estonia
- +372 529 8225 · alessanna.ilusalong@gmail.com
- Mon–Fri 10:00–18:00 · Sat 10:00–16:00
- Instagram: @alessanna.ilusalong · @natali.kolorist
