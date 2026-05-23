import { readFileSync } from "node:fs";

const resumeSource = readFileSync("src/data/resume.tsx", "utf8");

const expectedProjects = [
  {
    title: "fotofolder",
    href: "https://github.com/mlowery/fotofolder",
    icon: "Camera",
    description:
      "fotofolder is a Python CLI for copying photo and video archives into a deterministic, date-based folder layout.",
  },
  {
    title: "usher",
    href: "https://github.com/mlowery/usher",
    icon: "Hand",
    description: "(U)niversal (S)hell (H)istory - er",
  },
  {
    title: "kworx",
    href: "https://github.com/mlowery/kworx",
    icon: "Dumbbell",
    description: "Multi-threaded kubectl (kubectl with workers)",
  },
];

for (const project of expectedProjects) {
  if (!resumeSource.includes(`title: "${project.title}"`)) {
    throw new Error(`Missing project title: ${project.title}`);
  }

  if (!resumeSource.includes(`href: "${project.href}"`)) {
    throw new Error(`Missing project href: ${project.href}`);
  }

  if (!resumeSource.includes(`icon: <${project.icon} size={16} />`)) {
    throw new Error(`Missing ${project.icon} icon for ${project.title}`);
  }

  if (!resumeSource.includes(`description: "${project.description}"`)) {
    throw new Error(`Missing GitHub-based description for ${project.title}`);
  }
}
