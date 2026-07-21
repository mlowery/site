# Human and ATS Resume Targets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate distinct human and ATS PDF resumes, add Skills to both, and explain eBay-specific titles everywhere resume data is displayed.

**Architecture:** Keep `DATA` as the shared content source and extend the pure HTML builder with an explicit target option. Put CLI target validation and output selection in a separate pure module so it can be tested without launching Puppeteer, then have the generator compose that configuration with the renderer.

**Tech Stack:** TypeScript 6, Node.js strict assertions, TSX, Puppeteer, npm scripts

## Global Constraints

- `npm run resume-human` writes `dist/resume.pdf`.
- `npm run resume-ats` writes `dist/resume-ats.pdf`.
- `npm run resume` remains an alias for the human target.
- Website and both PDFs use shared titles with `(Senior)`, `(Staff)`, and `(Senior Staff)` equivalents.
- Human Impact remains a four-card grid; ATS Impact and Skills use single-column semantic markup.
- Both PDFs include a standalone Skills section sourced only from `DATA.skillGroups`.
- Existing Puppeteer Letter-size and margin settings remain unchanged unless rendered-page verification demonstrates overflow.

---

### Task 1: Shared title equivalents and target-aware resume HTML

**Files:**
- Modify: `src/data/resume.tsx`
- Modify: `scripts/resume-html.test.ts`
- Modify: `scripts/resume-html.ts`

**Interfaces:**
- Consumes: `DATA.work`, `DATA.impact`, and `DATA.skillGroups`
- Produces: `type ResumeTarget = 'human' | 'ats'` and `buildHtml(data: ResumeData, options?: { target?: ResumeTarget }): string`

- [ ] **Step 1: Write failing target-specific HTML assertions**

Replace the single-render call at the top of `scripts/resume-html.test.ts` with human and ATS renders, keep the existing content assertions against `humanHtml`, and add these assertions:

```ts
const humanHtml = buildHtml(DATA, { target: 'human' });
const atsHtml = buildHtml(DATA, { target: 'ats' });

assert(humanHtml.includes('class="impact-grid"'), 'human resume should use impact grid');
assert(humanHtml.includes('class="impact-card"'), 'human resume should use impact cards');
assert(atsHtml.includes('class="impact-list"'), 'ATS resume should use impact list');
assert(atsHtml.includes('<li class="impact-item">'), 'ATS impact should use semantic list items');
assert(!atsHtml.includes('class="impact-grid"'), 'ATS resume should exclude impact grid markup');

for (const skillGroup of DATA.skillGroups) {
  assert(humanHtml.includes(skillGroup.name), `human resume should include ${skillGroup.name} skills`);
  assert(atsHtml.includes(skillGroup.name), `ATS resume should include ${skillGroup.name} skills`);
  for (const skill of skillGroup.skills) {
    assert(humanHtml.includes(skill), `human resume should include skill: ${skill}`);
    assert(atsHtml.includes(skill), `ATS resume should include skill: ${skill}`);
  }
}
assert(humanHtml.includes('<div class="section-heading">Skills</div>'));
assert(atsHtml.includes('<div class="section-heading">Skills</div>'));
assert(atsHtml.includes('class="skills-list"'), 'ATS skills should use a single-column list');
assert(!atsHtml.includes('class="skills-grid"'), 'ATS skills should exclude grid markup');
assert(humanHtml.includes('class="skill-pill"'), 'human skills should use pill tags');
assert(!atsHtml.includes('class="skill-pill"'), 'ATS skills should exclude pill tags');
assert(
  humanHtml.indexOf('<div class="section-heading">Skills</div>')
    < humanHtml.indexOf('<div class="section-heading">Work Experience</div>'),
  'human Skills should appear before Work Experience',
);
assert(
  atsHtml.indexOf('<div class="section-heading">Skills</div>')
    < atsHtml.indexOf('<div class="section-heading">Work Experience</div>'),
  'ATS Skills should remain on page 1 before Work Experience',
);

for (const title of [
  'Senior MTS, Software Engineer (Senior Staff)',
  'MTS 2, Software Engineer (Staff)',
  'MTS 1, Software Engineer (Senior)',
]) {
  assert(humanHtml.includes(title), `human resume should include title: ${title}`);
  assert(atsHtml.includes(title), `ATS resume should include title: ${title}`);
}
```

- [ ] **Step 2: Run the HTML test and verify RED**

Run: `npx tsx scripts/resume-html.test.ts`

Expected: FAIL because `buildHtml` does not accept a target and ATS list/Skills/title-equivalent markup is absent.

- [ ] **Step 3: Update shared work titles**

Change only these values in `src/data/resume.tsx`:

```ts
title: "Senior MTS, Software Engineer (Senior Staff)",
title: "MTS 2, Software Engineer (Staff)",
title: "MTS 1, Software Engineer (Senior)",
```

