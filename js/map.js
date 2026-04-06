/* ============================================================
   map.js — Leaflet map initialization for REGarment
   ============================================================ */

const PA_CENTER = [40.9, -77.8];
const PA_ZOOM = 7;
const DEFAULT_COUNTY = 'Montgomery';

const TYPE_COLORS = {
  'donation':        '#2d6a4f',
  'recycling-bin':   '#e76f51',
  'municipal':       '#457b9d',
  'retail-takeback':  '#9b5de5'
};

const TYPE_LABELS = {
  'donation':        'Donation Center',
  'recycling-bin':   'Recycling Bin',
  'municipal':       'Municipal Program',
  'retail-takeback':  'Retail Take-Back'
};

let map;
let markers = [];
let counties = [];
let selectedCounty = DEFAULT_COUNTY;

async function initMap(locations) {
  // Load county data
  try {
    const resp = await fetch('data/counties.json');
    counties = await resp.json();
  } catch (err) {
    console.error('Failed to load counties:', err);
  }

  const defaultCounty = counties.find(c => c.name === DEFAULT_COUNTY) || { center: [40.15, -75.30], zoom: 11 };

  map = L.map('map', {
    scrollWheelZoom: false
  }).setView(defaultCounty.center, defaultCounty.zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);

  populateCountySelector();
  addMarkers(locations);
}

function populateCountySelector() {
  const select = document.getElementById('county-select-map');
  if (!select || counties.length === 0) return;

  select.innerHTML = '';
  counties.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.textContent = c.name === 'All Pennsylvania' ? '🗺️ All Pennsylvania' : `${c.name} County`;
    if (c.name === DEFAULT_COUNTY) opt.selected = true;
    select.appendChild(opt);
  });

  select.addEventListener('change', (e) => {
    selectedCounty = e.target.value;
    flyToCounty(selectedCounty);

    // Sync directory county selector
    const dirSelect = document.getElementById('county-select-dir');
    if (dirSelect) dirSelect.value = selectedCounty;

    // Trigger directory re-render
    if (typeof filterAndRender === 'function') filterAndRender();
  });
}

function flyToCounty(countyName) {
  const county = counties.find(c => c.name === countyName);
  if (!county) return;
  map.flyTo(county.center, county.zoom, { duration: 1.2 });
}

function getSelectedCounty() {
  return selectedCounty;
}

function setSelectedCounty(name) {
  selectedCounty = name;
  const mapSelect = document.getElementById('county-select-map');
  if (mapSelect) mapSelect.value = name;
  flyToCounty(name);
}

function createMarkerIcon(type) {
  const color = TYPE_COLORS[type] || '#2d6a4f';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background: ${color};
      width: 28px; height: 28px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid #fff;
      box-shadow: 0 2px 6px rgba(0,0,0,.3);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30]
  });
}

function addMarkers(locations) {
  clearMarkers();

  locations.forEach(loc => {
    const icon = createMarkerIcon(loc.type);
    const marker = L.marker([loc.lat, loc.lng], { icon })
      .addTo(map)
      .bindPopup(createPopupHTML(loc));
    markers.push(marker);
  });
}

function clearMarkers() {
  markers.forEach(m => m.remove());
  markers = [];
}

function createPopupHTML(loc) {
  const typeLabel = TYPE_LABELS[loc.type] || loc.type;
  const website = loc.website
    ? `<a href="${loc.website}" target="_blank" rel="noopener" style="color:#2d6a4f;font-weight:600;">Visit Website →</a>`
    : '';
  const phone = loc.phone ? `<div style="margin:2px 0;">📞 ${loc.phone}</div>` : '';
  const accepts = loc.accepts
    .map(a => `<span style="display:inline-block;background:#d8f3dc;color:#2d6a4f;padding:2px 8px;border-radius:10px;font-size:12px;margin:2px;">${a}</span>`)
    .join('');

  return `
    <div style="min-width:220px;max-width:280px;font-family:system-ui,sans-serif;">
      <h3 style="margin:0 0 4px;font-size:15px;color:#2d6a4f;">${loc.name}</h3>
      <span style="display:inline-block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;padding:2px 8px;border-radius:10px;background:${TYPE_COLORS[loc.type]}22;color:${TYPE_COLORS[loc.type]};">${typeLabel}</span>
      <div style="margin:8px 0 4px;font-size:13px;color:#555;">
        <div>📍 ${loc.address}</div>
        <div>🕐 ${loc.hours}</div>
        ${phone}
      </div>
      <p style="font-size:13px;color:#666;margin:6px 0;">${loc.description}</p>
      <div style="margin:6px 0;">${accepts}</div>
      ${website}
    </div>
  `;
}

function focusLocation(lat, lng) {
  map.setView([lat, lng], 15);
  markers.forEach(m => {
    const pos = m.getLatLng();
    if (Math.abs(pos.lat - lat) < 0.0001 && Math.abs(pos.lng - lng) < 0.0001) {
      m.openPopup();
    }
  });
}
