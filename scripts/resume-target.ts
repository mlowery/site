import type { ResumeTarget } from './resume-html';

export type ResumeTargetConfig = {
  target: ResumeTarget;
  outputPath: string;
};

export function getResumeTarget(rawTarget?: string): ResumeTargetConfig {
  const target = rawTarget ?? 'human';
  if (target === 'human') return { target, outputPath: 'dist/resume.pdf' };
  if (target === 'ats') return { target, outputPath: 'dist/resume-ats.pdf' };
  throw new Error(`Unsupported resume target "${target}". Expected "human" or "ats".`);
}
