# ♻️ REGarment

**Find where and how to recycle clothes in Montgomery County, PA.**

REGarment is a community-driven resource that helps Montgomery County residents find clothing recycling drop-offs, donation centers, and textile take-back programs — all in one place.

## 🌐 Live Site

👉 **[Visit REGarment](https://davidateek.github.io/REGarment/)**

## ✨ Features

- **Interactive Map** — Leaflet-powered map showing all recycling and donation locations with detailed pop-ups
- **Searchable Directory** — Filter locations by type (donation, recycling bin, municipal, retail take-back) and search by name, address, or accepted items
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
│   ├── map.js              # Leaflet map logic
│   └── directory.js        # Search & filter logic
├── data/locations.json     # Recycling location data
└── README.md
```

## 📍 Adding New Locations

Location data lives in `data/locations.json`. Each entry follows this format:

```json
{
  "id": 16,
  "name": "Location Name",
  "type": "donation|recycling-bin|municipal|retail-takeback",
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
