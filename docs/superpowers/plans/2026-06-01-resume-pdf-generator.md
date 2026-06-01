# Resume PDF Generator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a reproducible script that generates `resume.pdf` from `src/data/resume.tsx`.

**Architecture:** A single entry-point script (`scripts/generate-resume.ts`) imports resume data, delegates to an HTML builder function in `scripts/resume-html.ts`, then uses Puppeteer to render and save the PDF. Data flows one-way: `DATA` → `buildHtml()` → Puppeteer → `resume.pdf`.

**Tech Stack:** `tsx` (TypeScript executor, already available via `npx`), `puppeteer` (headless Chromium), Node.js built-in `fs` and `assert` modules.

---

## File Map

| File | Status | Purpose |
|---|---|---|
| `scripts/resume-html.ts` | Create | Pure `buildHtml(data)` function → HTML string |
| `scripts/resume-html.test.ts` | Create | Node `assert` smoke tests for `buildHtml` |
| `scripts/generate-resume.ts` | Create | Entry point: Puppeteer launch + PDF write |
| `package.json` | Modify | Add `puppeteer` devDependency |
| `.gitignore` | Modify | Add `resume.pdf` |

---

## Task 1: Install puppeteer

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install puppeteer**

```bash
npm install --save-dev puppeteer
```

Expected: `puppeteer` added to `devDependencies`. Chromium is downloaded automatically (~150 MB one-time).

- [ ] **Step 2: Verify puppeteer is importable**

```bash
npx tsx -e "import puppeteer from 'puppeteer'; console.log(typeof puppeteer.launch)"
```

Expected output: `function`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add puppeteer for resume PDF generation"
```

---

## Task 2: Write failing tests for the HTML builder

**Files:**
- Create: `scripts/resume-html.test.ts`

- [ ] **Step 1: Create the test file**

```typescript
// scripts/resume-html.test.ts
import assert from 'node:assert/strict';
import { DATA } from '../src/data/resume';
import { buildHtml } from './resume-html';

const html = buildHtml(DATA);

assert(html.startsWith('<!DOCTYPE html>'), 'should start with doctype');
assert(html.includes(DATA.name), `should include name: ${DATA.name}`);
assert(html.includes(DATA.summary), 'should include summary');
assert(html.includes(DATA.work[0].company), 'should include first employer');
assert(html.includes(DATA.work[0].description), 'should include first job description');
assert(html.includes(DATA.impact[0].value), 'should include first impact value');
assert(html.includes(DATA.impact[0].label), 'should include first impact label');
assert(html.includes(DATA.education[0].school), 'should include first school');
assert(html.includes(DATA.openSource[0].highlights[0].title), 'should include first OS contribution');
assert(html.includes(DATA.projects[0].title), 'should include first project title');
assert(html.includes(DATA.projects[0].description), 'should include first project description');
assert(html.includes(DATA.contact.email), 'should include email');
assert(html.includes('github.com/mlowery'), 'should include GitHub URL');
assert(html.includes('linkedin.com/in/matlowery'), 'should include LinkedIn URL');

console.log('✓ All assertions passed');
```

- [ ] **Step 2: Run to confirm it fails**

```bash
npx tsx scripts/resume-html.test.ts
```

Expected: Error — `Cannot find module './resume-html'`

---

## Task 3: Implement the HTML builder

**Files:**
- Create: `scripts/resume-html.ts`

- [ ] **Step 1: Create `scripts/resume-html.ts`**

```typescript
// scripts/resume-html.ts
import type { DATA } from '../src/data/resume';

