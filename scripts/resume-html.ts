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
          <span class="os-title">${esc(h.title)}</span>
          <span class="os-detail">: ${esc(h.detail)}</span>
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
.os-title { font-style: italic; color: #333; }
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
