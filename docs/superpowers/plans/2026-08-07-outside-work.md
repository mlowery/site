# Outside Work Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Outside Work interests to the website and human resume while guaranteeing their exclusion from the ATS resume.

**Architecture:** Add a typed `outsideWork` collection and section metadata to the shared `DATA` object. The React homepage maps icon identifiers to Lucide components and renders responsive pills; the resume HTML generator conditionally emits a compact text section only for the human target.

**Tech Stack:** TypeScript, React 19, Astro 6, Tailwind CSS 4, Lucide React, Node assertions, Puppeteer PDF generation

## Global Constraints

- Use the heading `Outside Work`.
- Use the labels `International travel`, `Cooking across cuisines`, and `Strength training & HIIT`.
- Use airplane, cooking-pot, and dumbbell icons respectively on the website.
- Place the website section after Personal Projects and before Contact.
- Place the human-resume section after Personal Projects.
- Do not render any Outside Work content in the ATS resume.
- Preserve existing uncommitted metadata-title changes in `package.json`, `src/layouts/Layout.astro`, and `scripts/check-page-metadata.mjs`.

---

### Task 1: Shared data and resume-target behavior

**Files:**
- Modify: `src/data/resume.tsx`
- Modify: `scripts/resume-html.test.ts`
- Modify: `scripts/resume-html.ts`

**Interfaces:**
- Produces: `DATA.outsideWork: Array<{ label: string; icon: "plane" | "cooking-pot" | "dumbbell" }>`
- Produces: `DATA.sections.outsideWork` with `order: 10.7`, `enabled: true`, and `heading: "Outside Work"`
- Consumes: `buildHtml(DATA, { target: "human" | "ats" })`

- [ ] **Step 1: Write failing human/ATS assertions**

Add to `scripts/resume-html.test.ts`:

```ts
assert(humanHtml.includes('<div class="section-heading">Outside Work</div>'));
for (const interest of DATA.outsideWork) {
  const escapedLabel = interest.label.replaceAll('&', '&amp;');
  assert(humanHtml.includes(escapedLabel), `human resume should include Outside Work interest: ${interest.label}`);
  assert(!atsHtml.includes(escapedLabel), `ATS resume should exclude Outside Work interest: ${interest.label}`);
}
assert(!atsHtml.includes('Outside Work'), 'ATS resume should exclude the Outside Work section');
assert(
  humanHtml.indexOf('<div class="section-heading">Personal Projects</div>')
    < humanHtml.indexOf('<div class="section-heading">Outside Work</div>'),
  'human Outside Work should appear after Personal Projects',
);
```

- [ ] **Step 2: Run the resume HTML test and verify RED**

Run: `npx tsx scripts/resume-html.test.ts`

Expected: TypeScript fails because `DATA.outsideWork` does not exist, proving the new behavior is absent.

- [ ] **Step 3: Add shared data**

Add to `DATA.sections` after `projects`:

```ts
outsideWork: { order: 10.7, enabled: true, heading: "Outside Work" },
```

Add a top-level collection near the other personal content:

```ts
outsideWork: [
  { label: "International travel", icon: "plane" },
  { label: "Cooking across cuisines", icon: "cooking-pot" },
  { label: "Strength training & HIIT", icon: "dumbbell" },
] as const,
```

- [ ] **Step 4: Render Outside Work only for the human resume**

Include `outsideWork` in the `buildHtml` data destructuring and define:

```ts
const outsideWorkSectionHtml = target === 'human'
  ? `<div class="section outside-work-section">
  <div class="section-heading">Outside Work</div>
  <div class="outside-work-list">${outsideWork.map(item => esc(item.label)).join(' &nbsp;&middot;&nbsp; ')}</div>
</div>`
  : '';
```

Add compact styling:

```css
.outside-work-list { color: #444; font-size: 9.5px; }
```

Insert `${outsideWorkSectionHtml}` immediately after the Personal Projects section and before `</body>`.

- [ ] **Step 5: Run the resume HTML test and verify GREEN**

Run: `npx tsx scripts/resume-html.test.ts`

Expected: `✓ All assertions passed`.

- [ ] **Step 6: Commit the resume behavior**

```bash
git add src/data/resume.tsx scripts/resume-html.ts scripts/resume-html.test.ts
git commit -m "feat: add outside work to human resume"
```

---

### Task 2: Website icon pills

**Files:**
- Create: `scripts/outside-work-web.test.tsx`
- Modify: `src/components/HomePage.tsx`

**Interfaces:**
- Consumes: `DATA.sections.outsideWork` and `DATA.outsideWork`
- Produces: homepage section `#outside-work`
- Produces: `OutsideWorkIcon({ icon })` mapping `plane`, `cooking-pot`, and `dumbbell` to Lucide icons
- Produces: a server-rendered homepage regression test

