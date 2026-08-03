# Resume Content and Work Layout Refresh Design

## Goal

Update the website, human PDF, and ATS PDF to use a platform-engineering title, a tighter skill taxonomy, line-by-line work bullets, and a smaller project set.

## Shared Content

`src/data/resume.tsx` remains the single content source for all three outputs.

- Set the title to `Senior Platform Engineer | Kubernetes, Cloud Infrastructure, Developer Productivity`.
- Remove the `AI-assisted engineering` skill group.
- Remove the `Databases` skill group.
- Add `etcd` to `Platform and Kubernetes`.
- Remove the `emcee` and `kubectl-watchhook` projects.
- Remove imports used only by deleted projects.

The website inherits these changes directly from `DATA`. Existing website work bullets already render as individual items and need no component change.

## PDF Work Layout

Both PDF targets render every `job.bullets` entry as its own semantic `<li>` inside a work-description `<ul>`. Remove the inline separator markup and styling. Keep company, title, dates, section order, and target-specific Impact and Skills presentation unchanged.

Use compact indentation and vertical spacing to preserve the current two-page Letter layout while making each accomplishment independently scannable.

## Validation

Automated checks cover:

- The new title appears in both PDF HTML variants.
- Removed skill groups and projects are absent.
- `etcd` appears in `Platform and Kubernetes`.
- Every work bullet produces one `<li class="work-bullet">` in both variants.
- Inline bullet separators are absent.
- The personal-project validation helper expects only the two remaining projects.

After the tests and site build pass, regenerate both PDFs. Confirm both remain two pages, extracted text contains the new title and revised skills/projects, and rendered pages show clean bullet alignment without clipping or overlap.
