import { readFileSync } from "node:fs";

const resumeSource = readFileSync("src/data/resume.tsx", "utf8");

const expectedProjects = [
  {
    title: "sticky-kubeconfig",
    href: "https://github.com/mlowery/sticky-kubeconfig",
    icon: "Terminal",
    description: "Shell helper for keeping a unique kubeconfig per terminal session.",
  },
  {
    title: "executable-image",
    href: "https://github.com/mlowery/executable-image",
    icon: "Play",
    description: "Shell tooling to run Docker images as executables.",
  },
];

const removedProjects = ["emcee", "kubectl-watchhook"];

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

for (const title of removedProjects) {
  if (resumeSource.includes(`title: "${title}"`)) {
    throw new Error(`Removed project still present: ${title}`);
  }
}