- [ ] **Step 1: Write the failing website rendering test**

Create `scripts/outside-work-web.test.tsx`:

```tsx
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "../src/components/HomePage";

const html = renderToStaticMarkup(<HomePage />);

assert(html.includes('id="outside-work"'), "website should render the Outside Work section");
assert(html.includes("Outside Work"), "website should render the Outside Work heading");
for (const label of [
  "International travel",
  "Cooking across cuisines",
  "Strength training &amp; HIIT",
]) {
  assert(html.includes(label), `website should render Outside Work interest: ${label}`);
}
assert.equal(
  (html.match(/data-outside-work-icon=/g) ?? []).length,
  3,
  "website should render one icon for each Outside Work interest",
);
```

- [ ] **Step 2: Run the website check and verify RED**

Run: `npx tsx scripts/outside-work-web.test.tsx`

Expected: FAIL with `website should render the Outside Work section`.

- [ ] **Step 3: Add the icon mapping and section**

Import `CookingPot`, `Dumbbell`, and `Plane` from `lucide-react`, then add:

```tsx
function OutsideWorkIcon({ icon }: { icon: (typeof DATA.outsideWork)[number]["icon"] }) {
  const iconMap = {
    plane: Plane,
    "cooking-pot": CookingPot,
    dumbbell: Dumbbell,
  };
  const Icon = iconMap[icon];
  return <Icon className="size-4 shrink-0" aria-hidden data-outside-work-icon={icon} />;
}
```

Add `outsideWork` to `sectionComponents` after `projects`:

```tsx
outsideWork: (
  <section id="outside-work">
    <div className="flex min-h-0 flex-col gap-y-4">
      <BlurFade delay={BLUR_FADE_DELAY * 12}>
        <h2 className="text-xl font-bold">{DATA.sections.outsideWork.heading}</h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 13}>
        <div className="flex flex-wrap gap-2">
          {DATA.outsideWork.map((interest) => (
            <div
              key={interest.label}
              className="flex h-8 w-fit items-center gap-2 rounded-xl border border-border bg-background px-3 ring-2 ring-border/20"
            >
              <OutsideWorkIcon icon={interest.icon} />
              <span className="text-sm font-medium text-foreground">{interest.label}</span>
            </div>
          ))}
        </div>
      </BlurFade>
    </div>
  </section>
),
```

The `order: 10.7` metadata places it after Projects (`10.5`) and before Contact (`11`).

- [ ] **Step 4: Run the website check and build**

Run: `npx tsx scripts/outside-work-web.test.tsx && npm run build`

Expected: rendering test exits 0 and Astro reports `Complete!`.

- [ ] **Step 5: Commit the website behavior**

```bash
git add src/components/HomePage.tsx scripts/outside-work-web.test.tsx
git commit -m "feat: show outside work interests on website"
```

---

### Task 3: Generate and inspect both resume variants

**Files:**
- Modify: `dist/resume.pdf`
- Modify: `dist/resume-ats.pdf`

**Interfaces:**
- Consumes: `npm run resume-human` and `npm run resume-ats`
- Produces: updated human PDF and an ATS PDF with no Outside Work content

- [ ] **Step 1: Generate both PDFs**

Run:

```bash
npm run resume-human
npm run resume-ats
```

Expected: both commands report their target PDF paths.

- [ ] **Step 2: Verify PDF text and page counts**

Run:

```bash
pdfinfo dist/resume.pdf | rg '^Pages:'
pdfinfo dist/resume-ats.pdf | rg '^Pages:'
pdftotext dist/resume.pdf - | rg 'Outside Work|International travel|Cooking across cuisines|Strength training & HIIT'
if pdftotext dist/resume-ats.pdf - | rg -q 'Outside Work|International travel|Cooking across cuisines|Strength training & HIIT'; then exit 1; fi
```

Expected: human PDF remains two pages and prints all four matching lines; ATS PDF remains two pages and the exclusion command exits 0.

- [ ] **Step 3: Render and visually inspect**

Render both PDFs to PNGs using the PDF skill workflow. Inspect the website at desktop and narrow viewport widths, the human PDF for a compact final section with no third page, and the ATS PDF for unchanged professional-only content.

- [ ] **Step 4: Run the complete relevant verification set**

Run:

```bash
npx tsx scripts/resume-html.test.ts
npx tsx scripts/outside-work-web.test.tsx
npm run build
npm run test:metadata
git diff --check
```

Expected: every command exits 0 with no assertion failures or whitespace errors. Restore tracked PDFs after `npm run build` if the build removes them, then regenerate both targets once more.

- [ ] **Step 5: Commit generated artifacts**

```bash
git add dist/resume.pdf dist/resume-ats.pdf
git commit -m "build: regenerate resumes with outside work"
```
