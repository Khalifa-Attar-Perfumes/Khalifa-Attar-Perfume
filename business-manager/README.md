# Khalifa Business Manager

Mobile-first billing app (PWA) for Khalifa Attar & Perfumes: POS billing, customers and dues, reports, cash & bank, and bills sent on WhatsApp as a PDF with a caption. Three phones stay in sync through one Google Sheet.

- `index.html` — the whole app (vanilla JS, no build step needed to host it)
- `sw.js`, `manifest.webmanifest`, `icons/` — install as an app, works offline
- `vendor/` — html2canvas and jsPDF, kept local so PDFs work offline
- `fonts/` — Manrope and Cormorant Garamond (SIL Open Font License)
- `apps-script/Code.gs` — the Google Sheets backend (row-level sync, secret key, script lock)
- `SETUP.md` — step-by-step setup (Sheet, Apps Script, phones, WhatsApp test)

## How sync works

Every record is one row with `id`, `rev`, `updatedAt`, `updatedBy` and a server stamp `serverUpdatedAt`.

- Phones save locally first (IndexedDB) and queue the change in an outbox.
- **Push** upserts rows by `id` under a script lock. A row is replaced only by a higher `rev`. When two phones edit the same version, the later edit wins and both versions are written to `AuditLog`.
- **Pull** returns rows changed since the phone's last server stamp, so phone clocks never decide what is new.
- Customers use their phone number as the id, so the same new customer billed on two phones offline is still one customer.
- Bill numbers are per user (`KH-Y-0001`, `KH-H-0001`, `KH-M-0001`), so two phones never pick the same number.

No customer data, Sheet ID or secret key is stored in this repository. They are entered on each phone during first-time setup.
