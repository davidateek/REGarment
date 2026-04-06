# ♻️ REGarment

**Find where and how to recycle clothes across Pennsylvania.**

REGarment is a community-driven resource that helps Pennsylvania residents find clothing recycling drop-offs, donation centers, and textile take-back programs — all in one place. Browse by county, starting with Montgomery County and expanding across the state.

## 🌐 Live Site

👉 **[Visit REGarment](https://davidateek.github.io/REGarment/)**

## ✨ Features

- **Interactive Map** — Leaflet-powered map with county-by-county navigation and detailed pop-ups
- **County Selector** — Browse locations by county (Montgomery, Philadelphia, Delaware, Chester, Bucks, Lehigh, and more coming)
- **Searchable Directory** — Filter locations by county, type (donation, recycling bin, municipal, retail take-back), and keyword search
- **Tips & Guides** — Learn what can be recycled, how to prepare items, upcycling ideas, and retail take-back programs
- **Mobile Friendly** — Fully responsive design that works on all devices

## 🛠 Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- [Leaflet.js](https://leafletjs.com/) with OpenStreetMap tiles
- Hosted on [GitHub Pages](https://pages.github.com/)
- No build step, no API keys, no backend

## 📂 Project Structure

```
REGarment/
├── index.html              # Main page
├── css/styles.css          # All styles
├── js/
│   ├── app.js              # Bootstrap & UI interactions
│   ├── map.js              # Leaflet map logic + county navigation
│   └── directory.js        # Search, filter & county filter logic
├── data/
│   ├── locations.json      # Recycling location data (35+ locations)
│   └── counties.json       # County metadata (center coords, zoom)
└── README.md
```

## 📍 Adding New Locations

Location data lives in `data/locations.json`. Each entry follows this format:

```json
{
  "id": 36,
  "name": "Location Name",
  "type": "donation|recycling-bin|municipal|retail-takeback",
  "county": "County Name",
  "address": "123 Main St, Town, PA 19000",
  "lat": 40.1234,
  "lng": -75.1234,
  "phone": "(555) 123-4567",
  "hours": "Mon–Fri 9am–5pm",
  "accepts": ["clothing", "shoes", "accessories"],
  "website": "https://example.com",
  "description": "Brief description of the location."
}
```

To suggest a new location, [open an issue](https://github.com/davidateek/REGarment/issues/new?title=New+Location+Suggestion&body=Name:%0AAddress:%0AType:%0ADetails:).

## 📄 License

MIT