Apply the MTS 2 value to both matching work entries. Because website components already render `job.title`, no website component changes are required.

- [ ] **Step 4: Add target-aware Impact and Skills markup**

In `scripts/resume-html.ts`, export the target type and accept an optional target that defaults to human:

```ts
export type ResumeTarget = 'human' | 'ats';

type BuildHtmlOptions = {
  target?: ResumeTarget;
};

export function buildHtml(
  data: ResumeData,
  { target = 'human' }: BuildHtmlOptions = {},
): string {
  const { name, summary, contact, work, education, impact, skillGroups, openSource, projects } = data;
```

Build target-specific markup with escaped values:

```ts
const impactHtml = target === 'ats'
  ? `<ul class="impact-list">${impact.map(item => `
      <li class="impact-item">
        <strong>${esc(item.value)} ${esc(item.label)}</strong>: ${esc(item.description)}
      </li>`).join('')}
    </ul>`
  : `<div class="impact-grid">${impact.map(item => `
      <div class="impact-card">
        <div class="impact-value">${esc(item.value)}</div>
        <div class="impact-label">${esc(item.label)}</div>
        <div class="impact-desc">${esc(item.description)}</div>
      </div>`).join('')}
    </div>`;

const skillsHtml = target === 'ats'
  ? `<ul class="skills-list">${skillGroups.map(group => `
      <li class="skills-item"><strong>${esc(group.name)}:</strong> ${group.skills.map(esc).join(', ')}</li>`).join('')}
    </ul>`
  : `<div class="skills-grid">${skillGroups.map(group => `
      <div class="skills-group">
        <div class="skills-name">${esc(group.name)}</div>
        <div class="skill-pills">${group.skills.map(skill => `<span class="skill-pill">${esc(skill)}</span>`).join('')}</div>
      </div>`).join('')}
    </div>`;
```

Replace the current hard-coded `<div class="impact-grid">...</div>` with `${impactHtml}`. Render the standalone ATS Skills section immediately after Impact:

```html
<div class="section">
  <div class="section-heading">Skills</div>
  ${skillsHtml}
</div>
```

Render that block for both targets immediately after Impact. The markup inside the section remains target-specific.

Add compact human styling and plain single-column list styling:

```css
.impact-list, .skills-list { padding-left: 18px; }
.impact-item, .skills-item { margin-bottom: 5px; }
.skills-grid { display: grid; grid-template-columns: 1fr; gap: 4px; }
.skills-group { display: flex; align-items: baseline; gap: 5px; font-size: 9px; line-height: 1.35; }
.skills-name { font-weight: 700; white-space: nowrap; }
.skill-pills { display: flex; flex-wrap: wrap; gap: 3px; }
.skill-pill { background: #f7f7fc; border: 1px solid #e4e4f0; border-radius: 999px; color: #444; padding: 1px 5px; }
```

- [ ] **Step 5: Run the HTML test and verify GREEN**

Run: `npx tsx scripts/resume-html.test.ts`

Expected: `✓ All assertions passed`

- [ ] **Step 6: Run existing source-data checks**

Run: `npm run test:work-ids && npm run test:projects && npm run test:coredns-case-study`

Expected: all three commands exit 0.

- [ ] **Step 7: Commit Task 1**

```bash
git add src/data/resume.tsx scripts/resume-html.ts scripts/resume-html.test.ts
git commit -m "feat: render human and ATS resume content"
```

---

### Task 2: Validated PDF targets and npm scripts

**Files:**
- Create: `scripts/resume-target.ts`
- Create: `scripts/resume-target.test.ts`
- Modify: `scripts/generate-resume.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: optional raw CLI argument `string | undefined`
- Produces: `getResumeTarget(rawTarget?: string): { target: ResumeTarget; outputPath: string }`

- [ ] **Step 1: Write the failing target configuration test**

Create `scripts/resume-target.test.ts`:

```ts
import assert from 'node:assert/strict';
import { getResumeTarget } from './resume-target';

assert.deepEqual(getResumeTarget(), { target: 'human', outputPath: 'dist/resume.pdf' });
assert.deepEqual(getResumeTarget('human'), { target: 'human', outputPath: 'dist/resume.pdf' });
assert.deepEqual(getResumeTarget('ats'), { target: 'ats', outputPath: 'dist/resume-ats.pdf' });
assert.throws(
  () => getResumeTarget('print'),
  /Unsupported resume target "print"\. Expected "human" or "ats"\./,
);

console.log('✓ Resume target assertions passed');
```

- [ ] **Step 2: Run the target test and verify RED**

Run: `npx tsx scripts/resume-target.test.ts`

Expected: FAIL with `Cannot find module './resume-target'`.

- [ ] **Step 3: Implement the pure target helper**

Create `scripts/resume-target.ts`:

```ts
import type { ResumeTarget } from './resume-html';

