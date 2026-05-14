# Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a hiring-focused Astro v6 portfolio site for Mat Lowery from the Starfolio template, using local LinkedIn/career notes as content sources and preserving small iterative git commits.

**Architecture:** Start from Starfolio and keep its data-driven structure wherever possible. Put hiring content in `src/data/resume.tsx` and site settings in `src/data/config.ts`; only modify `src/pages/index.astro` and focused section components if Impact, Praise, or grouped Skills cannot be represented cleanly through the template's existing data model. Static logos/assets live in `public/`.

**Tech Stack:** Astro v6, TypeScript, React, Tailwind CSS v4, shadcn/ui-style components, Cloudflare Pages adapter, pnpm, local Python virtualenv only when reading XLSX/PDF content requires Python tooling.

---

## File Structure

Expected files after importing Starfolio:

- Modify: `src/data/resume.tsx` - primary resume/profile content, section ordering, skills, projects, social links.
- Modify: `src/data/config.ts` - site URL, SEO title/description, theme settings.
- Modify if needed: `src/pages/index.astro` - homepage section order if Starfolio's existing data controls are insufficient.
- Modify if needed: `src/components/*` - focused component changes only for new Impact, Praise, or grouped Skill presentation.
- Create if needed: `src/data/impact.ts` - typed impact metrics if keeping them separate reduces `resume.tsx` complexity.
- Create if needed: `src/data/praise.ts` - selected praise entries extracted from spreadsheet.
- Create: `public/logos/chatgpt.svg`, `public/logos/gemini.svg`, `public/logos/claude.svg` - simple local logo assets for the AI-assisted engineering skill row, unless existing icon dependencies provide better recognizable icons.
- Keep: `docs/superpowers/specs/2026-05-14-personal-portfolio-design.md` - approved design source.
- Keep: `docs/superpowers/plans/2026-05-14-personal-portfolio-implementation.md` - this plan.

Local source material:

- Read: `/Users/mat/src/personal/notes/2026/04/25/linkedin/LinkedIn-Profile-Latest.pdf`
- Read: `/Users/mat/src/personal/notes/2026/04/30/career-twilight/linkedin-about-suggestions.md`
- Read: `/Users/mat/src/personal/notes/2026/04/30/career-twilight/next-role-positioning-output.md`
- Read: `/Users/mat/src/personal/notes/2026/04/25/linkedin/supporting/2024-2025-summary.md`
- Read: `/Users/mat/src/personal/notes/2026/04/25/linkedin/supporting/2022-2023-summary.md`
- Read: `/Users/mat/src/personal/notes/2026/04/25/linkedin/supporting/YJMMD_Reports_15-Apr-2026 (1).xlsx`

## Tasks

### Task 1: Import Starfolio Baseline

**Files:**
- Create/modify: Starfolio project files at repo root
- Keep: `docs/superpowers/specs/2026-05-14-personal-portfolio-design.md`
- Keep: `docs/superpowers/plans/2026-05-14-personal-portfolio-implementation.md`

- [ ] **Step 1: Confirm the repo contains only planning docs**

Run:

```bash
git status --short --branch
rg --files
```

Expected: branch `main`, planning docs present, no Starfolio source files yet.

- [ ] **Step 2: Import Starfolio without deleting planning docs**

Run:

```bash
git clone https://github.com/webrating/starfolio /private/tmp/starfolio-import
rsync -a --exclude .git /private/tmp/starfolio-import/ ./
```

Expected: files such as `package.json`, `astro.config.mjs`, `pnpm-lock.yaml`, `src/data/resume.tsx`, and `src/pages/index.astro` now exist.

- [ ] **Step 3: Inspect imported structure**

Run:

```bash
rg --files -g '!*node_modules*' | sort
sed -n '1,240p' src/data/resume.tsx
sed -n '1,220p' src/pages/index.astro
```

Expected: Starfolio uses `src/data/resume.tsx` as the primary content source and `src/pages/index.astro` as the homepage entry point.

