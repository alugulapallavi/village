# Telangana Village Information Portal

A bilingual (English / Telugu, with Hindi voice support) village portal covering all
16 requested modules: Home, Schemes, Land Services, Agriculture, Jobs, Business
Directory, Health, Education, Transport, Village Services, Marketplace, Emergency,
Village Development, Complaint Portal, AI Voice Assistant, and Admin Panel.

## Folder Structure
```
village-portal/
├── index.html         Main app shell - all 16 pages/sections + nav + modals
├── css/style.css       Telangana green/white theme, responsive, dark/light mode
├── js/
│   ├── data.js          Sample bilingual content for every module (swap for API calls)
│   ├── app.js            Navigation, rendering, search, complaints, admin dashboard
│   ├── auth.js            Sign in / Sign up / Sign out (email + password)
│   └── voice.js            AI Voice Assistant - English / Telugu / Hindi (Web Speech API)
└── backend/
    ├── server.js          Express REST API (auth, schemes, complaints, businesses, jobs, AI, admin)
    ├── schema.sql           Full MySQL schema for every module
    ├── package.json
    └── .env.example
```

## Running the frontend
Just open `index.html` in any browser — no build step required. Everything (login,
complaints, admin data) is currently backed by `localStorage` so you can try the
whole flow immediately.

- **Demo admin login:** `admin@village.gov.in` / `admin123`
- **Citizen accounts:** use Register to create one, then Sign In.
- Click the 🎙️ icon for the AI Assistant — switch language (English/Telugu/Hindi),
  type or use the 🎤 mic button (uses your browser's Web Speech API).
- Click 🌙/☀️ to toggle dark/light mode, "EN / తె" to toggle language sitewide.
- All main nav headings navigate directly to their page (`data-page` attributes
  drive `navigateTo()` in app.js).

## Wiring up the real backend (MySQL)
1. `mysql -u root -p < backend/schema.sql` to create the database and tables.
2. `cd backend && npm install && cp .env.example .env` then fill in your DB
   credentials and a JWT secret.
3. `npm run dev` to start the API on port 5000.
4. Replace the `localStorage` calls in `js/auth.js` and `js/app.js` with `fetch()`
   calls to the corresponding `/api/...` routes in `server.js` (auth, schemes,
   complaints, businesses, jobs, assistant, admin/stats are implemented — follow
   the same pattern to add land_requests, certificate_requests, marketplace_listings,
   health_facilities, education_facilities using the matching tables in schema.sql).
5. For Firebase instead of MySQL: keep the same REST route shapes in server.js but
   swap the `mysql2` pool calls for Firestore collection reads/writes.

## AI Assistant
The shipped assistant (`js/voice.js`) is a fast, offline-friendly keyword-matching
bot covering common questions (schemes, Pattadar Passbook, Aadhaar, jobs,
certificates, weather, complaints, emergency numbers) in English, Telugu, and Hindi,
using the browser's `SpeechRecognition` (voice in) and `SpeechSynthesis` (voice out).
For deeper, open-ended Q&A, point `/api/assistant` in `server.js` at an LLM (e.g. the
Anthropic API) with the village knowledge base (schemes, services) as context.

## Design
Green (#0b5e34 / #168a4f) and white theme with gold (#d4a017) accents, rounded cards,
soft shadows, smooth fade-in page transitions, and a fully responsive layout
(hamburger menu under 768px).

## Next steps for production
- Add image upload (multer + S3/Firebase Storage) for businesses, complaints, marketplace.
- Add PDF generation/download for certificates and applications (e.g. pdfkit).
- Replace demo auth with hashed-password DB auth (already scaffolded in server.js)
  and httpOnly JWT cookies.
- Add Leaflet/Google Maps for the interactive village map (lat/lng columns already
  exist on businesses and health_facilities tables).
- Add server-side analytics for the admin dashboard (charts via Chart.js/Recharts).
