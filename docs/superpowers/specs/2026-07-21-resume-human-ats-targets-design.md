# Human and ATS Resume Targets Design

## Goal

Generate distinct human-readable and applicant-tracking-system-friendly PDF resumes from the same resume data while keeping the website consistent with both versions.

## Public Interface

- `npm run resume-human` generates the human-targeted PDF at `dist/resume.pdf`.
- `npm run resume-ats` generates the ATS-targeted PDF at `dist/resume-ats.pdf`.
- `npm run resume` remains a compatibility alias for `npm run resume-human`.

The PDF generator accepts an explicit `human` or `ats` target. An omitted target defaults to `human` so existing direct invocations remain compatible.

## Shared Content

The website and both PDFs consume the same `DATA` object in `src/data/resume.tsx`. Update the stored work titles, rather than decorating them only during PDF rendering:

- `Senior MTS, Software Engineer (Senior Staff)`
- `MTS 2, Software Engineer (Staff)`
- `MTS 1, Software Engineer (Senior)`

Both MTS 2 work entries receive the Staff equivalent. The MTS 1 title belongs to the X.commerce entry but is included because it uses the same eBay-specific title ladder. Non-MTS titles remain unchanged.

The existing `skillGroups` collection is the sole content source for the new standalone Skills section in both PDFs. Icon-focused `skills` data remains available to the website and is not duplicated into the PDF renderer.

## Rendering Architecture

Keep one `buildHtml` renderer with a target option. Shared sections use the same code and data. Small target-specific render functions produce the Impact and Skills markup, and target-specific CSS controls presentation without duplicating the complete document.

The human target preserves the current visual hierarchy and four-card Impact grid. Its Skills section uses a compact two-column group layout. Each group has a strong label followed by naturally wrapped, pill-shaped skill tags with a very light gray-lavender fill, subtle border, compact padding, and no icons or shadows.

The ATS target prioritizes semantic reading order and plain text extraction:

- Impact is a single-column list, with each item represented in source order and containing its value, label, and description.
- Skills is a single-column collection of labeled groups with comma-separated skill names.
- Neither ATS section relies on CSS grid or multi-column layout.

All content remains escaped through the existing HTML escaping helper.

## Generator and Output Selection

The generator parses one optional command-line target argument. It rejects unsupported targets with a clear error and nonzero exit status. The selected target determines both the renderer option and output path:

| Target | Output |
| --- | --- |
| `human` | `dist/resume.pdf` |
| `ats` | `dist/resume-ats.pdf` |

The package scripts pass these explicit arguments. The existing Puppeteer Letter-size PDF settings remain unchanged unless visual verification shows that the added human Skills section causes overflow.

## Testing

Extend the HTML tests to cover observable output rather than only string smoke checks:

- Both targets include a standalone Skills heading and data from every skill group.
- Human output contains the Impact grid/card structure.
- ATS output contains the single-column Impact list structure and excludes the Impact grid class.
- ATS Skills markup excludes grid and multi-column classes.
- Human Skills markup includes a pill element for every skill; ATS markup excludes pill elements.
- Shared work output contains all three parenthetical title mappings.
- Existing resume content and contact assertions continue to pass.

Extract the target-to-output-path decision into a pure helper so it can be tested without launching Puppeteer. Test the default/human path, ATS path, and rejection of an unsupported target.

After automated tests pass, generate both PDFs and inspect their rendered pages and extracted text. Confirm that the human version remains visually balanced, the ATS version reads in source order, both contain Skills, and neither clips or loses content.

## Scope

This change does not create separate resume content stores, alter work descriptions, change website section layouts, or attempt to score the ATS resume against a specific vendor. It only adds the two build targets, target-appropriate Impact and Skills structures, and shared explanatory title text.
