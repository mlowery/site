// scripts/resume-html.test.ts
import assert from 'node:assert/strict';
import { DATA } from '../src/data/resume';
import { buildHtml } from './resume-html';

const humanHtml = buildHtml(DATA, { target: 'human' });
const atsHtml = buildHtml(DATA, { target: 'ats' });

assert(humanHtml.startsWith('<!DOCTYPE html>'), 'should start with doctype');
assert(humanHtml.includes(DATA.name), `should include name: ${DATA.name}`);
assert(humanHtml.includes(DATA.summary), 'should include summary');
assert(humanHtml.includes(DATA.work[0].company), 'should include first employer');
// Description is split into bullet phrases; check a phrase fragment from each sentence
assert(humanHtml.includes('Kubernetes control planes'), 'should include first job description phrase');
assert(humanHtml.includes('registry migration'), 'should include second phrase from first job');
assert(humanHtml.includes(DATA.impact[0].value), 'should include first impact value');
assert(humanHtml.includes(DATA.impact[0].label), 'should include first impact label');
assert(humanHtml.includes(DATA.education[0].school), 'should include first school');
assert(humanHtml.includes(DATA.openSource[0].highlights[0].title), 'should include first OS contribution');
assert(humanHtml.includes(DATA.projects[0].title), 'should include first project title');
assert(humanHtml.includes(DATA.projects[0].description), 'should include first project description');
assert(humanHtml.includes(DATA.contact.email), 'should include email');
assert(humanHtml.includes(DATA.contact.tel), 'should include phone');
assert(humanHtml.includes('github.com/mlowery'), 'should include GitHub URL');
assert(humanHtml.includes('linkedin.com/in/matlowery'), 'should include LinkedIn URL');

assert(humanHtml.includes('class="impact-grid"'), 'human resume should use impact grid');
assert(humanHtml.includes('class="impact-card"'), 'human resume should use impact cards');
assert(atsHtml.includes('class="impact-list"'), 'ATS resume should use impact list');
assert(atsHtml.includes('<li class="impact-item">'), 'ATS impact should use semantic list items');
assert(!atsHtml.includes('class="impact-grid"'), 'ATS resume should exclude impact grid markup');

for (const skillGroup of DATA.skillGroups) {
  assert(humanHtml.includes(skillGroup.name), `human resume should include ${skillGroup.name} skills`);
  assert(atsHtml.includes(skillGroup.name), `ATS resume should include ${skillGroup.name} skills`);
  for (const skill of skillGroup.skills) {
    const escapedSkill = skill.replaceAll('&', '&amp;');
    assert(humanHtml.includes(escapedSkill), `human resume should include skill: ${skill}`);
    assert(atsHtml.includes(escapedSkill), `ATS resume should include skill: ${skill}`);
  }
}
assert(humanHtml.includes('<div class="section-heading">Skills</div>'));
assert(atsHtml.includes('<div class="section-heading">Skills</div>'));
assert(atsHtml.includes('class="skills-list"'), 'ATS skills should use a single-column list');
assert(!atsHtml.includes('class="skills-grid"'), 'ATS skills should exclude grid markup');
assert.equal(
  humanHtml.match(/class="skill-pill"/g)?.length,
  DATA.skillGroups.flatMap(group => group.skills).length,
  'human resume should render one pill per skill',
);
assert(!atsHtml.includes('class="skill-pill"'), 'ATS skills should exclude pill tags');
assert(atsHtml.includes('<body class="ats">'), 'ATS resume should expose an ATS styling hook');
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
assert(
  humanHtml.indexOf('class="page-2-header"') < humanHtml.indexOf('<div class="section-heading">Education</div>'),
  'Education should begin the intentional second-page content',
);

for (const title of [
  'Senior MTS, Software Engineer (Senior Staff)',
  'MTS 2, Software Engineer (Staff)',
  'MTS 1, Software Engineer (Senior)',
]) {
  assert(humanHtml.includes(title), `human resume should include title: ${title}`);
  assert(atsHtml.includes(title), `ATS resume should include title: ${title}`);
}

console.log('✓ All assertions passed');
