/* Move-In Guide — single-file app logic.
   Cities register themselves via App.registerCity() from data/<city>.js. */

const App = (() => {
  const cities = {};
  let currentCity = null;

  // ---------- storage helpers (namespaced per city) ----------
  const key = (suffix) => `mig:${currentCity.id}:${suffix}`;
  const load = (suffix, fallback) => {
    try {
      const raw = localStorage.getItem(key(suffix));
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  };
  const save = (suffix, value) => localStorage.setItem(key(suffix), JSON.stringify(value));

  // ---------- utils ----------
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const el = (html) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };

  function haversineKm(lat1, lng1, lat2, lng2) {
    const R = 6371, rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad, dLng = (lng2 - lng1) * rad;
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  function downloadFile(name, text, type = "application/json") {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // ---------- Supabase (shared catalog) ----------
  const sbConfig = () => {
    const c = window.MIG_CONFIG || {};
    return c.supabaseUrl && c.supabaseAnonKey ? c : null;
  };

  async function sbFetch(path, opts = {}) {
    const cfg = sbConfig();
    const res = await fetch(`${cfg.supabaseUrl}/rest/v1/${path}`, {
      ...opts,
      headers: {
        apikey: cfg.supabaseAnonKey,
        Authorization: `Bearer ${cfg.supabaseAnonKey}`,
        "Content-Type": "application/json",
        ...(opts.headers || {}),
      },
    });
    if (!res.ok) throw new Error(`Supabase error ${res.status}: ${await res.text()}`);
    return res.status === 204 || opts.method === "POST" ? null : res.json();
  }

  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  // ---------- personal data backup ----------
  function exportPersonal() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.startsWith("mig:")) data[k] = localStorage.getItem(k);
    }
    downloadFile("move-in-guide-backup.json", JSON.stringify(data, null, 2));
  }

  function importPersonal(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const keys = Object.keys(data).filter((k) => k.startsWith("mig:"));
        if (!keys.length) { alert("That file doesn't look like a Move-In Guide backup."); return; }
        keys.forEach((k) => localStorage.setItem(k, data[k]));
        alert(`Restored ${keys.length} item(s).`);
        location.reload();
      } catch (e) {
        alert("Couldn't read that backup: " + e.message);
      }
    };
    reader.readAsText(file);
  }

  // CSV parser that handles quoted fields and commas inside quotes.
  function parseCSV(text) {
    const rows = [];
    let row = [], field = "", inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (c === '"') inQuotes = false;
        else field += c;
      } else if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field); field = "";
        if (row.some((f) => f.trim() !== "")) rows.push(row);
        row = [];
      } else field += c;
    }
    if (field !== "" || row.length) { row.push(field); if (row.some((f) => f.trim() !== "")) rows.push(row); }
    if (!rows.length) return [];
    const headers = rows[0].map((h) => h.trim().toLowerCase());
    return rows.slice(1).map((r) =>
      Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? "").trim()])));
  }

  // Normalize one apartment record from CSV row or JSON object.
  function normalizeApartment(raw) {
    const get = (...names) => {
      for (const n of names) {
        for (const k of Object.keys(raw)) {
          if (k.toLowerCase().replace(/[\s_-]/g, "") === n) return raw[k];
        }
      }
      return undefined;
    };
    const num = (v) => {
      if (v === undefined || v === null || v === "") return null;
      const n = parseFloat(String(v).replace(/[^\d.,-]/g, "").replace(",", "."));
      return Number.isFinite(n) ? n : null;
    };
    return {
      name: get("name", "title") || "Unnamed listing",
      url: get("url", "link", "listing") || "",
      address: get("address", "location") || "",
      neighborhood: get("neighborhood", "area", "barrio", "zona") || "",
      sqm: num(get("sqm", "squaremeters", "size", "sqft", "squarefootage")),
      price: num(get("price", "rent", "pricepermonth", "monthlyrent")),
      bedrooms: num(get("bedrooms", "rooms", "beds")),
      lat: num(get("lat", "latitude")),
      lng: num(get("lng", "lon", "long", "longitude")),
      notes: get("notes", "comments", "note") || "",
    };
  }

  // ---------- views ----------
  const view = () => document.getElementById("view");

  function renderApartments() {
    const c = currentCity;
    const apartments = load("apartments", []);
    const savedAnchor = load("anchor", { type: "anchor", id: c.anchors[0]?.id });

    const root = el(`<div></div>`);
    root.appendChild(el(`
      <p class="page-intro">Upload a <strong>CSV or JSON</strong> of apartment listings and rank them by
      distance to the place you care about most — like school. Your data stays in this browser only.
      <a href="#" id="dl-template">Download the CSV template</a> to see the expected columns.</p>`));

    // Upload zone
    const zone = el(`
      <label class="upload-zone" id="upload-zone">
        <span class="big">📁</span>
        <strong>Drop a .csv or .json file here</strong> or click to choose one
        <input type="file" id="apt-file" accept=".csv,.json,text/csv,application/json">
        <div class="muted" style="margin-top:6px">Columns: name, url, address, neighborhood, sqm, price, bedrooms, lat, lng, notes</div>
      </label>`);
    root.appendChild(zone);

    // Anchor picker
    const anchorOpts = c.anchors.map((a) =>
      `<option value="${esc(a.id)}">${esc(a.name)}</option>`).join("");
    const anchorRow = el(`
      <div class="anchor-row">
        <label class="field">Rank by distance to
          <select id="anchor-select">${anchorOpts}<option value="__custom">Custom point…</option></select>
        </label>
        <label class="field" id="custom-lat-wrap" hidden>Latitude
          <input type="number" step="any" id="custom-lat" placeholder="40.4169">
        </label>
        <label class="field" id="custom-lng-wrap" hidden>Longitude
          <input type="number" step="any" id="custom-lng" placeholder="-3.7035">
        </label>
        <button class="btn subtle" id="clear-apts">Clear my listings</button>
      </div>`);
    root.appendChild(anchorRow);

    const listWrap = el(`<div></div>`);
    root.appendChild(listWrap);

    function currentAnchor() {
      const sel = root.querySelector("#anchor-select").value;
      if (sel === "__custom") {
        const lat = parseFloat(root.querySelector("#custom-lat").value);
        const lng = parseFloat(root.querySelector("#custom-lng").value);
        return Number.isFinite(lat) && Number.isFinite(lng)
          ? { name: "your custom point", lat, lng } : null;
      }
      return c.anchors.find((a) => a.id === sel) || null;
    }

    function renderList() {
      const anchor = currentAnchor();
      const apts = load("apartments", []);
      listWrap.innerHTML = "";

      if (!apts.length) {
        listWrap.appendChild(el(`<div class="empty-state">
          No listings yet. Upload a file above — as you browse Idealista, Spotahome, etc.,
          collect candidates into a spreadsheet and export it as CSV.</div>`));
        return;
      }

      const ranked = apts.map((a) => ({
        ...a,
        distKm: anchor && a.lat != null && a.lng != null
          ? haversineKm(a.lat, a.lng, anchor.lat, anchor.lng) : null,
      })).sort((a, b) => {
        if (a.distKm == null && b.distKm == null) return 0;
        if (a.distKm == null) return 1;
        if (b.distKm == null) return -1;
        return a.distKm - b.distKm;
      });

      if (anchor) {
        listWrap.appendChild(el(`<p class="muted">Sorted by straight-line distance to
          <strong>${esc(anchor.name)}</strong>. Walk times are rough estimates (12 min/km).</p>`));
      } else {
        listWrap.appendChild(el(`<p class="notice">Enter latitude and longitude for your custom point to rank listings.</p>`));
      }

      const grid = el(`<div class="apt-grid"></div>`);
      ranked.forEach((a, i) => {
        const dist = a.distKm != null
          ? `<span class="pill dist">${a.distKm < 1
              ? Math.round(a.distKm * 1000) + " m"
              : a.distKm.toFixed(1) + " km"} · ~${Math.round(a.distKm * 12)} min walk</span>`
          : `<span class="pill dist">no coordinates</span>`;
        const title = a.url
          ? `<a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.name)} ↗</a>`
          : esc(a.name);
        grid.appendChild(el(`
          <div class="card apt-card">
            <h3>${title}</h3>
            <div class="apt-meta">
              ${a.distKm != null ? `<span class="pill rank">#${i + 1}</span>` : ""}
              ${dist}
              ${a.price != null ? `<span class="pill">€${a.price}/mo</span>` : ""}
              ${a.sqm != null ? `<span class="pill">${a.sqm} m²</span>` : ""}
              ${a.bedrooms != null ? `<span class="pill">${a.bedrooms} bed</span>` : ""}
            </div>
            ${a.neighborhood || a.address
              ? `<p class="apt-notes">📍 ${esc([a.neighborhood, a.address].filter(Boolean).join(" · "))}</p>` : ""}
            ${a.notes ? `<p class="apt-notes">${esc(a.notes)}</p>` : ""}
          </div>`));
      });
      listWrap.appendChild(grid);
    }

    // wire up events
    const fileInput = root.querySelector("#apt-file");
    const handleFile = (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          let records;
          if (file.name.toLowerCase().endsWith(".json")) {
            const parsed = JSON.parse(reader.result);
            records = Array.isArray(parsed) ? parsed : parsed.apartments || [];
          } else {
            records = parseCSV(reader.result);
          }
          const apts = records.map(normalizeApartment);
          if (!apts.length) { alert("No listings found in that file."); return; }
          save("apartments", apts);
          renderList();
        } catch (e) {
          alert("Couldn't read that file: " + e.message);
        }
      };
      reader.readAsText(file);
    };
    fileInput.addEventListener("change", () => fileInput.files[0] && handleFile(fileInput.files[0]));
    zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.classList.add("dragover"); });
    zone.addEventListener("dragleave", () => zone.classList.remove("dragover"));
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("dragover");
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });

    const sel = root.querySelector("#anchor-select");
    if (savedAnchor && savedAnchor.id && c.anchors.some((a) => a.id === savedAnchor.id)) {
      sel.value = savedAnchor.id;
    }
    const syncCustom = () => {
      const custom = sel.value === "__custom";
      root.querySelector("#custom-lat-wrap").hidden = !custom;
      root.querySelector("#custom-lng-wrap").hidden = !custom;
    };
    sel.addEventListener("change", () => { save("anchor", { id: sel.value }); syncCustom(); renderList(); });
    root.querySelector("#custom-lat").addEventListener("input", renderList);
    root.querySelector("#custom-lng").addEventListener("input", renderList);
    syncCustom();

    root.querySelector("#clear-apts").addEventListener("click", () => {
      if (confirm("Remove all uploaded listings for this city?")) {
        save("apartments", []);
        renderList();
      }
    });

    root.querySelector("#dl-template").addEventListener("click", (e) => {
      e.preventDefault();
      downloadFile("apartments-template.csv",
        "name,url,address,neighborhood,sqm,price,bedrooms,lat,lng,notes\n" +
        'Bright 2BR near school,https://example.com/listing,Calle Example 12,Malasaña,68,1400,2,40.4259,-3.7038,"Elevator, furnished"\n',
        "text/csv");
    });

    renderList();
    return root;
  }

  function renderChecklist() {
    const c = currentCity;
    const done = load("checklist", {});
    const phases = [
      { id: "before", label: "✈️ Before you leave" },
      { id: "week1", label: "🗓️ First week" },
      { id: "month1", label: "📅 First month" },
    ];

    const root = el(`<div></div>`);
    root.appendChild(el(`
      <p class="page-intro">The bureaucracy gauntlet for <strong>${esc(c.name)}, ${esc(c.country)}</strong> —
      residency, healthcare, and everything official. Checked items are saved in your browser.</p>`));

    const total = c.checklist.length;
    const doneCount = c.checklist.filter((it) => done[it.id]).length;
    root.appendChild(el(`
      <div class="progress-wrap">
        <p class="muted">${doneCount} of ${total} done</p>
        <div class="progress-bar"><div class="progress-fill" style="width:${total ? (doneCount / total) * 100 : 0}%"></div></div>
      </div>`));

    phases.forEach((phase) => {
      const items = c.checklist.filter((it) => it.when === phase.id);
      if (!items.length) return;
      root.appendChild(el(`<h2 class="section-title">${phase.label}</h2>`));
      items.forEach((it) => {
        const links = (it.links || []).map((l) =>
          `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("");
        const card = el(`
          <div class="card check-item ${done[it.id] ? "done" : ""}">
            <input type="checkbox" ${done[it.id] ? "checked" : ""} aria-label="Mark done">
            <div>
              <h3>${esc(it.title)}</h3>
              <p>${esc(it.desc)}</p>
              ${links ? `<div class="check-links">${links}</div>` : ""}
            </div>
          </div>`);
        card.querySelector("input").addEventListener("change", (e) => {
          const d = load("checklist", {});
          d[it.id] = e.target.checked;
          save("checklist", d);
          render(); // refresh progress bar
        });
        root.appendChild(card);
      });
    });
    return root;
  }

  function renderEveryday() {
    const c = currentCity;
    const root = el(`<div></div>`);
    root.appendChild(el(`
      <p class="page-intro">Day-to-day logistics in <strong>${esc(c.name)}</strong> —
      getting around, staying connected, and the practical stuff nobody tells you.</p>`));
    c.everyday.forEach((section) => {
      root.appendChild(el(`<h2 class="section-title">${esc(section.title)}</h2>`));
      section.items.forEach((it) => {
        root.appendChild(el(`
          <div class="card item-row">
            <h3>${it.url
              ? `<a href="${esc(it.url)}" target="_blank" rel="noopener">${esc(it.name)} ↗</a>`
              : esc(it.name)}</h3>
            <p>${esc(it.desc)}</p>
          </div>`));
      });
    });
    return root;
  }

  function renderPlaces() {
    const c = currentCity;
    const userPlaces = load("places", []);
    const root = el(`<div></div>`);
    root.appendChild(el(`
      <p class="page-intro">Where to go and what to eat in <strong>${esc(c.name)}</strong>.
      Found a gem? Add it below and export your additions so they can be merged into the
      shared guide for next year's class.</p>`));

    c.places.forEach((section) => {
      root.appendChild(el(`<h2 class="section-title">${esc(section.title)}</h2>`));
      section.items.forEach((it) => root.appendChild(placeCard(it, false)));
    });

    if (userPlaces.length) {
      root.appendChild(el(`<h2 class="section-title">⭐ Your additions</h2>`));
      userPlaces.forEach((it, idx) => {
        const card = placeCard(it, true);
        const remove = el(`<button class="btn subtle" style="margin-top:8px">Remove</button>`);
        remove.addEventListener("click", () => {
          const arr = load("places", []);
          arr.splice(idx, 1);
          save("places", arr);
          render();
        });
        card.appendChild(remove);
        root.appendChild(card);
      });
      const exportBtn = el(`<button class="btn primary">⬇️ Export my additions (JSON)</button>`);
      exportBtn.addEventListener("click", () =>
        downloadFile(`${c.id}-places-additions.json`, JSON.stringify(userPlaces, null, 2)));
      root.appendChild(el(`<div class="toolbar" style="margin-top:12px"></div>`)).appendChild(exportBtn);
    }

    const form = el(`
      <form class="add-form">
        <h3>➕ Add a place</h3>
        <div class="form-row">
          <input type="text" name="name" placeholder="Name (required)" required>
          <input type="text" name="area" placeholder="Neighborhood / area">
        </div>
        <div class="form-row">
          <select name="category">
            ${c.places.map((s) => `<option>${esc(s.title)}</option>`).join("")}
          </select>
          <input type="text" name="url" placeholder="Link (optional)">
        </div>
        <textarea name="desc" placeholder="Why is it worth going?"></textarea>
        <div><button class="btn primary" type="submit">Add place</button></div>
      </form>`);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const arr = load("places", []);
      arr.push({
        name: f.get("name"), area: f.get("area"), category: f.get("category"),
        url: f.get("url"), desc: f.get("desc"),
      });
      save("places", arr);
      render();
    });
    root.appendChild(form);
    return root;
  }

  function placeCard(it, isUser) {
    return el(`
      <div class="card item-row">
        ${isUser ? `<span class="user-flag">Added by you · ${esc(it.category || "")}</span>` : ""}
        <h3>${it.url
          ? `<a href="${esc(it.url)}" target="_blank" rel="noopener">${esc(it.name)} ↗</a>`
          : esc(it.name)}
          ${it.area ? ` <span class="area-tag">· ${esc(it.area)}</span>` : ""}</h3>
        <p>${esc(it.desc || "")}</p>
      </div>`);
  }

  function renderTips() {
    const c = currentCity;
    const userTips = load("tips", []);
    const root = el(`<div></div>`);
    root.appendChild(el(`
      <p class="page-intro">Hard-won wisdom from students who've already done the
      <strong>${esc(c.name)}</strong> move. Add your own and export them for next year's class.</p>`));

    c.tips.forEach((t) => root.appendChild(tipCard(t, false)));

    if (userTips.length) {
      root.appendChild(el(`<h2 class="section-title">⭐ Your tips</h2>`));
      userTips.forEach((t, idx) => {
        const card = tipCard(t, true);
        const remove = el(`<button class="btn subtle" style="margin-top:8px">Remove</button>`);
        remove.addEventListener("click", () => {
          const arr = load("tips", []);
          arr.splice(idx, 1);
          save("tips", arr);
          render();
        });
        card.appendChild(remove);
        root.appendChild(card);
      });
      const exportBtn = el(`<button class="btn primary">⬇️ Export my tips (JSON)</button>`);
      exportBtn.addEventListener("click", () =>
        downloadFile(`${c.id}-tips-additions.json`, JSON.stringify(userTips, null, 2)));
      root.appendChild(el(`<div class="toolbar" style="margin-top:12px"></div>`)).appendChild(exportBtn);
    }

    const form = el(`
      <form class="add-form">
        <h3>➕ Add a tip</h3>
        <div class="form-row">
          <input type="text" name="title" placeholder="Tip in one line (required)" required>
          <input type="text" name="author" placeholder="Your name (optional)">
        </div>
        <textarea name="body" placeholder="Details…"></textarea>
        <div><button class="btn primary" type="submit">Add tip</button></div>
      </form>`);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const arr = load("tips", []);
      arr.push({ title: f.get("title"), body: f.get("body"), author: f.get("author") });
      save("tips", arr);
      render();
    });
    root.appendChild(form);
    return root;
  }

  function renderCatalog() {
    const c = currentCity;
    const root = el(`<div></div>`);
    root.appendChild(el(`
      <p class="page-intro">The live, shared catalog for <strong>${esc(c.name)}</strong> —
      restaurants and bars cataloged by students <em>as they find them</em>, visible to
      everyone instantly. At a great spot right now? Add it from your phone.</p>`));

    if (!sbConfig()) {
      root.appendChild(el(`
        <div class="empty-state">
          <strong>The shared catalog isn't connected yet.</strong><br>
          Maintainer: create a free Supabase project, run <code>supabase/schema.sql</code>,
          and paste your project URL + anon key into <code>js/config.js</code>.
          Full steps are in the README (~5 minutes).
        </div>`));
      return root;
    }

    const CATEGORIES = ["Restaurant", "Bar", "Café", "Club", "Other"];
    const CAT_ICONS = { Restaurant: "🍽️", Bar: "🍸", "Café": "☕", Club: "🌙", Other: "📍" };
    let entries = [];
    let activeCat = "All";
    let sortBy = "top";

    const controls = el(`
      <div class="toolbar">
        <div class="chip-row" id="cat-chips"></div>
        <label class="field" style="margin-left:auto">Sort
          <select id="catalog-sort">
            <option value="top">Top rated</option>
            <option value="new">Newest</option>
          </select>
        </label>
      </div>`);
    root.appendChild(controls);

    const listWrap = el(`<div><p class="muted">Loading the catalog…</p></div>`);
    root.appendChild(listWrap);

    function renderChips() {
      const wrap = controls.querySelector("#cat-chips");
      wrap.innerHTML = "";
      ["All", ...CATEGORIES].forEach((cat) => {
        const chip = el(`<button class="chip ${cat === activeCat ? "active" : ""}">${
          cat === "All" ? "All" : `${CAT_ICONS[cat]} ${esc(cat)}`}</button>`);
        chip.addEventListener("click", () => { activeCat = cat; renderChips(); renderEntries(); });
        wrap.appendChild(chip);
      });
    }

    function renderEntries() {
      listWrap.innerHTML = "";
      let shown = activeCat === "All" ? entries : entries.filter((e) => e.category === activeCat);
      shown = [...shown].sort((a, b) => sortBy === "top"
        ? (b.rating - a.rating) || (new Date(b.created_at) - new Date(a.created_at))
        : new Date(b.created_at) - new Date(a.created_at));

      if (!shown.length) {
        listWrap.appendChild(el(`<div class="empty-state">
          Nothing cataloged ${activeCat === "All" ? "" : "in this category "}yet for
          ${esc(c.name)} — be the first! 🏆</div>`));
        return;
      }
      shown.forEach((e) => {
        const date = new Date(e.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" });
        listWrap.appendChild(el(`
          <div class="card item-row catalog-card">
            <div class="catalog-head">
              <h3>${CAT_ICONS[e.category] || "📍"} ${e.menu_url
                ? `<a href="${esc(e.menu_url)}" target="_blank" rel="noopener">${esc(e.name)} ↗</a>`
                : esc(e.name)}
                ${e.area ? ` <span class="area-tag">· ${esc(e.area)}</span>` : ""}</h3>
              <span class="star-rating" title="${e.rating}/5">${stars(e.rating)}</span>
            </div>
            ${e.notes ? `<p>${esc(e.notes)}</p>` : ""}
            <p class="muted">${e.added_by ? `added by ${esc(e.added_by)} · ` : ""}${date}</p>
          </div>`));
      });
    }

    async function loadEntries() {
      try {
        entries = await sbFetch(`catalog?city=eq.${encodeURIComponent(c.id)}&select=*&order=created_at.desc&limit=500`);
        renderEntries();
      } catch (err) {
        listWrap.innerHTML = "";
        listWrap.appendChild(el(`<div class="notice">Couldn't load the catalog: ${esc(err.message)}</div>`));
      }
    }

    controls.querySelector("#catalog-sort").addEventListener("change", (e) => {
      sortBy = e.target.value;
      renderEntries();
    });

    const form = el(`
      <form class="add-form">
        <h3>⭐ Catalog this place</h3>
        <div class="form-row">
          <input type="text" name="name" placeholder="Name (required)" required maxlength="120">
          <select name="category">${CATEGORIES.map((x) => `<option>${x}</option>`).join("")}</select>
          <select name="rating" required>
            <option value="" disabled selected>Rating…</option>
            ${[5, 4, 3, 2, 1].map((n) => `<option value="${n}">${stars(n)}</option>`).join("")}
          </select>
        </div>
        <div class="form-row">
          <input type="text" name="area" placeholder="Neighborhood / area" maxlength="80">
          <input type="url" name="menu_url" placeholder="Menu or website link (optional)" maxlength="500">
        </div>
        <textarea name="notes" placeholder="What should people order? What's the vibe?" maxlength="600"></textarea>
        <div class="form-row">
          <input type="text" name="added_by" placeholder="Your name (optional)" maxlength="60">
          <button class="btn primary" type="submit">Add to the shared catalog</button>
        </div>
        <p class="muted" style="margin:0">Heads up: this is shared instantly with everyone using the site.</p>
      </form>`);
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      const f = new FormData(form);
      const payload = {
        city: c.id,
        name: f.get("name").trim(),
        category: f.get("category"),
        rating: parseInt(f.get("rating"), 10),
        area: f.get("area").trim() || null,
        menu_url: f.get("menu_url").trim() || null,
        notes: f.get("notes").trim() || null,
        added_by: f.get("added_by").trim() || null,
      };
      if (!payload.name || !payload.rating) return;
      btn.disabled = true;
      btn.textContent = "Adding…";
      try {
        await sbFetch("catalog", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { Prefer: "return=minimal" },
        });
        form.reset();
        await loadEntries();
      } catch (err) {
        alert("Couldn't save: " + err.message);
      } finally {
        btn.disabled = false;
        btn.textContent = "Add to the shared catalog";
      }
    });
    root.appendChild(form);

    renderChips();
    loadEntries();
    return root;
  }

  function tipCard(t, isUser) {
    return el(`
      <div class="card tip-card">
        ${isUser ? `<span class="user-flag">Added by you</span>` : ""}
        <h3>💡 ${esc(t.title)}</h3>
        <p>${esc(t.body || "")}</p>
        ${t.author ? `<span class="tip-author">— ${esc(t.author)}</span>` : ""}
      </div>`);
  }

  // ---------- router ----------
  const routes = {
    apartments: renderApartments,
    checklist: renderChecklist,
    everyday: renderEveryday,
    places: renderPlaces,
    catalog: renderCatalog,
    tips: renderTips,
  };

  function currentRoute() {
    const r = (location.hash.replace(/^#\//, "") || "apartments").split("?")[0];
    return routes[r] ? r : "apartments";
  }

  function render() {
    if (!currentCity) return;
    const route = currentRoute();
    document.querySelectorAll(".tabs a").forEach((a) =>
      a.classList.toggle("active", a.dataset.route === route));
    const v = view();
    v.innerHTML = "";
    v.appendChild(routes[route]());
  }

  // ---------- public API ----------
  function registerCity(city) {
    cities[city.id] = city;
  }

  function start() {
    const select = document.getElementById("city-select");
    const ids = Object.keys(cities);
    if (!ids.length) {
      view().innerHTML = `<div class="empty-state">No city data loaded. Check the data/*.js script tags in index.html.</div>`;
      return;
    }
    ids.forEach((id) => {
      const c = cities[id];
      const opt = document.createElement("option");
      opt.value = id;
      opt.textContent = `${c.emoji} ${c.name}, ${c.country}`;
      select.appendChild(opt);
    });

    const savedCity = localStorage.getItem("mig:city");
    currentCity = cities[savedCity] || cities[ids[0]];
    select.value = currentCity.id;

    select.addEventListener("change", () => {
      currentCity = cities[select.value];
      localStorage.setItem("mig:city", currentCity.id);
      render();
    });
    window.addEventListener("hashchange", render);

    // personal data backup buttons (footer)
    const exportBtn = document.getElementById("export-personal");
    const importBtn = document.getElementById("import-personal");
    const importFile = document.getElementById("import-personal-file");
    if (exportBtn) exportBtn.addEventListener("click", exportPersonal);
    if (importBtn) importBtn.addEventListener("click", () => importFile.click());
    if (importFile) importFile.addEventListener("change", () =>
      importFile.files[0] && importPersonal(importFile.files[0]));

    // PWA: lets students "Add to Home Screen" and gives basic offline support
    if ("serviceWorker" in navigator &&
        (location.protocol === "https:" || location.hostname === "localhost")) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }

    render();
  }

  return { registerCity, start };
})();
