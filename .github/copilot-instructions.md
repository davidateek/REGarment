# GitHub Copilot Instructions for REGarment

## Start every session by asking about the task

When a new session begins, **always ask the user to describe the task they want to work on** before doing anything else. Use this prompt:

> "What task would you like to work on today? Please describe it briefly (e.g., adding new locations, fixing a bug, improving the UI, adding a new feature, writing tests, refactoring code, etc.)."

---

## Choose the best model based on the task

Once the user describes their task, use the guide below to recommend or switch to the most appropriate model.

| Task type | Examples | Best model |
|-----------|----------|------------|
| **Simple data / content updates** | Adding entries to `locations.json` or `counties.json`, fixing typos, updating text | **GPT-4.1 mini** — fast and cost-efficient for straightforward edits |
| **CSS / styling tweaks** | Adjusting colours, spacing, responsive layout fixes, minor visual polish | **GPT-4.1 mini** — quick iteration on focused UI changes |
| **Bug fixes (contained)** | Fixing a broken filter, a mis-spelled variable, a broken link | **GPT-4.1** — reliable for targeted debugging with good context awareness |
| **Feature additions (moderate)** | Adding a new county, a new filter type, a new page section | **Claude Sonnet 4.5** — strong reasoning for multi-file changes without over-engineering |
| **Complex features or architecture** | Rebuilding the map layer, adding a backend/API, migrating to a framework, adding a service worker | **Claude Sonnet 4** or **Gemini 2.5 Pro** — deep reasoning for large-scope changes |
| **Exploring or understanding the codebase** | "How does the map filtering work?", "Where is X defined?" | **GPT-4.1** — efficient for read-only exploration and explanations |
| **Writing or improving documentation** | README updates, inline comments, JSDoc | **GPT-4.1 mini** — clear prose generation without needing heavy reasoning |

---

## REGarment project context

Keep this context in mind for every task:

- **Stack:** HTML5 / CSS3 / Vanilla JavaScript — no build step, no bundler, no backend.
- **Hosting:** GitHub Pages (static files only).
- **Key files:**
  - `index.html` — main page
  - `take-back.html` — retail take-back page
  - `css/styles.css` — all styles
  - `js/app.js` — bootstrap & UI interactions
  - `js/map.js` — Leaflet map logic and county navigation
  - `js/directory.js` — search, filter, and county filter logic
  - `data/locations.json` — recycling location data
  - `data/counties.json` — county metadata (centre coordinates, zoom level)
- **Adding a location:** follow the schema in `data/locations.json` (fields: `id`, `name`, `type`, `county`, `address`, `lat`, `lng`, `phone`, `hours`, `accepts`, `website`, `description`).
- **Valid location types:** `donation`, `recycling-bin`, `municipal`, `retail-takeback`.
- **No secrets, no API keys** — keep it that way.

---

## General guidelines

- Make the **smallest change** that fully solves the task.
- Validate changes work without a build step — open `index.html` directly in a browser or use the live site.
- Do not introduce external dependencies (npm packages, CDN scripts) without explicit user approval.
- Keep all JavaScript in vanilla ES6+ — no TypeScript, no frameworks.
- Preserve existing code style (2-space indentation, single quotes in JS).
