# Math Arcade

A static, multi-page high school algebra practice app. It runs entirely in the browser and can be hosted directly with GitHub Pages.

## Practice areas

- Algebra I: solve for `x`, proportions, and systems of equations
- Algebra II: factoring, quadratic formula, and completing the square
- English, Spanish, and French interface localization
- A built-in expression calculator

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Files

- `index.html` — course dashboard
- `pages/` — Algebra I and Algebra II practice pages
- `assets/styles.css` — shared visual system
- `assets/problems.js` — generated problem data and worked steps
- `assets/app.js` — localization, practice interactions, and calculator