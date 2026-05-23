import { readFileSync } from "node:fs";

const resumeSource = readFileSync("src/data/resume.tsx", "utf8");
const workSectionSource = readFileSync(
  "src/components/section/work-section.tsx",
  "utf8"
);

const workMatch = resumeSource.match(
  /work:\s*\[([\s\S]*?)\n\s*\],\n\s*education:/
);

if (!workMatch) {
  throw new Error("Could not locate DATA.work in src/data/resume.tsx");
}

const workEntries = workMatch[1]
  .split(/\n\s*\},\n\s*\{/)
  .filter((entry) => entry.includes("company:"));

const ids = workEntries.map((entry, index) => {
  const idMatch = entry.match(/\bid:\s*"([^"]+)"/);
  if (!idMatch) {
    throw new Error(`Work entry ${index + 1} is missing a stable id field`);
  }
  return idMatch[1];
});

const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length > 0) {
  throw new Error(`Duplicate work ids found: ${[...new Set(duplicateIds)].join(", ")}`);
}

if (!workSectionSource.includes("key={work.id}")) {
  throw new Error("Work accordion items must use work.id as the React key");
}

if (!workSectionSource.includes("value={work.id}")) {
  throw new Error("Work accordion items must use work.id as the accordion value");
}