export type ResumeTargetConfig = {
  target: ResumeTarget;
  outputPath: string;
};

export function getResumeTarget(rawTarget?: string): ResumeTargetConfig {
  const target = rawTarget ?? 'human';
  if (target === 'human') return { target, outputPath: 'dist/resume.pdf' };
  if (target === 'ats') return { target, outputPath: 'dist/resume-ats.pdf' };
  throw new Error(`Unsupported resume target "${target}". Expected "human" or "ats".`);
}
```

- [ ] **Step 4: Run the target test and verify GREEN**

Run: `npx tsx scripts/resume-target.test.ts`

Expected: `✓ Resume target assertions passed`

- [ ] **Step 5: Wire the generator to the selected target**

Update `scripts/generate-resume.ts` imports and the beginning of `main`:

```ts
import { getResumeTarget } from './resume-target';

async function main() {
  const { target, outputPath } = getResumeTarget(process.argv[2]);
  const html = buildHtml(DATA, { target });
  const outPath = resolve(outputPath);
  mkdirSync(resolve('dist'), { recursive: true });
```

Keep the existing Puppeteer configuration and final log statement.

- [ ] **Step 6: Add explicit package scripts**

Replace the existing `resume` script in `package.json` with:

```json
"resume": "npm run resume-human",
"resume-human": "npx tsx scripts/generate-resume.ts human",
"resume-ats": "npx tsx scripts/generate-resume.ts ats"
```

- [ ] **Step 7: Run focused and regression tests**

Run: `npx tsx scripts/resume-target.test.ts && npx tsx scripts/resume-html.test.ts && npm run build`

Expected: both assertion suites print their success messages and Astro build exits 0.

- [ ] **Step 8: Commit Task 2**

```bash
git add scripts/resume-target.ts scripts/resume-target.test.ts scripts/generate-resume.ts package.json
git commit -m "feat: add human and ATS PDF targets"
```

---

### Task 3: Generate and verify both PDF artifacts

**Files:**
- Regenerate: `dist/resume.pdf`
- Create: `dist/resume-ats.pdf`

**Interfaces:**
- Consumes: `npm run resume-human` and `npm run resume-ats`
- Produces: visually checked PDFs with readable extracted text

- [ ] **Step 1: Generate both PDFs**

Run: `npm run resume-human && npm run resume-ats`

Expected: logs identify `dist/resume.pdf` and `dist/resume-ats.pdf`; both files exist and are non-empty.

- [ ] **Step 2: Check PDF metadata and extracted reading order**

Run:

```bash
pdfinfo dist/resume.pdf
pdfinfo dist/resume-ats.pdf
pdftotext -layout dist/resume.pdf /tmp/resume-human.txt
pdftotext dist/resume-ats.pdf /tmp/resume-ats.txt
rg -n "Skills|Senior Staff|Staff|Senior|Annual vendor cost|Languages|Kubernetes" /tmp/resume-human.txt /tmp/resume-ats.txt
```

Expected: both PDFs have Letter-sized pages; both extracted texts contain Skills, all three equivalent seniority labels, Impact content, and representative skills. ATS text presents Impact and Skills in source order without interleaving columns.

- [ ] **Step 3: Render pages for visual inspection**

Run:

```bash
mkdir -p tmp/resume-human tmp/resume-ats
pdftoppm -png -r 120 dist/resume.pdf tmp/resume-human/page
pdftoppm -png -r 120 dist/resume-ats.pdf tmp/resume-ats/page
```

Inspect every generated page image. Confirm no clipping, overlap, blank spill pages, orphaned headings, or broken links; confirm the human Impact remains a four-card row and ATS Impact is visibly single-column.

- [ ] **Step 4: Adjust only if verification finds layout defects**

If the added human Skills section creates overflow, reduce spacing inside `.skills-grid`/`.skills-group` before changing global font sizes or Puppeteer margins. Add or update an HTML assertion first for any behavioral markup change, rerun it red, apply the minimal correction, and rerun all Task 2 tests plus both PDF generations.

- [ ] **Step 5: Run final verification**

Run:

```bash
npx tsx scripts/resume-target.test.ts
npx tsx scripts/resume-html.test.ts
npm run test:work-ids
npm run test:projects
npm run test:coredns-case-study
npm run build
git diff --check
git status --short
```

Expected: every test/build command exits 0, `git diff --check` prints nothing, and status contains only intentional PDF or verification artifacts not already committed.

- [ ] **Step 6: Commit verified PDF artifacts if this repository tracks them**

The existing `dist/resume.pdf` is tracked, so add both target artifacts:

```bash
git add dist/resume.pdf dist/resume-ats.pdf
git commit -m "build: generate human and ATS resumes"
```
