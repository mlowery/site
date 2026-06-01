# Resume PDF Generator — Design Spec

**Date:** 2026-06-01  
**Status:** Approved

## Goal

Produce a reproducible, human-readable PDF resume from `src/data/resume.tsx`. Not ATS-optimized. Target: comfortable 2 pages, Letter size.

## Content

Sections included, in page order:

| Section | Source field | Notes |
|---|---|---|
| Header | `name`, `contact`, `location` | Compact 3-line block, no photo |
| Summary | `summary` | Existing paragraph verbatim |
| Impact | `impact` | 4 metric cards in a row |
| Work Experience | `work` | All 6 jobs; 1–2 sentence descriptions |
| Education | `education` | 2 UCF degrees, single line each |
| Open Source | `openSource` | Project + one-line detail per contribution, with URL |
| Personal Projects | `projects` | Name + one-liner + inline tech tags |

Sections omitted: `skills` (standalone), `praise`, `speaking`, `hackathons`, `photos`, `contact` (info in header).

Skills appear in context: tech tags on projects, and implicitly in work descriptions.

## Visual Style — Contemporary

**Header block**
- Name: large, bold
- Title: derived from `work[0].title` (most recent job) or hardcoded as "Sr. Platform Engineer" (muted)
- Location + contact links on one line
- Thin horizontal rule beneath

**Impact cards**
- 4 cards in a single row
- Large bold metric value, smaller label, small description text beneath
- Light gray card background, subtle border

**Section headings**
- Bold, small-caps or uppercase tracking
- Short left-border accent in a single muted color (e.g. slate/indigo)

**Work entries**
- Company name bold; title + date range muted, same line
- Description indented, 1–2 sentences

**Open Source**
- Two groups: GitHub Contributions, OpenDev Reviews
- Each entry: `Project — one-line detail` with linked URL

**Projects**
- Compact list: name bold + one-liner + inline tech tags (e.g. `Go · Kubernetes`)

**Typography**
- System sans-serif (renders cleanly in headless Chromium)
- ~11px base, tighter line-height to fit 2 pages comfortably

## Implementation

**File:** `scripts/generate-resume.ts`

**Run:**
```
npx tsx scripts/generate-resume.ts
```

**Output:** `resume.pdf` at repo root

**Dependencies to add (devDependencies):**
- `puppeteer` — headless Chromium for HTML-to-PDF rendering

**How it works:**
1. Import `DATA` from `src/data/resume.tsx` via `tsx` (path alias `@/` resolved via `tsconfig.json`). JSX icon fields are present in the data but ignored — only text/string fields are consumed.
2. Read `public/headshot.png` — not used (no headshot in design).
3. Build a self-contained HTML string: all CSS embedded in a `<style>` block, no external resources.
4. Launch Puppeteer, open the HTML, call `page.pdf()` with Letter size and `printBackground: true`.
5. Write output to `resume.pdf`.

**Path alias resolution:**
`tsconfig.json` already maps `@/*` → `./src/*`. `tsx` respects this via `tsconfig.json` `paths`.

**Reproducibility:**
After `npm install`, a single `npx tsx scripts/generate-resume.ts` produces `resume.pdf`. No dev server, no build step, no manual steps.