- [ ] **Step 4: Commit the unmodified imported baseline**

Run:

```bash
git add .
git commit -m "Import Starfolio baseline"
```

Expected: commit includes Starfolio files plus the already committed planning docs remain intact.

### Task 2: Install Dependencies and Verify Baseline

**Files:**
- Modify: package manager cache/lock artifacts only if install updates them

- [ ] **Step 1: Check Node and pnpm**

Run:

```bash
node --version
pnpm --version
```

Expected: Node is `>=22.12.0`; pnpm is available.

- [ ] **Step 2: Install dependencies**

Run:

```bash
pnpm install
```

Expected: install completes without dependency resolution errors.

- [ ] **Step 3: Build baseline**

Run:

```bash
pnpm build
```

Expected: Astro build completes and writes `dist/`.

- [ ] **Step 4: Commit dependency state if changed**

Run:

```bash
git status --short
git add package.json pnpm-lock.yaml
git commit -m "Verify Starfolio dependencies"
```

Expected: commit only if install changed tracked dependency files. If no files changed, record that no commit was needed.

### Task 3: Replace Core Resume and Site Data

**Files:**
- Modify: `src/data/resume.tsx`
- Modify: `src/data/config.ts`

- [ ] **Step 1: Extract latest LinkedIn PDF text for reference**

Run:

```bash
/Users/mat/src/personal/notes/2026/04/30/career-twilight/.venv/bin/python -c "from pypdf import PdfReader; p='/Users/mat/src/personal/notes/2026/04/25/linkedin/LinkedIn-Profile-Latest.pdf'; r=PdfReader(p); print('\n\n---PAGE---\n\n'.join(page.extract_text() or '' for page in r.pages))"
```

Expected: output includes headline `Senior Platform Engineer | Developer Productivity, Internal Tools, Infrastructure Automation`, summary text, eBay roles, Pentaho, Wyndham, and UCF education.

- [ ] **Step 2: Replace personal identity fields**

Edit `src/data/resume.tsx` so the exported data uses:

```ts
name: "Mat Lowery",
initials: "ML",
location: "Denver Metropolitan Area",
description:
  "Senior platform engineer focused on developer productivity, internal tools, and infrastructure automation.",
summary:
  "I'm a senior backend and platform engineer interested in developer productivity, internal tools, and infrastructure that gets out of the way. Over the past decade, I've worked deeply within the Kubernetes ecosystem, including container registries, K8s apiserver, etcd, operators, and CoreDNS at large scale. The thread through my work is making complex systems easier for engineers to understand and use: automating repeatable work, improving observability, documenting operational paths, reducing cognitive load, and building safer workflows around infrastructure change.",
```

Keep exact property names from the imported `DATA` object. If the template uses different names, update those existing names with the same values.

- [ ] **Step 3: Replace social/contact links**

Edit `src/data/resume.tsx` contact/social data to include:

```ts
email: "mat@matlowery.com",
social: {
  GitHub: {
    name: "GitHub",
    url: "https://github.com/mlowery",
  },
  LinkedIn: {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/matlowery",
  },
}
```

If Starfolio social entries are arrays instead of a keyed object, use the existing shape and preserve the two URLs above.

- [ ] **Step 4: Replace work experience**

Edit `src/data/resume.tsx` work entries from the latest LinkedIn PDF:

```ts
{
  company: "eBay",
  title: "Sr. MTS, Software Engineer",
  start: "Feb 2022",
  end: "Present",
  description:
    "Senior backend infrastructure engineer focused on Kubernetes control planes, etcd, DNS, federation, container registry, SRE enablement, and platform automation for one of the industry's largest private Kubernetes fleets.",
  bullets: [
    "Led container registry migration from proprietary to open-source, eliminating six figures per year in vendor cost.",
    "Improved APIServer reliability with SRE team, reducing incidents 30% and pager volume 50% by prioritizing SLO signals and follow-up fixes.",
    "Rolled out operator-based automation for 100 etcd clusters, reducing manual defragmentation and pod reconciliation toil across production control planes.",
    "Split a monolithic federation sync controller into multiple processes, extending multi-year scale runway without forcing an immediate architecture rewrite.",
    "Adopted AI, including reusable skills and spec-driven development, to accelerate infrastructure changes while preserving reviewability and engineering discipline.",
  ],
}
```

