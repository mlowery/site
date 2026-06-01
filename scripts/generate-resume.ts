// scripts/generate-resume.ts
import puppeteer from 'puppeteer';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { DATA } from '../src/data/resume';
import { buildHtml } from './resume-html';

async function main() {
  const html = buildHtml(DATA);
  const outPath = resolve('resume.pdf');

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.5in', right: '0.45in', bottom: '0.5in', left: '0.45in' },
  });
  await browser.close();

  writeFileSync(outPath, pdf);
  console.log(`✓ resume.pdf written to ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
