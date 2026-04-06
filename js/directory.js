/* ============================================================
   directory.js — Searchable / filterable location directory
   ============================================================ */

let allLocations = [];
let activeFilter = 'all';

function initDirectory(locations) {
  allLocations = locations;
  populateCountyDirSelector(locations);
  renderDirectory(filterLocations(locations));
  setupSearch();
  setupFilters();
  updateStats(locations);
}

function populateCountyDirSelector(locations) {
  const select = document.getElementById('county-select-dir');
  if (!select) return;

  const defaultCounty = typeof getSelectedCounty === 'function' ? getSelectedCounty() : 'Montgomery';
  const counties = [...new Set(locations.map(l => l.county))].sort();

  select.innerHTML = '';
  const allOpt = document.createElement('option');
  allOpt.value = 'All Pennsylvania';
  allOpt.textContent = '🗺️ All Pennsylvania';
  select.appendChild(allOpt);

  counties.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = `${c} County`;
    if (c === defaultCounty) opt.selected = true;
    select.appendChild(opt);
  });

  select.addEventListener('change', (e) => {
    // Sync map county selector
    if (typeof setSelectedCounty === 'function') {
      setSelectedCounty(e.target.value);
    }
    filterAndRender();
  });
}

function renderDirectory(locations) {
  const grid = document.getElementById('directory-grid');
  if (!grid) return;

  if (locations.length === 0) {
    grid.innerHTML = `<div class="no-results">
      No locations match your search. Try a different keyword or filter.<br/>
      <a href="https://github.com/davidateek/REGarment/issues/new?title=New+Location+Suggestion" style="margin-top:.5rem;display:inline-block;">Suggest a location →</a>
    </div>`;
    return;
  }

  grid.innerHTML = locations.map(loc => {
    const typeClass = `type-${loc.type}`;
    const badgeClass = `badge-${loc.type}`;
    const typeLabel = {
      'donation': 'Donation',
      'recycling-bin': 'Recycling Bin',
      'municipal': 'Municipal',
      'retail-takeback': 'Retail Take-Back'
    }[loc.type] || loc.type;

    const acceptsTags = loc.accepts
      .map(a => `<span class="accept-tag">${a}</span>`)
      .join('');

    const websiteLink = loc.website
      ? `<a href="${loc.website}" target="_blank" rel="noopener" class="card-link">Visit Website →</a>`
      : '';

    const phoneDetail = loc.phone
      ? `<div class="card-detail"><span class="icon">📞</span>${loc.phone}</div>`
      : '';

    return `
      <div class="location-card ${typeClass}" onclick="focusLocation(${loc.lat}, ${loc.lng})" style="cursor:pointer;" title="Click to view on map">
        <div class="card-header">
          <h3>${loc.name}</h3>
          <span class="card-type-badge ${badgeClass}">${typeLabel}</span>
        </div>
        <div class="card-detail"><span class="icon">📍</span>${loc.address}</div>
        <div class="card-detail"><span class="icon">🏛️</span>${loc.county} County</div>
        <div class="card-detail"><span class="icon">🕐</span>${loc.hours}</div>
        ${phoneDetail}
        <p class="card-detail" style="margin-top:.5rem;">${loc.description}</p>
        <div class="card-accepts">${acceptsTags}</div>
        ${websiteLink}
      </div>
    `;
  }).join('');
}

function setupSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', () => {
    filterAndRender();
  });
}

function setupFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      filterAndRender();
    });
  });
}

function filterLocations(locations) {
  const selectedCounty = typeof getSelectedCounty === 'function' ? getSelectedCounty() : 'Montgomery';
  let filtered = locations || allLocations;

  // County filter
  if (selectedCounty && selectedCounty !== 'All Pennsylvania') {
    filtered = filtered.filter(loc => loc.county === selectedCounty);
  }

  return filtered;
}

function filterAndRender() {
  const query = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
  const selectedCounty = typeof getSelectedCounty === 'function' ? getSelectedCounty() : 'Montgomery';

  let filtered = allLocations;

  // County filter
  if (selectedCounty && selectedCounty !== 'All Pennsylvania') {
    filtered = filtered.filter(loc => loc.county === selectedCounty);
  }

  // Type filter
  if (activeFilter !== 'all') {
    filtered = filtered.filter(loc => loc.type === activeFilter);
  }

  // Text search
  if (query) {
    filtered = filtered.filter(loc =>
      loc.name.toLowerCase().includes(query) ||
      loc.address.toLowerCase().includes(query) ||
      loc.description.toLowerCase().includes(query) ||
      loc.county.toLowerCase().includes(query) ||
      loc.accepts.some(a => a.toLowerCase().includes(query))
    );
  }

  renderDirectory(filtered);

  if (typeof addMarkers === 'function') {
    addMarkers(filtered);
  }
}

function updateStats(locations) {
  const countEl = document.getElementById('stat-locations');
  const typesEl = document.getElementById('stat-types');
  const countiesEl = document.getElementById('stat-counties');
  if (countEl) countEl.textContent = locations.length;
  if (typesEl) {
    const types = new Set(locations.map(l => l.type));
    typesEl.textContent = types.size;
  }
  if (countiesEl) {
    const c = new Set(locations.map(l => l.county));
    countiesEl.textContent = c.size;
  }
}