Also include concise entries for eBay MTS 2, eBay DBaaS, X.commerce, Pentaho, and Wyndham using the PDF text. Keep older roles shorter than current eBay role.

- [ ] **Step 5: Replace education**

Edit education entries:

```ts
[
  {
    school: "University of Central Florida",
    degree: "Master's Degree, Computer Science",
  },
  {
    school: "University of Central Florida",
    degree: "Bachelor's Degree, Computer Science",
  },
]
```

Use Starfolio's actual education property names.

- [ ] **Step 6: Update site config**

Edit `src/data/config.ts` so SEO and site values use:

```ts
url: "https://matlowery.com",
locale: "en_US",
title: "Mat Lowery",
description:
  "Senior platform engineer focused on developer productivity, internal tools, infrastructure automation, and sustainable platform ergonomics.",
```

If `CONFIG` uses `titleTemplate` and pulls name from `resume.tsx`, keep that pattern and update only existing fields.

- [ ] **Step 7: Build and commit**

Run:

```bash
pnpm build
git add src/data/resume.tsx src/data/config.ts
git commit -m "Add Mat Lowery portfolio content"
```

Expected: build succeeds and commit contains only core data/config changes.

### Task 4: Add Impact and Hiring-Oriented Hero Proof

**Files:**
- Modify: `src/data/resume.tsx`
- Modify if needed: `src/pages/index.astro`
- Create/modify if needed: focused component file under `src/components/`

- [ ] **Step 1: Find how Starfolio renders summary, skills, and sections**

Run:

```bash
rg -n "summary|skills|projects|hackathons|work|education|DATA|section" src
```

Expected: identify the existing component or page blocks that render homepage sections.

- [ ] **Step 2: Add impact metrics to data**

Prefer adding an `impact` array to `DATA` in `src/data/resume.tsx`:

```ts
impact: [
  {
    label: "Annual vendor cost eliminated",
    value: "$200K+",
    description: "Led registry migration from proprietary to open-source infrastructure.",
  },
  {
    label: "DNS query volume reduction",
    value: "75%",
    description: "Tuned CoreDNS behavior and contributed upstream improvements.",
  },
  {
    label: "Pager volume reduction",
    value: "50%",
    description: "Prioritized SLO signals and follow-up fixes with the APIServer SRE team.",
  },
]
```

If TypeScript rejects extra fields on `DATA`, add the corresponding type extension in the same file where `DATA` is typed.

- [ ] **Step 3: Render hero proof metrics**

If Starfolio already has a metric/project highlight area, wire `DATA.impact` into that. Otherwise add a focused `Impact` section below the hero in `src/pages/index.astro` using the template's existing layout/classes.

The rendered text must include the three metric values `$200K+`, `75%`, and `50%`.

- [ ] **Step 4: Build and commit**

Run:

```bash
pnpm build
git add src/data/resume.tsx src/pages/index.astro src/components
git commit -m "Add impact metrics"
```

Expected: build succeeds; commit includes only impact data/rendering changes.

### Task 5: Add Grouped Skills with AI-Assisted Engineering Logos

**Files:**
- Modify: `src/data/resume.tsx`
- Modify if needed: skills component under `src/components/`
- Create if needed: `public/logos/chatgpt.svg`
- Create if needed: `public/logos/gemini.svg`
- Create if needed: `public/logos/claude.svg`

- [ ] **Step 1: Add grouped skill data**

Edit `src/data/resume.tsx` so skills are grouped as:

