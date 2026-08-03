// scripts/resume-html.ts
import type { DATA } from '../src/data/resume';

type ResumeData = typeof DATA;
export type ResumeTarget = 'human' | 'ats';

type BuildHtmlOptions = {
  target?: ResumeTarget;
};

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildHtml(
  data: ResumeData,
  { target = 'human' }: BuildHtmlOptions = {},
): string {
  const { name, summary, contact, work, education, impact, skillGroups, openSource, projects } = data;

  const githubDisplay = contact.social.GitHub.url.replace('https://', '');
  const linkedinDisplay = contact.social.LinkedIn.url.replace('https://www.', '');
  const urlDisplay = (data as any).url.replace('https://', '') as string;
  const title = (data as any).title as string;

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

  const skillsSectionHtml = `<div class="section">
  <div class="section-heading">Skills</div>
  ${skillsHtml}
</div>`;

  const workHtml = work.map(job => {
    const phrases: string[] = [...(job as any).bullets];
    const descHtml = `<ul class="work-bullets">${phrases.map(phrase => `
        <li class="work-bullet">${esc(phrase)}</li>`).join('')}
      </ul>`;
    return `
    <div class="work-entry">
      <div class="work-header">
        <div>
          <span class="work-company">${esc(job.company)}</span>
          <span class="work-sep"> — </span>
          <span class="work-title">${esc(job.title)}</span>
        </div>
        <span class="work-dates">${esc(job.start)} – ${job.end ? esc(job.end) : 'Present'}</span>
      </div>
      ${descHtml}
    </div>`;
  }).join('');

  const educationHtml = education.map(edu => `
    <div class="edu-entry">
      <div>
        <span class="edu-school">${esc(edu.school)}</span>
        <span class="edu-degree"> — ${esc(edu.degree)}</span>
      </div>
      <span class="edu-dates">${esc(edu.start)} – ${esc(edu.end)}</span>
    </div>`).join('');

  const openSourceHtml = openSource.flatMap(group =>
    group.highlights.map(h => `
      <div class="os-entry">
        <span class="os-project">${esc(h.project)}</span>
        <span class="os-sep"> — </span>
        <a class="os-title-link" href="${esc(h.url)}">${esc(h.title)}</a>
        <span class="os-detail">: ${esc(h.detail)}</span>
      </div>`)
  ).join('');

  const projectsHtml = projects.map(p => `
    <div class="project-entry">
      <a class="project-name-link" href="${esc(p.href)}">${esc(p.title)}</a>
      <span class="project-sep"> — </span>
      <span class="project-desc">${esc(p.description)}</span>
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
.impact-list, .skills-list { padding-left: 18px; }
.impact-item, .skills-item { margin-bottom: 5px; }
.skills-grid { display: grid; grid-template-columns: 1fr; gap: 4px; }
.skills-group { display: flex; align-items: baseline; gap: 5px; font-size: 9px; line-height: 1.35; }
.skills-name { font-weight: 700; white-space: nowrap; }
.skill-pills { display: flex; flex-wrap: wrap; gap: 2px; }
.skill-pill {
  background: #f7f7fc;
  border: 1px solid #e4e4f0;
  border-radius: 999px;
  color: #444;
  font-size: 8px;
  padding: 0 4px;
}
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
.work-bullets { color: #444; margin-top: 3px; padding-left: 16px; }
.work-bullet { margin-bottom: 1px; }
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
.page-2-header { break-before: page; margin-bottom: 14px; }
.os-entry { margin-bottom: 5px; }
.os-project { font-weight: 600; }
.os-sep { color: #bbb; }
.os-title-link { color: #4f46e5; text-decoration: none; font-style: italic; }
.os-title-link:hover { text-decoration: underline; }
.os-detail { color: #444; }
.project-entry { margin-bottom: 7px; }
.project-name-link { font-weight: 700; color: #4f46e5; text-decoration: none; }
.project-name-link:hover { text-decoration: underline; }
.project-sep { color: #bbb; }
.project-desc { color: #444; }
.human .section { margin-bottom: 12px; }
.human .work-entry { margin-bottom: 5px; }
.human .work-bullets { font-size: 9.5px; line-height: 1.25; }
.ats { font-size: 10px; line-height: 1.4; }
.ats .header { margin-bottom: 10px; }
.ats hr { margin: 10px 0; }
.ats .section { margin-bottom: 10px; }
.ats .section-heading { margin-bottom: 7px; }
.ats .work-entry { margin-bottom: 7px; }
</style>
</head>
<body class="${target}">

<div class="header">
  <div class="header-name">${esc(name)}</div>
  <div class="header-title">${esc(title)} &middot; Denver, CO</div>
  <div class="header-contact">
    <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>
    &nbsp;&middot;&nbsp;
    <a href="tel:${esc(contact.tel)}">${esc(contact.tel)}</a>
    &nbsp;&middot;&nbsp;
    <a href="${esc((data as any).url)}">${esc(urlDisplay)}</a>
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
  ${impactHtml}
</div>

${skillsSectionHtml}

<div class="section">
  <div class="section-heading">Work Experience</div>
  ${workHtml}
</div>

<div class="page-2-header">
  <div class="header-name">${esc(name)}</div>
  <div class="header-title">${esc(title)} &middot; Denver, CO</div>
  <div class="header-contact">
    <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>
    &nbsp;&middot;&nbsp;
    <a href="tel:${esc(contact.tel)}">${esc(contact.tel)}</a>
    &nbsp;&middot;&nbsp;
    <a href="${esc((data as any).url)}">${esc(urlDisplay)}</a>
    &nbsp;&middot;&nbsp;
    <a href="${esc(contact.social.GitHub.url)}">${esc(githubDisplay)}</a>
    &nbsp;&middot;&nbsp;
    <a href="${esc(contact.social.LinkedIn.url)}">${esc(linkedinDisplay)}</a>
  </div>
</div>
<hr>

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