type ResumeData = typeof DATA;

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildHtml(data: ResumeData): string {
  const { name, summary, contact, work, education, impact, openSource, projects } = data;

  const githubDisplay = contact.social.GitHub.url.replace('https://', '');
  const linkedinDisplay = contact.social.LinkedIn.url.replace('https://', '');
  const recentTitle = work[0].title;

  const impactHtml = impact.map(item => `
    <div class="impact-card">
      <div class="impact-value">${esc(item.value)}</div>
      <div class="impact-label">${esc(item.label)}</div>
      <div class="impact-desc">${esc(item.description)}</div>
    </div>`).join('');

  const workHtml = work.map(job => `
    <div class="work-entry">
      <div class="work-header">
        <div>
          <span class="work-company">${esc(job.company)}</span>
          <span class="work-sep"> — </span>
          <span class="work-title">${esc(job.title)}</span>
        </div>
        <span class="work-dates">${esc(job.start)} – ${job.end ? esc(job.end) : 'Present'}</span>
      </div>
      <p class="work-desc">${esc(job.description)}</p>
    </div>`).join('');

  const educationHtml = education.map(edu => `
    <div class="edu-entry">
      <div>
        <span class="edu-school">${esc(edu.school)}</span>
        <span class="edu-degree"> — ${esc(edu.degree)}</span>
      </div>
      <span class="edu-dates">${esc(edu.start)} – ${esc(edu.end)}</span>
    </div>`).join('');

  const openSourceHtml = openSource.map(group => `
    <div class="os-group">
      <div class="os-group-name">${esc(group.name)}</div>
      ${group.highlights.map(h => `
        <div class="os-entry">
          <span class="os-project">${esc(h.project)}</span>
          <span class="os-sep"> — </span>
          <span class="os-detail">${esc(h.detail)}</span>
          <a class="os-url" href="${esc(h.url)}">${esc(h.url)}</a>
        </div>`).join('')}
    </div>`).join('');

  const projectsHtml = projects.map(p => `
    <div class="project-entry">
      <span class="project-name">${esc(p.title)}</span>
      <span class="project-sep"> — </span>
      <span class="project-desc">${esc(p.description)}</span>
      <div class="project-tags">${[...p.technologies].map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  font-size: 10.5px;
  line-height: 1.45;
  color: #1a1a1a;
  background: white;
  padding: 36px 44px;
}
.header { margin-bottom: 14px; }
.header-name { font-size: 22px; font-weight: 700; letter-spacing: -0.3px; }
.header-title { font-size: 11px; color: #555; margin-top: 3px; }
.header-contact { font-size: 9.5px; color: #666; margin-top: 4px; }
.header-contact a { color: #666; text-decoration: none; }
hr { border: none; border-top: 1px solid #e0e0e8; margin: 12px 0; }
.section { margin-bottom: 14px; }
.section-heading {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #4f46e5;
  border-left: 3px solid #4f46e5;
  padding-left: 7px;
  margin-bottom: 9px;
}
.summary { color: #444; }
.impact-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.impact-card {
  background: #f8f8fb;
  border: 1px solid #e4e4f0;
  border-radius: 6px;
  padding: 9px 10px;
}
.impact-value { font-size: 17px; font-weight: 700; }
.impact-label { font-size: 8.5px; font-weight: 600; color: #555; margin-top: 2px; }
.impact-desc { font-size: 8px; color: #888; margin-top: 3px; line-height: 1.3; }
.work-entry { margin-bottom: 9px; }
.work-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
}
.work-company { font-weight: 700; }
.work-sep { color: #bbb; }
.work-title { color: #555; }
.work-dates { font-size: 9px; color: #888; white-space: nowrap; flex-shrink: 0; }
.work-desc { color: #444; margin-top: 3px; }
.edu-entry {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 5px;
}
.edu-school { font-weight: 600; }
.edu-degree { color: #555; }
.edu-dates { font-size: 9px; color: #888; white-space: nowrap; flex-shrink: 0; }
.os-group { margin-bottom: 9px; }
.os-group-name { font-weight: 600; font-size: 9.5px; color: #333; margin-bottom: 5px; }
.os-entry { margin-bottom: 4px; }
.os-project { font-weight: 600; }
.os-sep { color: #bbb; }
.os-detail { color: #444; }
.os-url {
  display: block;
  color: #4f46e5;
  text-decoration: none;
  font-size: 8px;
  margin-top: 1px;
}
.project-entry { margin-bottom: 7px; }
.project-name { font-weight: 700; }
.project-sep { color: #bbb; }
.project-desc { color: #444; }
.project-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 3px; }
.tag {
  font-size: 8px;
  color: #555;
  background: #f0f0f8;
  border: 1px solid #e0e0ee;
  border-radius: 3px;
  padding: 1px 5px;
}
</style>
</head>
<body>

<div class="header">
  <div class="header-name">${esc(name)}</div>
  <div class="header-title">${esc(recentTitle)} &middot; Denver, CO</div>
  <div class="header-contact">
    <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>
    &nbsp;&middot;&nbsp;
    <a href="${esc(contact.social.GitHub.url)}">${esc(githubDisplay)}</a>
    &nbsp;&middot;&nbsp;
    <a href="${esc(contact.social.LinkedIn.url)}">${esc(linkedinDisplay)}</a>
  </div>
</div>
<hr>

<div class="section">
  <div class="section-heading">About</div>
  <p class="summary">${esc(summary)}</p>
</div>

<div class="section">
  <div class="section-heading">Impact</div>
  <div class="impact-grid">${impactHtml}</div>
</div>

<div class="section">
  <div class="section-heading">Work Experience</div>
  ${workHtml}
</div>

<div class="section">
  <div class="section-heading">Education</div>
  ${educationHtml}
</div>

<div class="section">
  <div class="section-heading">Open Source</div>
  ${openSourceHtml}
</div>

<div class="section">
  <div class="section-heading">Personal Projects</div>
  ${projectsHtml}
</div>

</body>
</html>`;
}
```

- [ ] **Step 2: Run the tests**

```bash
npx tsx scripts/resume-html.test.ts
```

Expected: `✓ All assertions passed`

- [ ] **Step 3: Commit**

```bash
git add scripts/resume-html.ts scripts/resume-html.test.ts
git commit -m "feat: add resume HTML builder with smoke tests"
```

---

## Task 4: Implement the generator script and produce the PDF

**Files:**
- Create: `scripts/generate-resume.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Create `scripts/generate-resume.ts`**

```typescript
// scripts/generate-resume.ts
import puppeteer from 'puppeteer';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { DATA } from '../src/data/resume';
import { buildHtml } from './resume-html';

async function main() {
  const html = buildHtml(DATA);
  const outPath = resolve('resume.pdf');

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.5in', right: '0.45in', bottom: '0.5in', left: '0.45in' },
  });
  await browser.close();

  writeFileSync(outPath, pdf);
  console.log(`✓ resume.pdf written to ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Run the generator**

```bash
npx tsx scripts/generate-resume.ts
```

Expected: `✓ resume.pdf written to /Users/mat/src/site/resume.pdf`

- [ ] **Step 3: Open and visually review the PDF**

```bash
open resume.pdf
```

Check:
- Header: name, title + "Denver, CO", email · GitHub · LinkedIn links
- Impact: 4 shaded cards in a row with large metric values
- Work Experience: all 6 jobs, company bold, title + dates, description below
- Education: 2 UCF degrees
- Open Source: two groups with individual contributions and URLs
- Personal Projects: 5 entries with inline tech tags
- Fits comfortably on 2 pages — not cramped, not overflowing

**If text is too dense** (spilling past 2 pages), reduce `font-size` from `10.5px` to `10px` in `resume-html.ts` and re-run.

**If sections feel too sparse** (lots of empty space on page 2), increase `font-size` to `11px` or increase `margin-bottom` on `.section`.

- [ ] **Step 4: Add resume.pdf to .gitignore**

```bash
echo 'resume.pdf' >> .gitignore
```

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-resume.ts .gitignore
git commit -m "feat: add resume PDF generator script"
```

---

## Reproducing the output

After initial setup (`npm install`), regenerate the PDF any time with:

```bash
npx tsx scripts/generate-resume.ts
```

To update content, edit `src/data/resume.tsx` and re-run. To adjust layout or styling, edit `scripts/resume-html.ts` and re-run.