```ts
skillGroups: [
  { name: "Languages", skills: ["Go", "Python", "Ruby", "Java"] },
  {
    name: "Platform and Kubernetes",
    skills: ["Kubernetes", "etcd", "APIServer", "CoreDNS", "Operators", "Federation", "Container registries"],
  },
  {
    name: "Infrastructure and delivery",
    skills: ["GitOps", "Automation", "CI/CD", "Observability", "Cloud infrastructure", "Bare metal"],
  },
  {
    name: "Databases",
    skills: ["MySQL", "MongoDB", "Couchbase", "Cassandra", "Redis", "OpenStack Trove"],
  },
  {
    name: "Tools and practices",
    skills: ["Testing", "Runbooks", "Documentation", "Technical mentoring", "Remote written collaboration"],
  },
  {
    name: "AI-assisted engineering",
    skills: ["ChatGPT", "Gemini", "Claude"],
  },
]
```

If the existing template only supports a flat `skills` array, keep that array for compatibility and add `skillGroups` as the richer display source.

- [ ] **Step 2: Add logo assets if no icon library has these brand marks**

Create simple SVG files in `public/logos/` named:

```text
chatgpt.svg
gemini.svg
claude.svg
```

Use simple monochrome wordmark-safe marks or text-backed icons if official logos are not already available in the project. Do not add a heavy icon dependency just for three logos.

- [ ] **Step 3: Render grouped skills**

Modify the existing skills component or `src/pages/index.astro` so each group renders a heading and compact skill chips. For the `AI-assisted engineering` group, render ChatGPT, Gemini, and Claude with the local logo image plus text label.

- [ ] **Step 4: Build and commit**

Run:

```bash
pnpm build
git add src/data/resume.tsx src/pages/index.astro src/components public/logos
git commit -m "Add grouped skills"
```

Expected: build succeeds and the Skills section includes ChatGPT, Gemini, and Claude within the skills area.

### Task 6: Add Open Source, Projects, Speaking, and Praise Content

**Files:**
- Modify: `src/data/resume.tsx`
- Create if useful: `src/data/praise.ts`
- Modify if needed: `src/pages/index.astro`
- Modify if needed: focused components under `src/components/`

- [ ] **Step 1: Add open source links**

Edit `src/data/resume.tsx` to include open source items:

```ts
openSource: [
  {
    name: "GitHub contributions",
    url: "https://github.com/search?q=author%3Amlowery",
    description: "Public contributions across infrastructure and backend ecosystems.",
  },
  {
    name: "OpenDev reviews",
    url: "https://review.opendev.org/q/owner:mlowery@ebaysf.com",
    description: "OpenStack-era code reviews and project contributions.",
  },
]
```

If the template has no open-source field, render these as projects or a custom Open Source section.

- [ ] **Step 2: Add project entries**

Add project entries for:

```ts
[
  { title: "Emcee", description: "Personal project; describe the problem solved after checking local or GitHub source.", href: "https://github.com/mlowery/emcee" },
  { title: "sticky-kubeconfig", description: "Kubernetes workflow helper; describe the problem solved after checking local or GitHub source.", href: "https://github.com/mlowery/sticky-kubeconfig" },
  { title: "executable-image", description: "Container/image tooling project; describe the problem solved after checking local or GitHub source.", href: "https://github.com/mlowery/executable-image" },
  { title: "dotfiles", description: "Personal development environment configuration.", href: "https://github.com/mlowery/dotfiles" },
  { title: "kubectl-watchhook", description: "kubectl workflow helper; describe the problem solved after checking local or GitHub source.", href: "https://github.com/mlowery/kubectl-watchhook" },
]
```

Before finalizing descriptions, inspect local repos if present under `/Users/mat/src` or GitHub READMEs if network access is available. Replace the generic descriptions with specific one-sentence descriptions.

- [ ] **Step 3: Add speaking entries**

Add speaking entries:

