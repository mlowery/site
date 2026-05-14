# Personal Portfolio Site Design

Date: 2026-05-14

## Goal

Build a hiring-focused personal portfolio for Mat Lowery, a senior backend and platform engineer. The site will be based on the Astro v6 Starfolio template and hosted on Cloudflare Pages.

The site should help Mat get hired without framing the next role as a step down. It should avoid title-forward positioning in the hero and let work history carry seniority. The public story is title-flexible senior IC work focused on developer productivity, internal tools, infrastructure automation, and platform ergonomics.

## Source Material

Use these local sources first:

- `/Users/mat/src/personal/notes/2026/04/25/linkedin/LinkedIn-Profile-Latest.pdf`
- `/Users/mat/src/personal/notes/2026/04/30/career-twilight`
- `/Users/mat/src/personal/notes/2026/04/25/linkedin/supporting`

The current LinkedIn profile PDF positions Mat as:

> Senior Platform Engineer | Developer Productivity, Internal Tools, Infrastructure Automation

Its summary emphasizes making complex infrastructure easier for engineers to understand and use, applying infrastructure experience upstream through better tools, better defaults, platform ergonomics, reduced cognitive load, and safer workflows.

Do not use stale LinkedIn crawl text or the old local `current_profile/about.md` text as the positioning source.

## Positioning

The site will lead with role fit, human context, and proof:

- Role fit: internal platforms, automation, developer tools, and infrastructure that gets out of the way.
- Human context: applying years of Kubernetes, control-plane, DNS, registry, database, and platform experience upstream toward sustainable engineering.
- Proof: measurable outcomes such as vendor-cost savings, DNS/query reductions, pager-volume reduction, upload/CI improvements, reliability gains, and large-scale cleanup.

Avoid phrases that suggest burnout, disengagement, an easier job, or retreat from responsibility. Prefer language such as sustainable technical ownership, deliberate engineering, platform ergonomics, developer productivity, internal tools, automation, and reducing operational drag.

## Approach

Use a Starfolio-plus resume site:

- Fork or import `https://github.com/webrating/starfolio` into `/Users/mat/src/site`.
- Commit the unmodified starting point.
- Keep the template's data-driven pattern where possible.
- Add custom data/components only where the approved structure cannot be represented cleanly.
- Use small iterative git commits.
- Install local dependencies needed to run and render the Astro site.

This approach keeps the first version credible and shippable while leaving room for custom sections such as Impact and Praise.

## Page Structure

Initial one-page structure:

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

Omit Failures from the first version. Keep hobbies out of the professional first pass unless they become a small lower-page note later.

## Section Notes

### Hero

Use a compact hiring-oriented first screen:

- One-sentence headline about making complex infrastructure easier to use.
- Short paragraph about applying Kubernetes/platform experience upstream.
- Social links and contact/resume links.
- Three concise impact metrics.

Avoid explicit "Senior vs Staff" language in the hero.

### About

Condense the latest LinkedIn summary. The main thread is making complex systems easier for engineers to understand and use through automation, observability, documentation, reduced cognitive load, safer workflows, and better platform ergonomics.

### Impact

Lead with measurable outcomes. Candidate items include:

- Six-figure annual vendor-cost savings from registry migration.
- 75% reduction in DNS query volume.
- 4x DNS QPS improvement.
- 80% CPU and 50% memory reductions in CoreDNS work.
- 50% pager-volume reduction.
- 30% APIServer incident reduction.
- Automated etcd defragmentation and reconciliation across 100 clusters.
- Cleanup of thousands of namespaces and six figures worth of stale objects.
- Federation sync controller split to extend scale runway.

### Skills

Group skills by practical hiring categories:

- Languages: Go, Python, Ruby, Java.
- Platform and Kubernetes: Kubernetes, etcd, APIServer, CoreDNS, operators, federation, container registries.
- Infrastructure and delivery: GitOps, automation, CI/CD, observability, cloud and bare-metal infrastructure.
- Databases: MySQL, MongoDB, Couchbase, Cassandra, Redis, OpenStack Trove.
- Tools and practices: testing, runbooks, documentation, technical mentoring, remote written collaboration.
- AI-assisted engineering: ChatGPT, Gemini, Claude. Show these as recognizable logos/icons within Skills, not as a standalone section.

### Open Source Contributions

Include links:

- `https://github.com/search?q=author%3Amlowery`
- `https://review.opendev.org/q/owner:mlowery@ebaysf.com`

Highlight relevant ecosystems from the LinkedIn profile: Kubernetes/CoreDNS, OpenStack Trove/OpenStack, Spring Security, Apache Jackrabbit, CloudInit.

### Work Experience

Use the latest LinkedIn PDF as the main source. Keep the timeline concise enough for web scanning while preserving seniority signals:

- eBay Sr. MTS, Software Engineer
- eBay MTS 2 roles
- X.commerce MTS 1
- Pentaho Senior Software Engineer
- Wyndham Application Software Developer

The eBay sections should show platform depth without over-indexing on pager-heavy production support.

### Personal Projects

Include the requested projects when details are available:

- Emcee
- Sticky-kubeconfig
- Executable-image
- Dot files
- Kubectl-watchhook

Describe each by purpose and problem solved rather than as a bare link list.

### Speaking

Include:

- OpenStack Trove Day
- SpringOne Americas

### Education

Include University of Central Florida MS and BS in Computer Science.

### Praise

Use `YJMMD_Reports_15-Apr-2026 (1).xlsx` from the supporting folder. Select a small number of strong, hiring-relevant quotes or summarized themes. Attribute only where the source supports attribution. Keep the section compact.

## Visual Direction

Stay close to Starfolio's minimal developer portfolio style. Prioritize readability, scanning, and professional density over decorative effects. The design should feel like a practical senior engineer's site, not a marketing landing page.

Do not use token-intensive visual companion workflows for brainstorming.

## Technical Plan Boundary

This document is the approved design checkpoint. Implementation planning should happen next, after user review, using the writing-plans workflow.
