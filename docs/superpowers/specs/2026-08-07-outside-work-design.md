# Outside Work Section Design

## Goal

Add a small personal-interests section to the website and human resume while keeping the ATS resume strictly professional and unchanged.

## Content

Use the heading **Outside Work** and these three interests:

- International travel
- Cooking across cuisines
- Strength training & HIIT

Store the interests in the shared resume data so the website and human resume use one source of truth. Each item includes a stable icon identifier for website rendering.

## Website

Place Outside Work after Personal Projects and before Contact. Render the interests as subtle, pill-shaped tags consistent with the existing visual language:

- Airplane icon for International travel
- Cooking-pot icon for Cooking across cuisines
- Dumbbell icon for Strength training & HIIT

Each icon is decorative; the adjacent visible label supplies its accessible name. Pills should wrap naturally on narrow screens and support the existing light and dark themes.

## Human Resume

Place Outside Work after Personal Projects. Render the three interests as a compact single-line list to minimize pagination pressure. The PDF does not need icons or website-style pills.

## ATS Resume

Do not render the heading, interests, or related markup in the ATS variant.

## Testing and Verification

- Assert that the human-resume HTML contains the heading and all three interests.
- Assert that the ATS-resume HTML contains none of the heading or interests.
- Add a source-level website check for the section, the three labels, and the three icon mappings.
- Run the production site build and both resume-generation targets.
- Inspect the website and rendered human PDF for spacing, wrapping, and page count.
- Confirm the rendered ATS PDF contains no Outside Work content.

## Scope

This change does not alter existing professional content, section ordering outside the requested placement, or ATS styling.