```ts
speaking: [
  {
    event: "SpringOne Americas",
    topic: "Spring Security usage in Pentaho product architecture",
  },
  {
    event: "OpenStack Trove Day",
    topic: "OpenStack Trove and database-as-a-service work",
  },
]
```

- [ ] **Step 4: Extract praise themes**

Use the repo-local virtualenv rule if packages are needed. If `.venv` does not exist in `/Users/mat/src/site`, create it:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install --upgrade pip
.venv/bin/python -m pip install openpyxl
```

Then inspect workbook sheets:

```bash
.venv/bin/python -c "from openpyxl import load_workbook; p='/Users/mat/src/personal/notes/2026/04/25/linkedin/supporting/YJMMD_Reports_15-Apr-2026 (1).xlsx'; wb=load_workbook(p, read_only=True, data_only=True); print(wb.sheetnames); [print(ws.title, ws.max_row, ws.max_column) for ws in wb.worksheets]"
```

Expected: sheet names and dimensions identify where praise text lives.

- [ ] **Step 5: Add compact Praise section**

Select three to five hiring-relevant praise entries or themes from the workbook. Add them to `src/data/resume.tsx` or `src/data/praise.ts` as:

```ts
export const praise = [
  {
    quote: "Short excerpt or paraphrased theme from workbook.",
    context: "Colleague feedback",
  },
]
```

Use exact short quotes only when attribution and wording are clear from the spreadsheet; otherwise paraphrase themes.

- [ ] **Step 6: Render sections and commit**

Render Open Source, Speaking, and Praise in the approved order:

1. Hero
2. About
3. Impact
4. Skills
5. Open Source Contributions
6. Work Experience
7. Personal Projects
8. Speaking
9. Education
10. Praise

Run:

```bash
pnpm build
git add src/data/resume.tsx src/data/praise.ts src/pages/index.astro src/components
git commit -m "Add portfolio proof sections"
```

Expected: build succeeds and all approved sections render.

### Task 7: Final Local Verification

**Files:**
- Modify only if verification finds defects

- [ ] **Step 1: Run production build**

Run:

```bash
pnpm build
```

Expected: successful Astro build with no TypeScript errors.

- [ ] **Step 2: Start local dev server**

Run:

```bash
pnpm dev -- --host 127.0.0.1
```

Expected: server starts at `http://127.0.0.1:4321/` unless the port is occupied.

- [ ] **Step 3: Inspect rendered page manually**

Open the local URL and verify:

- Hero does not use explicit Staff/Senior comparison language.
- First screen includes role fit, human context, and three impact metrics.
- Skills includes ChatGPT, Gemini, and Claude within the skills area.
- Failures section is absent.
- Hobbies are absent or only a small lower-page note if deliberately added later.
- Sections appear in approved order.
- Mobile width has no obvious text overlap or broken layout.

- [ ] **Step 4: Commit verification fixes**

If any fixes were needed:

```bash
pnpm build
git add src public
git commit -m "Polish portfolio rendering"
```

Expected: final build passes.

## Self-Review

Spec coverage:

- Starfolio import and baseline commit: Task 1.
- Dependency install and local render/build: Task 2 and Task 7.
- Latest LinkedIn/career positioning: Task 3.
- Hiring-focused hero and impact proof: Task 4.
- Skills with AI tools inside Skills: Task 5.
- Open source, experience, projects, speaking, education, praise: Tasks 3 and 6.
- Omit Failures: Task 7 verification.
- Avoid token-intensive visual companion: no visual companion tasks included.
- Small iterative git commits: every task ends with a commit or explicit no-change check.

Placeholder scan:

- No `TBD` or `TODO` markers.
- The only conditional instructions are based on Starfolio's actual imported file shapes and keep exact commands and target paths.

Type consistency:

- New data fields are consistently named `impact`, `skillGroups`, `openSource`, `speaking`, and `praise`.
- If Starfolio's imported types reject these fields, the plan requires extending the same data type where `DATA` is typed before rendering.
