# Move-In Guide 🧳

A student-built guide for switching campuses (and countries) every year. One site, one
data file per city, passed down from grade to grade.

**Cities:** Madrid · Milan · Geneva · Marseille · Lyon · Paris

**Sections:** Apartments (upload + rank by distance) · Arrival Checklist · Everyday Life ·
Places & Food · ⭐ Catalog (live shared, via Supabase) · Tips & Tricks

## Running it locally

No build step, no dependencies:

```
python3 -m http.server
```

then visit http://localhost:8000. (Opening `index.html` directly also works, minus the
service worker.)

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New Project → import the repo**. No framework, no build command —
   it's static files. Deploy.
3. Share the URL.

⚠️ **Keep the URL stable.** Personal data (checklists, apartment uploads) is stored in
each person's browser *per domain* — if the site moves to a new domain, everyone's local
data appears to vanish. Tell people to use the main production URL, not preview URLs.

## Setting up the shared Catalog (Supabase, ~5 minutes)

The ⭐ Catalog tab is the live shared layer: students add restaurants/bars with a rating
and menu link from their phone, and everyone sees it instantly. It needs a free Supabase
project:

1. Create a project at [supabase.com](https://supabase.com) (free tier is plenty).
2. In the dashboard: **SQL Editor → New query**, paste the contents of
   `supabase/schema.sql`, **Run**.
3. **Project Settings → API**: copy the **Project URL** and **anon public** key into
   `js/config.js`.
4. Commit, push, redeploy. Done.

The anon key is safe to publish — it's designed for frontend use. The schema's row-level
security lets anyone read and insert catalog entries but **nobody can edit or delete from
the site**; moderate spam directly in the Supabase dashboard (Table Editor → catalog).

## Phones / install as an app

The site is a PWA: on a phone, **Share → Add to Home Screen** (iOS) or the install prompt
(Android) puts it next to regular apps with the suitcase icon. Already-visited pages work
offline; the catalog needs a connection.

## How the data works

Three layers:

| layer | lives where | examples |
|---|---|---|
| Shared, versioned | `data/<city>.js` files in the repo | checklists, everyday info, places, tips |
| Shared, live | Supabase | ⭐ Catalog entries |
| Personal | each user's browser (localStorage) | checklist progress, apartment uploads, personal additions |

- **Updating shared content:** edit `data/<city>.js`, push, redeploy. Users keep all
  their personal data — deploys never touch localStorage.
- **Personal backups:** footer buttons "Back it up" / "Restore a backup" export/import
  all personal data as one JSON file (also how people move between computers).

### First thing to do

Set the **real school coordinates** in each `data/<city>.js` (the `anchors` array,
`school` entry). Right-click your campus in Google Maps → click the coordinates to copy
them.

### Apartment listings

Three ways to build a list on the Apartments tab (all stored locally per browser):

1. **Add manually** — the "Add a listing" form, one flat at a time while browsing.
2. **Upload CSV/JSON** — uploads merge with existing entries (matched by url). Excel
   users: File → Save As → CSV.
3. **AI-assisted** — the "Copy the AI prompt" button produces a prompt that turns pasted
   listing links into a ready-to-upload CSV.

Missing coordinates? The **"Find missing coordinates"** button geocodes street addresses
via OpenStreetMap (~1/second, so a long list takes a minute).

Recognized columns (extra columns are ignored, all optional except `name`):

| column | meaning |
|---|---|
| `name` | listing title |
| `url` | link to the listing |
| `address`, `neighborhood` | where it is |
| `sqm` | size in square meters |
| `price` | monthly rent |
| `bedrooms` | number of rooms |
| `lat`, `lng` | coordinates — required for distance ranking |
| `notes` | anything else |

See `sample-apartments.csv`. JSON uploads accept an array of objects with those keys, or
`{ "apartments": [...] }`.

### Contributing places & tips (the yearly handoff)

1. Students add places/tips in the app (saved locally, shown under "Your additions").
2. They click **Export my additions (JSON)** and send the file to the maintainer.
3. The maintainer pastes the entries into the matching section of `data/<city>.js` and
   redeploys.

The Catalog tab needs no merging — it's live for everyone automatically.

### Adding a new city

1. Copy an existing `data/<city>.js`, change `id`, `name`, `country`, `emoji`, anchors,
   and content.
2. Add its `<script>` tag to `index.html` next to the other data scripts.

The city picker fills itself in. The catalog works for the new city automatically (it's
keyed by city id).

### The maintainer handoff

Each year, transfer: the GitHub repo, the Vercel project, and the Supabase project (or
just the account). That's the entire infrastructure.
