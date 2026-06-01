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
