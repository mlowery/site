import assert from 'node:assert/strict';
import { getResumeTarget } from './resume-target';

assert.deepEqual(getResumeTarget(), { target: 'human', outputPath: 'dist/resume.pdf' });
assert.deepEqual(getResumeTarget('human'), { target: 'human', outputPath: 'dist/resume.pdf' });
assert.deepEqual(getResumeTarget('ats'), { target: 'ats', outputPath: 'dist/resume-ats.pdf' });
assert.throws(
  () => getResumeTarget('print'),
  /Unsupported resume target "print"\. Expected "human" or "ats"\./,
);

console.log('✓ Resume target assertions passed');
